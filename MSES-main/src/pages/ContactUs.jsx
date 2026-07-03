import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { trackContactFormSubmission, trackPhoneClick } from '../lib/analytics';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Prepare sanitized form data
      const submitData = {
        name: formData.name.trim(),
        company: formData.company.trim() || 'Not provided',
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        message: formData.message.trim()
      };

      // Submit to Vercel serverless function
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
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          message: ''
        });
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
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          {status.message && (
            <div className={`form-status form-status-${status.type}`} role="alert">
              {status.message}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
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
