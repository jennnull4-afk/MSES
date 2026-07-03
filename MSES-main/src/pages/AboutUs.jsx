import { useSEO } from '../hooks/useSEO';

const CAPABILITIES = [
  {
    id: 'owner-led',
    title: 'Owner-Led Oversight',
    description: 'Every project receives direct owner involvement from initial call through completion. No corporate layers, no handoffs—decisions are made by personnel with authority to act and accountability for results.'
  },
  {
    id: 'regional-ops',
    title: 'Regional Field Supervision',
    description: 'Field operations are managed by experienced supervisors stationed across Mississippi and Arkansas. Local presence ensures rapid deployment and on-site coordination without delays.'
  },
  {
    id: 'response-coordination',
    title: '24/7 Response Coordination',
    description: 'Round-the-clock intake, dispatch, and field coordination for emergency incidents. Direct communication from first call through resolution—no call centers, no transfers, no delays.'
  }
];

const TEAM = [
  { name: 'Steve B.', title: 'Owner' },
  { name: 'Cody Simpson', title: 'Vice President of Operations', email: 'c.simpson@mses.online', phone: '(662) 302-7021' },
  { name: 'Robin Porter', title: 'Business Development', email: 'robin@mses.online', phone: '(901) 870-2802' },
  { name: 'Cory Clements', title: 'Operations Manager', email: 'cory@mses.online' },
  { name: 'Amber White', title: 'Office Manager', email: 'amber@mses.online' },
  { name: 'AJ Bowie', title: 'AP Administrator', email: 'aj@mses.online' }
];

function AboutUs() {
  useSEO({
    title: 'About Mid-South Environmental Services | Company Overview',
    description: 'Privately owned environmental services company supporting railroad, industrial, transportation, and marine operations across Mississippi and Arkansas.',
    canonical: 'https://www.mses.online/about'
  });

  return (
    <div className="page page-about">
      <section className="about-intro">
        <h1>About Mid-South Environmental Services</h1>
        <p className="established-badge">Established 2017</p>
        <p>Mid-South Environmental Services is a privately owned environmental response and support company serving regulated operating environments across the Mid-South. The company provides field-executed environmental services for railroad, industrial, transportation, and marine operations where timing, coordination, and control matter.</p>
        <p>We first opened our doors in Nesbit, MS during 2017. We have since moved our corporate office to Southaven, MS and have been proudly serving the Mid-South since then. We expanded our operation in 2020 and opened a second office in Little Rock, AR.</p>
        <p>Operations are led directly by ownership with hands-on involvement in both emergency response and planned work. Services are delivered with a practical focus on containment, site coordination, and safe execution—without unnecessary delays or layers of approval.</p>
        <p>Mid-South Environmental Services supports clients from initial response through resolution, working alongside operations, compliance, and site personnel to manage environmental incidents and maintenance activities efficiently. The company's approach is grounded in real-world field experience, clear communication, and direct accountability at every stage.</p>
      </section>

      <section className="about-leadership">
        <div className="about-leadership-inner">
          <h2>Owner-Led Operations</h2>
          <p className="leadership-statement">Mid-South Environmental Services operates without corporate distance. Ownership maintains direct involvement in field operations, client coordination, and response execution—ensuring decisions are made by personnel who understand the work and are accountable for the outcome.</p>
          
          <div className="leadership-grid">
            {CAPABILITIES.map((capability) => (
              <div key={capability.id} className="leadership-card">
                <h3>{capability.title}</h3>
                <p className="leadership-description">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team" id="leadership">
        <div className="about-team-inner">
          <h2>Leadership & Operations Team</h2>
          <p className="team-statement">Experienced personnel supporting field execution, coordination, and administration.</p>
          
          <div className="team-grid">
            {TEAM.map((member, index) => (
              <div key={index} className="team-card">
                <span className="team-name">{member.name}</span>
                <span className="team-title">{member.title}</span>
                {member.email && <a href={`mailto:${member.email}`} className="team-contact-link">{member.email}</a>}
                {member.phone && <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="team-contact-link">{member.phone}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
