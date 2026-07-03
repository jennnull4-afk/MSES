import { useSEO } from '../hooks/useSEO';

const PROJECTS = [
  {
    id: 1,
    title: 'Railroad Derailment Response',
    scope: 'Representative emergency response work including hazmat containment, contaminated ballast removal, soil remediation, and debris clearing following rail incidents.',
    images: [
      '/photos/projects/rail1.jpg',
      '/photos/projects/rail2.jpg',
      '/photos/projects/rail3.jpg'
    ]
  },
  {
    id: 2,
    title: 'Environmental Remediation & Spill Cleanup',
    scope: 'Typical remediation scope including soil excavation, groundwater assessment support, waste profiling, and coordination with regulatory compliance requirements.',
    images: [
      '/photos/projects/remediation1.jpg',
      '/photos/projects/remediation2.jpg',
      '/photos/projects/remediation3.jpg'
    ]
  },
  {
    id: 3,
    title: 'Highway Incident Response',
    scope: 'Representative transportation incident work including fuel spill containment, product recovery, contaminated material removal, and coordination with DOT and environmental agencies.',
    images: [
      '/photos/projects/highway1.jpg',
      '/photos/projects/highway2.jpg',
      '/photos/projects/highway3.jpg'
    ]
  },
  {
    id: 4,
    title: 'Industrial Services',
    scope: 'Typical industrial service scope including tank cleaning, confined space entry, secondary containment maintenance, and proper disposal of residual materials.',
    images: [
      '/photos/projects/facility1.jpg',
      '/photos/projects/facility2.jpg',
      '/photos/projects/facility3.jpg'
    ]
  },
  {
    id: 5,
    title: 'Marine Spill Response & Containment',
    scope: 'Representative marine response work including boom deployment, on-water product recovery, shoreline cleanup, and coordinated site remediation.',
    images: [
      '/photos/projects/project-6a.jpg',
      '/photos/projects/project-6b.jpg',
      '/photos/projects/project-6c.jpg'
    ]
  }
];

function PastProjects() {
  useSEO({
    title: 'Past Projects | MSES',
    description: 'Representative environmental response, railroad services, and industrial work performed by Mid-South Environmental Services.',
    canonical: 'https://www.mses.online/past-projects'
  });

  return (
    <div className="page page-projects">
      <section className="page-header">
        <h1>Past Projects</h1>
        <p className="page-intro">Representative examples of work performed across environmental response, railroad services, and industrial operations.</p>
      </section>

      <section className="projects-list">
        {PROJECTS.map((project) => (
          <article key={project.id} className="project-entry">
            <div className="project-info">
              <h2>{project.title}</h2>
              <p className="project-scope">{project.scope}</p>
            </div>
            <div className="project-images">
              {project.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${project.title} - Image ${idx + 1}`}
                  className="project-image"
                  loading="lazy"
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="projects-cta">
        <p>Need environmental response or industrial services?</p>
        <a href="tel:844-637-4855" className="btn btn-primary">Call 844-637-4855</a>
      </section>
    </div>
  );
}

export default PastProjects;
