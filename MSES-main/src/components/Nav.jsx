import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header className="site-header">
      <div className="header-main">
        <NavLink to="/" className="header-logo">
          <img src="/MSES-Master-Logo.png" alt="Mid-South Environmental Services" />
        </NavLink>
        <nav>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/past-projects">Past Projects</NavLink></li>
            <li><NavLink to="/locations">Locations</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </nav>
        <a href="tel:844-637-4855" className="header-phone" onClick={() => window.gtag && window.gtag('event', 'click_phone', { event_category: 'engagement', event_label: 'Header Phone Click' })}>
          <span className="header-phone-label">24/7 Emergency:</span>
          <strong>844-637-4855</strong>
        </a>
      </div>
      <div className="header-accent">
        <div className="accent-rule accent-rule-primary"></div>
        <div className="accent-rule accent-rule-secondary"></div>
      </div>
    </header>
  );
}

export default Nav;
