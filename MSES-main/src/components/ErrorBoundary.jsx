import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback" role="alert">
          <h1>Something went wrong</h1>
          <p>
            We encountered an unexpected error. Please refresh the page or contact us
            directly for immediate assistance.
          </p>
          <a href="tel:844-637-4855" className="emergency-phone">
            844-637-4855 — 24/7 Emergency Response
          </a>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="/" className="btn btn-primary">Return to Home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
