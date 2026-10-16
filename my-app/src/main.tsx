import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'     //named import 

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.tsx'       //default import 

createRoot(document.getElementById('root')!).render(
    <App />
)
