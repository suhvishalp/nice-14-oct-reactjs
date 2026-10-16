import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // ← must come before ./index.css
import './index.css';
import App from './App';
import { installInterceptors } from './interceptors';
// TODO(lab-4.4): import { installInterceptors } from './api/interceptors' and call it before createRoot

installInterceptors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
