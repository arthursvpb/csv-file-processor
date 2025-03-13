import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { App } from './App.tsx';
import { FileUploadProvider } from './contexts/FileUploadContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FileUploadProvider>
      <App />
    </FileUploadProvider>
  </StrictMode>,
);
