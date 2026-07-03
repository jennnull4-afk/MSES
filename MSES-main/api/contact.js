// Vercel Serverless Function for Contact Form
// Uses Web3Forms API for reliable email delivery (free tier, no domain verification needed)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
