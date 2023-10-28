import { createHashRouter } from 'react-router-dom';

import BaseLayout from './components/BaseLayout'
import LocalVideo from './pages/LocalVideo'
import MediaStreamVideo from './pages/MediaStreamVideo'
import ThreeAnimation from './pages/ThreeAnimation'

export const router = createHashRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <LocalVideo /> },
      { path: '/media-stream', element: <MediaStreamVideo /> },
      { path: '/threejs', element: <ThreeAnimation /> },
    ]
  },
]);