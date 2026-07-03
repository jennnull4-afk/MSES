import { useSEO } from '../hooks/useSEO';

const SERVICES = [
  {
    id: 'environmental',
    title: 'Environmental Services',
    image: '/photos/services/environmental.jpg',
    description: 'Comprehensive spill response, containment, remediation, and material handling for environmental incidents requiring immediate action. We handle product recovery, contaminated soil excavation, vacuum services, and waste profiling from initial response through site restoration.',
    environments: [
      'Railroad yards, sidings, and right-of-way',
      'Industrial facilities and process areas',
      'Highway and roadway incident sites',
      'Terminals, storage yards, and transfer points',
      'Shorelines and inland waterways'
    ]
  },
  {
    id: 'railroad',
    title: 'Railroad Services',
    image: '/photos/services/railroad.jpg',
    description: 'Environmental response and operational support for rail environments, including yards, mainlines, sidings, and derailment incidents. We coordinate with dispatchers and roadmasters to handle fuel spills, contaminated ballast removal, tank car cleaning, and right-of-way remediation without creating operational delays.',
    environments: [
      'Classification yards and switching operations',
      'Mainline and branch line right-of-way',
      'Fueling facilities and maintenance shops',
      'Industrial spurs and customer sidings',
      'Intermodal terminals'
    ]
  },
  {
    id: 'industrial',
    title: 'Industrial Services',
    image: '/photos/services/industrial.jpg',
    description: 'Environmental and cleaning services that work around your operations. Whether it\'s a spill requiring immediate attention or scheduled maintenance that can\'t slip, we bring crews and equipment to handle tank cleaning, secondary containment maintenance, process area remediation, and turnaround support without disrupting production.',
    environments: [
      'Manufacturing plants and production floors',
      'Refineries and processing facilities',
      'Chemical storage and handling areas',
      'Tank farms and bulk terminals',
      'Maintenance shops and wash bays'
    ]
  },
  {
    id: 'transportation',
    title: 'Transportation Services',
    image: '/photos/services/transportation.jpg',
    description: 'Roadway incident response with speed and control—containing releases, recovering product, and clearing scenes so traffic and operations can resume. We handle highway spill response, fuel and cargo containment, contaminated soil removal and site restoration activities with full waste transport coordination.',
    environments: [
      'Interstate and highway incident scenes',
      'Truck stops and fueling stations',
      'Freight terminals and distribution centers',
      'Transfer facilities and staging areas',
      'Loading docks and cargo handling zones'
    ]
  },
  {
    id: 'marine',
    title: 'Marine Services',
    image: '/photos/services/marine.jpg',
    description: 'Marine spill response, containment, and recovery services for operations along rivers, ports, and transfer facilities. We deploy boom containment, perform on-water product recovery operations, shoreline cleanup, and coordinate with facility response plans for vessel and barge incidents.',
    environments: [
      'Rivers and inland waterways',
      'Barge and vessel loading facilities',
      'Port terminals and docks',
      'Shoreline and bank areas',
      'Marine fueling and transfer points'
    ]
  },
  {
    id: 'remediation',
    title: 'Remediation Services',
    image: '/photos/services/remediation.jpg',
    description: 'Environmental remediation services addressing contaminated soil, groundwater, and impacted sites resulting from spills, releases, or historical operations. Work includes excavation, material removal, containment, treatment coordination, and site stabilization in accordance with regulatory and client requirements.',
    environments: [
      'Transportation corridors and right-of-way areas',
      'Industrial and manufacturing sites',
      'Rail yards and maintenance facilities',
      'Shoreline, bank, and drainage areas',
      'Spill and release impact zones'
    ]
  }
];

function Services() {
  useSEO({
    title: 'Environmental & Industrial Services | MSES',
    description: 'Environmental response, remediation, and cleanup services for railroad, industrial, transportation, and marine operations. Serving the Mid-South region.',
    canonical: 'https://www.mses.online/services'
  });

  return (
    <div className="page page-services">
      <section className="services-intro">
        <h1>Environmental & Operational Services</h1>
        <p className="services-intro-text">Mid-South Environmental Services provides field-executed environmental response and support services for regulated operating environments where timing, coordination, and execution matter.</p>
        <p className="services-intro-subtext">Services are delivered by experienced personnel supporting emergency response and planned operations across rail, industrial, transportation, and marine environments.</p>
      </section>

      <section className="services-consolidated">
        <div className="services-consolidated-inner">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-block" data-service={service.id}>
              <div className="service-block-content">
                <h2>{service.title}</h2>
                <p className="service-block-description">{service.description}</p>
                <div className="service-block-environments">
                  <h3>Where This Work Happens</h3>
                  <ul>
                    {service.environments.map((env, index) => (
                      <li key={index}>{env}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="service-block-image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-cta-section">
        <p className="services-cta-text">Each service area is supported by experienced field personnel and coordinated directly with client operations.</p>
        <a href="tel:844-637-4855" className="btn btn-primary" onClick={() => window.gtag && window.gtag('event', 'click_phone', { event_category: 'engagement', event_label: 'Services Page Phone Click' })}>Call 24/7 Emergency Response — 844-637-4855</a>
      </section>
    </div>
  );
}

export default Services;
