import { useEffect, useRef, useState } from 'react'
import { captureElementScreenshot } from '../../../src'

export default function LocalVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (!videoElement || !canvasElement) {
      return;
    }

    const ctx = canvasElement.getContext('2d');

    videoElement.addEventListener('play', () => {
      // 描画関数
      const draw = () => {
        if (videoElement.paused || videoElement.ended) {
          return;
        }
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        ctx!.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        // 次のフレームで再描画
        requestAnimationFrame(draw);
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
      <video ref={videoRef} controls>
        <source src="/assets/mov_bbb.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} />
      { base64Image && (
        <img src={base64Image} alt="" />
      )}
      <button onClick={handleCapture}>Capture Screenshot</button>
    </div>
  );
}
