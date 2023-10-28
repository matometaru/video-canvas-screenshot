import './ThreeAnimation.css'

import { useState, useEffect } from 'react'
import { captureElementScreenshot, captureWebGLCanvasScreenshot } from '../../../src'

export default function MediaStreamVideo() {
  const [base64Image, setBase64Image] = useState<string>('');

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById('myCanvas');
    container.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // アニメーション関数
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    // アニメーション開始
    animate();
  }, [])

  const handleCapture = () => {
    const canvasRef = document.querySelector('canvas') as HTMLCanvasElement;
    // console.log(canvasRef);
    if (canvasRef) {
      captureWebGLCanvasScreenshot(canvasRef, (imageData) => {
        setBase64Image(imageData);
        console.log("hey", imageData);
      });
    }
  };

  return (
    <div>
      <button onClick={handleCapture}>Capture Screenshot</button>
      <div id="myCanvas" style={{ width: 300 }}></div>
      { base64Image && (
        <img src={base64Image} alt="" />
      )}
      {JSON.stringify(base64Image)}
    </div>
  );
}
