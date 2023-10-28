## Installation

```bash
npm install video-canvas-screenshot
```

## Usage

```typescript
import { captureElementScreenshot } from 'video-canvas-screenshot'

const canvasElement = document.querySelector('canvas') as HTMLCanvasElement;
if (canvasElement) {
  captureElementScreenshot(canvasElement, (imageData) => {
    setBase64Image(imageData);
  });
}
```