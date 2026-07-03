import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../components/Map';
import { useSEO } from '../hooks/useSEO';

function Locations() {
  const location = useLocation();

  useSEO({
    title: 'Service Locations | MSES',
    description: 'Mid-South Environmental Services operates from locations in Mississippi and Arkansas including Southaven, Jacksonville, Texarkana, and Fulton. Regional coverage for emergency response.',
    canonical: 'https://www.mses.online/locations'
  });

  // Handle hash navigation from other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="page">
      <section>
        <h1>Service Locations</h1>
        <p>Mid-South Environmental Services provides regional coverage across Mississippi and Arkansas, supporting emergency response and planned operations for railroad, industrial, transportation, and marine environments.</p>
      </section>

      <section>
        <p className="map-helper-text">Regional Coverage</p>
        <Map />
      </section>

      <section>
        <h2>Office & Response Locations</h2>
        <div className="locations-grid">
          <div className="location-card" id="location-southaven">
            <h3>Corporate Office</h3>
            <address>
              8465 Hamilton Rd<br />
              Southaven, MS 38671
            </address>
          </div>

          <div className="location-card" id="location-jacksonville">
            <h3>Little Rock / Jacksonville, AR</h3>
            <address>
              2600 W Main St<br />
              Jacksonville, AR 72076
            </address>
          </div>

          <div className="location-card" id="location-texarkana">
            <h3>Texarkana, AR</h3>
            <address>
              3939 E Ninth St<br />
              Texarkana, AR 71854
            </address>
          </div>

          <div className="location-card" id="location-fulton">
            <h3>Fulton, MS</h3>
            <address>
              100 Access Rd<br />
              Fulton, MS 38843
            </address>
          </div>
        </div>
      </section>

      <section>
        <p className="closing-text">Additional response coverage is available throughout the Mid-South region depending on incident type and operational needs.</p>
      </section>
    </div>
  );
}

export default Locations;
