import "./SimplePortfolio.css";

function SimplePortfolio({ data }) {
  return (
    <div className="simple-container">
      <header className="simple-header">
        <div className="simple-topline">
          <span>PORTFOLIO</span>
          <span>PERSONAL PROFILE</span>
        </div>

        <div className="simple-intro">
          <p className="simple-eyebrow">GET TO KNOW ME</p>

          <h1>{data.fullName || "Your Name"}</h1>

          {data.aboutMe && (
            <p className="simple-intro-text">{data.aboutMe}</p>
          )}

          <div className="simple-contact">
            {data.email && <span>{data.email}</span>}
            {data.contactNumber && <span>{data.contactNumber}</span>}
          </div>
        </div>

        <div className="simple-header-bottom">
          <span>THOUGHTFUL. CURIOUS. ALWAYS LEARNING.</span>
          <span className="simple-mark">✳</span>
        </div>
      </header>

      <main className="simple-content">
        <div className="simple-content-heading">
          <span>01 — 05</span>
          <p>A CLOSER LOOK</p>
        </div>

        {data.education && (
          <section className="simple-section">
            <span className="simple-section-number">01</span>
            <div>
              <h2>Education</h2>
              <p>{data.education}</p>
            </div>
          </section>
        )}

        {data.skills && (
          <section className="simple-section">
            <span className="simple-section-number">02</span>
            <div>
              <h2>Skills & Strengths</h2>
              <p>{data.skills}</p>
            </div>
          </section>
        )}

        {data.projects && (
          <section className="simple-section">
            <span className="simple-section-number">03</span>
            <div>
              <h2>Selected Projects</h2>
              <p>{data.projects}</p>
            </div>
          </section>
        )}

        {data.experience && (
          <section className="simple-section">
            <span className="simple-section-number">04</span>
            <div>
              <h2>Experience</h2>
              <p>{data.experience}</p>
            </div>
          </section>
        )}

        {data.address && (
          <section className="simple-section">
            <span className="simple-section-number">05</span>
            <div>
              <h2>Based In</h2>
              <p>{data.address}</p>
            </div>
          </section>
        )}

        {data.socialLinks && (
          <section className="simple-social">
            <span>FIND ME ONLINE</span>
            <p>{data.socialLinks}</p>
          </section>
        )}

        <footer className="simple-footer">
          <span>THANK YOU FOR STOPPING BY.</span>
          <span>{data.fullName || "YOUR NAME"} · PORTFOLIO</span>
        </footer>
      </main>
    </div>
  );
}

export default SimplePortfolio;
