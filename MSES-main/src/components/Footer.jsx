import { NavLink } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">

        {/* Brand / tagline / address */}
        <div className="footer-brand">
          <NavLink to="/" className="footer-logo" aria-label="Mid-South Environmental Services — Home">
            <img src="/MSES-Master-Logo.png" alt="Mid-South Environmental Services" />
          </NavLink>
          <p className="footer-tagline">
            Privately owned environmental response and remediation company serving railroad,
            industrial, transportation, and marine operations across Mississippi, Arkansas,
            and the broader Mid-South region.
          </p>
          <address className="footer-address">
            <span className="footer-address-line">Corporate: 8465 Hamilton Rd, Southaven, MS 38671</span>
            <span className="footer-address-line">Arkansas: 2600 W Main St, Jacksonville, AR 72076</span>
          </address>
        </div>

        {/* Emergency contact */}
        <div className="footer-contact">
          <p className="footer-phone-label">24/7 Emergency Response</p>
          <a
            href="tel:844-637-4855"
            className="footer-phone"
            onClick={() => window.gtag && window.gtag('event', 'click_phone', { event_category: 'engagement', event_label: 'Footer Phone Click' })}
          >
            844-637-4855
          </a>
          <p className="footer-service-note">
            Direct line — no call centers, no transfers.
          </p>
        </div>

        {/* Navigation */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="footer-nav-label">Navigation</p>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/past-projects">Past Projects</NavLink>
          <NavLink to="/locations">Locations</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>

      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Mid-South Environmental Services. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

