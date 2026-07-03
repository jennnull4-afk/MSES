// Vercel Serverless Function for Contact Form
// Uses Web3Forms API for reliable email delivery

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per serverless instance)
// Not a substitute for a global rate-limiting layer, but meaningfully reduces
// automated abuse on warm instances.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count += 1;
  return false;
}

// Field length limits (mirrored in ContactUs.jsx frontend)
const FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 20,
  message: 3000,
};

export default async function handler(req, res) {
  // ---------------------------------------------------------------------------
  // CORS — restrict to own domain; allow via env var for staging environments
  // ---------------------------------------------------------------------------
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://www.mses.online';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // ---------------------------------------------------------------------------
  // Rate limiting
  // ---------------------------------------------------------------------------
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes or call our emergency line directly.'
    });
  }

  try {
    const { name, company, email, phone, message, website } = req.body;

    // ---------------------------------------------------------------------------
    // Honeypot — bots fill hidden "website" field; reject silently
    // ---------------------------------------------------------------------------
    if (website && website.trim()) {
      // Return 200 so bots don't know they were rejected
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    // ---------------------------------------------------------------------------
    // Server-side validation
    // ---------------------------------------------------------------------------
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (name.trim().length > FIELD_LIMITS.name) {
      return res.status(400).json({ success: false, message: 'Name is too long' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (email.trim().length > FIELD_LIMITS.email) {
      return res.status(400).json({ success: false, message: 'Email is too long' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }
    if (message.trim().length > FIELD_LIMITS.message) {
      return res.status(400).json({ success: false, message: 'Message is too long' });
    }
    if (company && company.length > FIELD_LIMITS.company) {
      return res.status(400).json({ success: false, message: 'Company name is too long' });
    }
    if (phone && phone.length > FIELD_LIMITS.phone) {
      return res.status(400).json({ success: false, message: 'Phone number is too long' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // ---------------------------------------------------------------------------
    // Sanitize inputs — strip angle brackets and control characters
    // ---------------------------------------------------------------------------
    const sanitize = (str) =>
      str ? str.trim().replace(/[<>]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') : '';

    const sanitizedData = {
      name: sanitize(name),
      company: sanitize(company) || 'Not provided',
      email: sanitize(email),
      phone: sanitize(phone) || 'Not provided',
      message: sanitize(message),
    };

    // ---------------------------------------------------------------------------
    // Send via Web3Forms
    // ---------------------------------------------------------------------------
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY not configured');
      return res.status(500).json({
        success: false,
        message: 'Contact form not configured. Please call our emergency line.'
      });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        to: 'robin@mses.online',
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        from_name: 'MSES Website',
        name: sanitizedData.name,
        company: sanitizedData.company,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        message: sanitizedData.message,
        replyto: sanitizedData.email
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      console.error('Web3Forms error:', result);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try calling our emergency line.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again or call our emergency line.'
    });
  }
}


  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, company, email, phone, message } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str) => str ? str.trim().replace(/[<>]/g, '') : '';

    const sanitizedData = {
      name: sanitize(name),
      company: sanitize(company) || 'Not provided',
      email: sanitize(email),
      phone: sanitize(phone) || 'Not provided',
      message: sanitize(message)
    };

    // Check for Web3Forms API key
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Contact form not configured. Please call our emergency line.' 
      });
    }

    // Send via Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        to: 'robin@mses.online',
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        from_name: 'MSES Website',
        name: sanitizedData.name,
        company: sanitizedData.company,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        message: sanitizedData.message,
        replyto: sanitizedData.email
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully' 
      });
    } else {
      console.error('Web3Forms error:', result);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try calling our emergency line.' 
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again or call our emergency line.' 
    });
  }
}
