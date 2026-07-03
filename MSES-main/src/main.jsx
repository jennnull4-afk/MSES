import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initClarity } from './lib/clarity.js'

// Standardised env var: VITE_GA4_MEASUREMENT_ID
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

if (GA4_MEASUREMENT_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false });
}

// Google Search Console verification is handled statically in index.html
// via %VITE_GSC_VERIFICATION% — no dynamic injection needed here.

initClarity();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
