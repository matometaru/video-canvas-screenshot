type Props = {
}

export const captureElementScreenshot = (
  element: HTMLVideoElement | HTMLCanvasElement,
  onCapture: (imageData: string) => void
): void => {
  let canvas: HTMLCanvasElement;
  
  // 引数として渡されたelementがHTMLCanvasElementかHTMLVideoElementかを判定
  if (element instanceof HTMLCanvasElement) {
    canvas = element;
  } else if (element instanceof HTMLVideoElement) {
    canvas = document.createElement('canvas');
    canvas.width = element.videoWidth;
    canvas.height = element.videoHeight;

    console.log("hey")

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    }
  } else {
    console.error('Unsupported element type.');
    return;
  }

  // 画像データを取得
  const imageData = canvas.toDataURL('image/png');

  // コールバック関数に画像データを渡す
  onCapture(imageData);
};
