
import "./ProfessionalPortfolio.css";

function ProfessionalPortfolio({ data }) {
  const skills = (data.skills || "")
    .split(/[,\n]/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="professional-container">
      <aside className="professional-sidebar">
        {data.profilePicture && (
          <img
            className="professional-profile-picture"
            src={data.profilePicture}
            alt={`${data.fullName || "Profile"}'s profile`}
          />
        )}

        <p className="professional-mark">✳</p>

        <p className="professional-label">
          PERSONAL PORTFOLIO
        </p>

        <h1>{data.fullName || "Your Name"}</h1>

        <div className="professional-rule" />

        <div className="professional-contact">
          <h2>CONTACT</h2>
          {data.email && <p>{data.email}</p>}
          {data.contactNumber && <p>{data.contactNumber}</p>}
          {data.address && <p>{data.address}</p>}
          {data.socialLinks && <p>{data.socialLinks}</p>}
        </div>

        {skills.length > 0 && (
          <div className="professional-sidebar-skills">
            <h2>CORE SKILLS</h2>
            <p>{skills.join(" · ")}</p>
          </div>
        )}
      </aside>

      <main className="professional-main">
        <header className="professional-heading">
          <p>PROFILE &amp; EXPERIENCE</p>
          <span>✦</span>
        </header>

        <div className="professional-title-block">
          <p className="professional-eyebrow">GET TO KNOW ME</p>
          <h2>About Me</h2>
        </div>

        {data.aboutMe && (
          <section className="professional-intro-card">
            <div className="professional-intro-copy">
              <p className="professional-card-label">
                PROFESSIONAL PROFILE
              </p>
              <h3>{data.fullName || "A little about me"}</h3>
              <p>{data.aboutMe}</p>
            </div>

            <div className="professional-intro-contact">
              <p className="professional-card-label">CONTACT DETAILS</p>
              {data.email && (
                <div className="professional-detail">
                  <span>EMAIL</span>
                  <p>{data.email}</p>
                </div>
              )}
              {data.contactNumber && (
                <div className="professional-detail">
                  <span>PHONE</span>
                  <p>{data.contactNumber}</p>
                </div>
              )}
              {data.address && (
                <div className="professional-detail">
                  <span>LOCATION</span>
                  <p>{data.address}</p>
                </div>
              )}
              {data.socialLinks && (
                <div className="professional-detail">
                  <span>SOCIAL LINKS</span>
                  <p>{data.socialLinks}</p>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="professional-card-grid">
          {data.education && (
            <section className="professional-section professional-education">
              <p className="professional-card-label">01 / BACKGROUND</p>
              <h2>Education</h2>
              <p>{data.education}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="professional-section professional-skills">
              <p className="professional-card-label">02 / EXPERTISE</p>
              <h2>Core Skills</h2>
              <div className="professional-skill-list">
                {skills.map((skill, index) => (
                  <span key={`${skill}-${index}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.experience && (
          <section className="professional-section professional-wide-card">
            <p className="professional-card-label">03 / CAREER</p>
            <h2>Experience</h2>

            <div className="professional-timeline">
              <span className="professional-timeline-marker" />
              <div className="professional-timeline-content">
                <p>{data.experience}</p>
              </div>
            </div>
          </section>
        )}

        {data.projects && (
          <section className="professional-section professional-wide-card">
            <p className="professional-card-label">04 / SELECTED WORK</p>
            <h2>Projects</h2>
            <p>{data.projects}</p>
          </section>
        )}

        <footer className="professional-footer">
          Prepared with care · {data.fullName || "My Portfolio"}
        </footer>
      </main>
    </div>
  );

}

export default ProfessionalPortfolio;