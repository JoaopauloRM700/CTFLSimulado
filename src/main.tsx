import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HelmetProvider> {/* Adicione este provider */}
      <App />
    </HelmetProvider>
  </StrictMode>
);