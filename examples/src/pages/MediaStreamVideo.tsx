import './MediaStreamVideo.css'

import { useEffect, useRef, useState } from 'react'
import { captureElementScreenshot } from '../../../src'

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: 'environment',
    frameRate: { ideal: 60 },
  },
  audio: false,
}

export default function MediaStreamVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [base64Image, setBase64Image] = useState<string>('');

  const startVideoCapture = (async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setMediaStream(stream)
  })

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const videoElement = videoRef.current;

    if (ctx && canvas && videoElement) {
      videoElement.srcObject = mediaStream
    }
  }, [mediaStream]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (!videoElement || !canvasElement) {
      return;
    }
 
    const ctx = canvasElement.getContext('2d');

    videoElement.addEventListener('play', () => {
      let frame = 0;

      const draw = () => {
        requestAnimationFrame(draw);
        frame++;
        if (frame % 10 == 0) {
          if (videoElement.paused || videoElement.ended) {
            return;
          }
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
          ctx!.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        }
      };
      // 初回描画
      draw();
    });
  }, []);

  const handleCapture = () => {
    if (canvasRef.current) {
      captureElementScreenshot(canvasRef.current, (imageData) => {
        setBase64Image(imageData);
      });
    }
  };

  return (
    <div>
      <button onClick={startVideoCapture}>start</button>
      <video ref={videoRef} muted playsInline autoPlay />
      <canvas ref={canvasRef} />
      { base64Image && (
        <img src={base64Image} alt="" />
      )}
      <button onClick={handleCapture}>Capture Screenshot</button>
    </div>
  );
}
