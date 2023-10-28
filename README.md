## Installation

\`\`\`bash
npm install video-canvas-screenshot
\`\`\`

## Usage

Describe basic usage. Include code samples.

\`\`\`typescript
import { captureElementScreenshot } from 'video-canvas-screenshot'

const canvasElement = document.querySelector('canvas') as HTMLCanvasElement;
if (canvasElement) {
  captureElementScreenshot(canvasElement, (imageData) => {
    setBase64Image(imageData);
  });
}
\`\`\`