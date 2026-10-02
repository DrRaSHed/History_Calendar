import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { VignetteGallery } from './components/VignetteGallery';
import './index.css';

const gallery = import.meta.env.DEV && window.location.hash === '#gallery';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">{gallery ? <VignetteGallery /> : <App />}</MotionConfig>
  </StrictMode>,
);
