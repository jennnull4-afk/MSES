import { Link } from 'react-router-dom';
import Map from '../components/Map';
import { useSEO } from '../hooks/useSEO';

function Home() {
  useSEO({
    title: 'Mid-South Environmental Services | Environmental & Emergency Response',
    description: 'Environmental response and remediation services supporting rail, industrial, transportation, and marine operations across the Mid-South. 24/7 emergency response available.',
    canonical: 'https://www.mses.online/'
  });

  return (
    <div className="page page-home">
      {/* Under Hero Image Section */}
      <section className="underhero-section">
        <img src="/underhero1.png" alt="Mid-South Environmental Services" className="underhero-image" />
      </section>

      {/* Services Section - Unified Photo Grid with Descriptions */}
      <section className="section-services-unified">
        <div className="section-inner">
          <h2>Our Services</h2>
          <p className="section-lead">Environmental response, remediation, cleaning, and support services for regulated operating environments.</p>
          <div className="services-photo-grid">
            <div className="service-photo-card">
              <img src="/photos/homepage/emergency.jpg" alt="Environmental response operations" loading="lazy" />
              <h3>Emergency Response</h3>
              <p>24/7 rapid response for hazardous material releases, containment, and remediation.</p>
            </div>
            <div className="service-photo-card">
              <img src="/photos/homepage/railroad.jpg" alt="Railroad environmental services" loading="lazy" />
              <h3>Railroad Services</h3>
              <p>Derailment response, yard cleaning, and environmental support for rail operations.</p>
            </div>
            <div className="service-photo-card">
              <img src="/photos/homepage/capability-3.jpg" alt="Industrial cleaning operations" loading="lazy" />
              <h3>Industrial Services</h3>
              <p>Facility cleaning, waste management, and environmental compliance support.</p>
            </div>
            <div className="service-photo-card">
              <img src="/photos/homepage/capability-4.jpg" alt="Site remediation work" loading="lazy" />
              <h3>Remediation & Spill Cleanup</h3>
              <p>Site remediation, contaminated soil removal, and environmental restoration.</p>
            </div>
            <div className="service-photo-card">
              <img src="/photos/homepage/marine.jpg" alt="Marine and waterway services" loading="lazy" />
              <h3>Marine & Waterway Services</h3>
              <p>Spill response, barge cleaning, and environmental services for marine operations.</p>
            </div>
            <div className="service-photo-card">
              <img src="/photos/homepage/transportation.jpg" alt="Transportation and highway response" loading="lazy" />
              <h3>Transportation & Highway</h3>
              <p>Highway spill response, cargo recovery, and transportation incident support.</p>
            </div>
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Calling Image Section */}
      <section className="underhero-section">
        <img src="/calling.png" alt="What to Expect When You Call Mid-South Environmental Services" className="underhero-image" />
      </section>

      {/* Locations Section */}
      <section className="section-locations">
        <div className="section-inner">
          <Map />
        </div>
      </section>

    </div>
  );
}

export default Home;
