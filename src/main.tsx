import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('no container to render to');

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
