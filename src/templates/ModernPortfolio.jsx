import "./ModernPortfolio.css";

function ModernPortfolio({ data }) {
  return (
    <div className="modern-container">
      <header className="modern-header">
        <div className="modern-nav">
          <span className="modern-brand">folio<span>.</span></span>
          <span className="modern-nav-label">PERSONAL PORTFOLIO / 2026</span>
        </div>

        <div className="modern-hero">
          <div className="modern-hero-text">
            <p className="modern-eyebrow">
              <span className="modern-status-dot" />
              ABOUT ME
            </p>

            <h1>
              {data.fullName || "Your Name"}
              <span className="modern-title-mark">.</span>
            </h1>

            <div className="modern-intro-bottom">
              <p className="modern-role">Curious mind. Creative spirit.</p>

              {data.aboutMe && (
                <p className="modern-about">{data.aboutMe}</p>
              )}

              {data.email && (
                <a className="modern-email" href={`mailto:${data.email}`}>
                  {data.email} <span>↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="modern-hero-art" aria-hidden="true">
            <div className="modern-art-ring" />
            <div className="modern-art-block">
              <span>IDEAS</span>
              <span>INTO</span>
              <span className="modern-art-highlight">ACTION.</span>
            </div>
            <span className="modern-art-index">M—01</span>
            <span className="modern-art-star">✳</span>
          </div>
        </div>

        <div className="modern-header-bottom">
          <span>THINK / MAKE / GROW</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </header>

      <section className="modern-work-intro">
        <div>
          <p className="modern-eyebrow">THE OVERVIEW</p>
          <h2>A few things<br />about <span>me.</span></h2>
        </div>
        <p className="modern-work-note">
          A collection of my skills, learning, experience, and ideas brought
          to life.
        </p>
      </section>

      <main className="modern-grid">
        {data.skills && (
          <section className="modern-card modern-card-skills">
            <div className="modern-card-top">
              <span className="modern-number">01 / SKILLS</span>
              <span className="modern-card-symbol">✳</span>
            </div>
            <h3>My <br />toolkit </h3>
            <h4><p>{data.skills}</p></h4>
            <span className="modern-card-index">CAPABILITIES</span>
          </section>
        )}

        {data.projects && (
          <section className="modern-card modern-card-projects">
            <div className="modern-card-top">
              <span className="modern-number">02 / PROJECTS</span>
              <span className="modern-card-symbol">↗</span>
            </div>
           <h3>Proof of<br />work.</h3>
            <p>{data.projects}</p>
            <span className="modern-card-index">SELECTED WORK</span>
          </section>
        )}

        {data.experience && (
          <section className="modern-card modern-card-experience">
            <div className="modern-card-top">
              <span className="modern-number">03 / EXPERIENCE</span>
              <span className="modern-card-symbol">↗</span>
            </div>
            <h3>Where I've<br />been.</h3>
            <p>{data.experience}</p>
            <span className="modern-card-index">THE JOURNEY</span>
          </section>
        )}

        {data.education && (
          <section className="modern-card modern-card-education">
            <div className="modern-card-top">
              <span className="modern-number">04 / EDUCATION</span>
              <span className="modern-card-symbol">✳</span>
            </div>
            <h3>Where I Learned<br />the Ropes</h3>
            <p>{data.education}</p>
            <span className="modern-card-index">WHAT I'VE LEARNED</span>
          </section>
        )}
      </main>

      {(data.contactNumber || data.address || data.socialLinks) && (
        <footer className="modern-footer">
          <div className="modern-footer-heading">
            <p className="modern-eyebrow">HAVE SOMETHING IN MIND?</p>
            <h2>Let's make<br /><span>something happen.</span></h2>
          </div>

          <div className="modern-footer-details">
            {data.contactNumber && (
              <p><span>PHONE</span>{data.contactNumber}</p>
            )}
            {data.address && (
              <p><span>LOCATION</span>{data.address}</p>
            )}
            {data.socialLinks && (
              <p><span>ELSEWHERE</span>{data.socialLinks}</p>
            )}
          </div>
        </footer>
      )}

      <div className="modern-bottom-line">
        <span>MADE WITH INTENTION.</span>
        <span>{data.fullName || "YOUR NAME"} © 2026</span>
      </div>
    </div>
  );
}

export default ModernPortfolio;
