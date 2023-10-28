import { useRef, useState } from 'react'
import { captureElementScreenshot } from '../../../src'

export default function LocalVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleCapture = () => {
    if (videoRef.current) {
      captureElementScreenshot(videoRef.current, (imageData) => {
        setBase64Image(imageData);
      });
    }
  };

  return (
    <div>
      <video ref={videoRef} controls>
        <source src="/assets/mov_bbb.mp4" type="video/mp4" />
      </video>
      { base64Image && (
        <img src={base64Image} alt="" />
      )}
      <button onClick={handleCapture}>Capture Screenshot</button>
    </div>
  );
}
