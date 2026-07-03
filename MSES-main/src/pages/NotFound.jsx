import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

function NotFound() {
  useSEO({
    title: 'Page Not Found | Mid-South Environmental Services',
    description:
      'The page you are looking for does not exist. Contact Mid-South Environmental Services at 844-637-4855 for 24/7 emergency environmental response.',
    canonical: 'https://www.mses.online/404',
  });

  return (
    <div className="page page-notfound">
      <section className="notfound-section">
        <p className="notfound-code" aria-hidden="true">404</p>
        <h1>Page Not Found</h1>
        <p className="notfound-message">
          The page you requested could not be found. It may have been moved,
          renamed, or the URL may be incorrect.
        </p>
        <p className="notfound-cta-text">
          If you need immediate environmental response assistance, call us directly:
        </p>
        <a href="tel:844-637-4855" className="emergency-phone notfound-phone">
          844-637-4855 &mdash; 24/7 Emergency Response
        </a>
        <div className="notfound-links">
          <Link to="/" className="btn btn-primary">Return to Home</Link>
          <Link to="/services" className="btn btn-secondary">Our Services</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          <Link to="/locations" className="btn btn-secondary">Locations</Link>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
