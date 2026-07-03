import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Nav from './components/Nav';
import Footer from './components/Footer';

// Route-level code splitting — each page loads only when first visited
const Home        = lazy(() => import('./pages/Home'));
const AboutUs     = lazy(() => import('./pages/AboutUs'));
const Services    = lazy(() => import('./pages/Services'));
const Locations   = lazy(() => import('./pages/Locations'));
const ContactUs   = lazy(() => import('./pages/ContactUs'));
const PastProjects = lazy(() => import('./pages/PastProjects'));
const NotFound    = lazy(() => import('./pages/NotFound'));

// GA4 page-view tracking hook — env var: VITE_GA_MEASUREMENT_ID
function useGA4PageTracking() {
  const location = useLocation();
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

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
      {/* Skip-to-content link — first focusable element for keyboard/screen-reader users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {location.pathname === '/' ? (
        <>
          {/* Real nav shown on mobile; desktop uses hero image overlay links below */}
          <div className="mobile-home-nav">
            <Nav />
          </div>
          <section className="top-hero" aria-label="Homepage hero image">
            <div className="top-hero-image-wrapper">
              {/* Desktop hero — fetchpriority signals LCP image to browser */}
              <img
                src="/heronow.png"
                alt="Mid-South Environmental Services — 24/7 Environmental Emergency Response"
                className="top-hero-image hero-desktop"
                fetchpriority="high"
              />
              {/* Mobile hero */}
              <img
                src="/photos/projects/heromobile.png"
                alt="Mid-South Environmental Services — 24/7 Environmental Emergency Response"
                className="top-hero-image hero-mobile"
                fetchpriority="high"
              />
              {/* Desktop navigation overlays — keyboard-focusable, visible on :focus */}
              <nav aria-label="Desktop hero navigation" className="hero-nav-overlay">
                <Link to="/" className="invisible-hero-link" style={{ left: '0%', width: '18%', height: '14%' }} aria-label="Mid-South Environmental Services — Home" />
                <Link to="/" className="invisible-hero-link" style={{ left: '20%', width: '11%', height: '14%' }} aria-label="Home" />
                <Link to="/about" className="invisible-hero-link" style={{ left: '33%', width: '11%', height: '14%' }} aria-label="About Us" />
                <Link to="/services" className="invisible-hero-link" style={{ left: '45%', width: '11%', height: '14%' }} aria-label="Services" />
                <Link to="/contact" className="invisible-hero-link" style={{ left: '57%', width: '13%', height: '14%' }} aria-label="Contact Us" />
                <a href="tel:8446374855" className="invisible-hero-link" style={{ left: '76%', width: '24%', height: '14%' }} aria-label="Call 844-637-4855" />
                <Link to="/services" className="invisible-hero-link" style={{ left: '3%', top: '74%', width: '24%', height: '17%' }} aria-label="View Services" />
              </nav>
            </div>
          </section>
        </>
      ) : (
        <Nav />
      )}

      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<div className="page-loading" aria-live="polite">Loading…</div>}>
          {children}
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/past-projects" element={<PastProjects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
