import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the updated import for ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
