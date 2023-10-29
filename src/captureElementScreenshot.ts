type CanvasImageFormat = "image/png" | "image/jpeg" | "image/webp";

export const captureElementScreenshot = (
  element: HTMLVideoElement | HTMLCanvasElement,
  onCapture: (imageData: string) => void,
  type: CanvasImageFormat = 'image/jpeg',
): void => {
  let canvas: HTMLCanvasElement;
  
  if (element instanceof HTMLCanvasElement) {
    canvas = element;
    const contextWebgl = element.getContext('webgl2') || element.getContext('webgl') || element.getContext('experimental-webgl')
    if (contextWebgl) {
      captureWebGLCanvasScreenshot(element, onCapture, type)
      return;
    }
  } else if (element instanceof HTMLVideoElement) {
    canvas = document.createElement('canvas');
    canvas.width = element.videoWidth;
    canvas.height = element.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    }
  } else {
    console.error('Unsupported element type.');
    return;
  }

  const imageData = canvas.toDataURL(type);
  onCapture(imageData);
};

const captureWebGLCanvasScreenshot = (
  canvas: HTMLCanvasElement,
  onCapture: (imageData: string) => void,
  type: CanvasImageFormat,
) => {
  const newCanvas = document.createElement("canvas")
  let previousImageData: ImageData | null = null;

  const { width, height } = canvas;
  newCanvas.width = width;
  newCanvas.height = height;

  function copyCanvasContent() {
    if (canvas && newCanvas) {
      const ctx = newCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
        const imageData = ctx.getImageData(0, 0, width, height);
        if (previousImageData === null) {
          previousImageData = imageData;
        } else if (
          !imageData.data.every((value, index) => value === previousImageData?.data[index])
        ) {
          const base64 = newCanvas.toDataURL(type);
          onCapture(base64);
          return;
        }
      }
      requestAnimationFrame(copyCanvasContent);
    };
  }

  copyCanvasContent()
}


