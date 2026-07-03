import Clarity from '@microsoft/clarity';

let initialized = false;

export function initClarity() {
  const projectId = import.meta.env.VITE_CLARITY_ID;
  if (!projectId || initialized) return;
  Clarity.init(projectId);
  initialized = true;
}

function trackClarityEvent(eventName) {
  if (!initialized || typeof window.clarity !== 'function') return;
  Clarity.event(eventName);
}

export function trackEmergencyPhoneClick() {
  trackClarityEvent('emergency_phone_click');
}

export function trackPhoneClick() {
  trackClarityEvent('phone_click');
}

export function trackEmailClick() {
  trackClarityEvent('email_click');
}

export function trackContactFormSubmit() {
  trackClarityEvent('contact_form_submit');
}

export function trackQuoteRequestClick() {
  trackClarityEvent('quote_request_click');
}

export function trackServicePageView(serviceName) {
  trackClarityEvent('service_page_view');
  if (serviceName && typeof window.clarity === 'function') {
    Clarity.setTag('service_name', serviceName);
  }
}
