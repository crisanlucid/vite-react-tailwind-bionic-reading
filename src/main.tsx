import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import './index.css';

const router = createBrowserRouter(
  [{ path: '/', element: <App /> }],
  { basename: '/primusread/' }
);

const container = document.getElementById('root');
if (!container) throw new Error('no container to render to');

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
