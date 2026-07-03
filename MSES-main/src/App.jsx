import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

// Nav removed from top header per design — hero image placed at top instead
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Locations from './pages/Locations';
import ContactUs from './pages/ContactUs';
import PastProjects from './pages/PastProjects';

// GA4 Analytics Hook
function useGA4PageTracking() {
  const location = useLocation();
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (GA4_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA4_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, GA4_MEASUREMENT_ID]);
}

function AppLayout({ children }) {
  useGA4PageTracking();
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? (
        <>
          {/* Mobile-only nav on homepage */}
          <div className="mobile-home-nav">
            <Nav />
          </div>
          <section className="top-hero">
            <div className="top-hero-image-wrapper">
              {/* Desktop hero */}
              <img src="/heronow.png" alt="Mid-South Environmental Services — 24/7 Environmental Emergency Response" className="top-hero-image hero-desktop" />
              {/* Mobile hero */}
              <img src="/photos/projects/heromobile.png" alt="Mid-South Environmental Services — 24/7 Environmental Emergency Response" className="top-hero-image hero-mobile" />
              {/* Logo → Home */}
              <Link to="/" className="invisible-hero-link" style={{ left: '0%', width: '18%', height: '14%' }} aria-label="Home" />
              {/* Nav: HOME */}
              <Link to="/" className="invisible-hero-link" style={{ left: '20%', width: '11%', height: '14%' }} aria-label="Home" />
              {/* Nav: ABOUT US */}
              <Link to="/about" className="invisible-hero-link" style={{ left: '33%', width: '11%', height: '14%' }} aria-label="About Us" />
              {/* Nav: SERVICES */}
              <Link to="/services" className="invisible-hero-link" style={{ left: '45%', width: '11%', height: '14%' }} aria-label="Services" />
              {/* Nav: CONTACT US */}
              <Link to="/contact" className="invisible-hero-link" style={{ left: '57%', width: '13%', height: '14%' }} aria-label="Contact Us" />
              {/* Phone box top-right */}
              <a href="tel:8446374855" className="invisible-hero-link" style={{ left: '76%', width: '24%', height: '14%' }} aria-label="Call 844-637-4855" />
              {/* VIEW SERVICES CTA button bottom-left */}
              <Link to="/services" className="invisible-hero-link" style={{ left: '3%', top: '74%', width: '24%', height: '17%' }} aria-label="View Services" />
            </div>
          </section>
        </>
      ) : (
        <Nav />
      )}
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/past-projects" element={<PastProjects />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
