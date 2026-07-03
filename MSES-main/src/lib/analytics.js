export function trackGAEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

export function trackPhoneClick() {
  trackGAEvent('click_phone', {
    event_category: 'engagement',
    event_label: 'Phone Click',
    value: 1,
  });
}

export function trackEmailClick() {
  trackGAEvent('click_email', {
    event_category: 'engagement',
    event_label: 'Email Click',
    value: 1,
  });
}

export function trackContactFormSubmission(status = 'success') {
  trackGAEvent('contact_form_submission', {
    event_category: 'engagement',
    event_action: 'submit_contact_form',
    event_label: status === 'success' ? 'Form Submitted' : 'Form Submission Error',
    event_status: status,
    value: 1,
  });
}

export function trackCTAClick(label) {
  trackGAEvent('cta_click', {
    event_category: 'engagement',
    event_label: label,
    value: 1,
  });
}
