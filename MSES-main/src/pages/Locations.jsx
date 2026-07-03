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
        <p className="closing-text">Additional response coverage is available throughout the Mid-South region depending on incident type and operational needs.</p>
      </section>
    </div>
  );
}

export default Locations;
