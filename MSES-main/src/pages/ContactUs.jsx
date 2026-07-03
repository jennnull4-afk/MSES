import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { trackContactFormSubmission, trackPhoneClick } from '../lib/analytics';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length limits (mirrored server-side in api/contact.js)
const FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 20,
  message: 3000,
};

function ContactUs() {
  useSEO({
    title: 'Contact Us | MSES',
    description: 'Contact Mid-South Environmental Services for environmental response, service coordination, or general inquiries. 24/7 emergency response line: 844-637-4855.',
    canonical: 'https://www.mses.online/contact'
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    // Honeypot — must stay empty; bots fill it, real users don't see it
    website: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return false;
    }
    if (trimmedName.length > FIELD_LIMITS.name) {
      setStatus({ type: 'error', message: 'Name is too long.' });
      return false;
    }
    if (!trimmedEmail) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return false;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    if (!trimmedMessage) {
      setStatus({ type: 'error', message: 'Please enter a message.' });
      return false;
    }
    if (trimmedMessage.length > FIELD_LIMITS.message) {
      setStatus({ type: 'error', message: `Message must be ${FIELD_LIMITS.message} characters or fewer.` });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    // Honeypot check — silently succeed if filled (bot behaviour)
    if (formData.website) {
      setStatus({ type: 'success', message: 'Message sent successfully. We will respond as promptly as possible.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const submitData = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'Not provided',
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        message: formData.message.trim(),
        website: formData.website, // honeypot forwarded for server-side check
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: 'success', message: 'Message sent successfully. We will respond as promptly as possible.' });
        trackContactFormSubmission('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '', website: '' });
      } else {
        trackContactFormSubmission('error');
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      trackContactFormSubmission('error');
      setStatus({
        type: 'error',
        message: 'Unable to send message. Please try again or call our emergency line.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <section>
        <h1>Contact Us</h1>
        <p>For environmental response, service coordination, or general inquiries, contact Mid-South Environmental Services using the information below. Direct access and clear communication are available for both emergency response and planned work.</p>
      </section>

      <section className="emergency-contact">
        <h2>24/7 Emergency Response</h2>
        <a href="tel:844-637-4855" className="emergency-phone" onClick={trackPhoneClick}>Call: 844-637-4855</a>
      </section>

      <section className="contact-form-section">
        <h2>General Inquiries</h2>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          {/* Honeypot field — hidden from real users, detected server-side */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.name}
              required
              disabled={isSubmitting}
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.company}
              disabled={isSubmitting}
              autoComplete="organization"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.email}
              required
              disabled={isSubmitting}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.phone}
              disabled={isSubmitting}
              autoComplete="tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              maxLength={FIELD_LIMITS.message}
              required
              disabled={isSubmitting}
            />
          </div>

          {status.message && (
            <div className={`form-status form-status-${status.type}`} role="alert" aria-live="polite">
              {status.message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
        <p className="form-note">For urgent matters, please call our 24/7 emergency line. For general inquiries submitted via this form, we aim to respond as promptly as possible, typically within one business day.</p>
      </section>

      <section>
        <p className="closing-text">Mid-South Environmental Services provides direct access to experienced personnel when timing and coordination matter.</p>
      </section>
    </div>
  );
}

export default ContactUs;
