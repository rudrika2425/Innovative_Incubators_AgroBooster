import React from 'react';  // Add this line
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'font-awesome/css/font-awesome.min.css';
import 'regenerator-runtime/runtime';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
