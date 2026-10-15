

import "./ProfessionalPortfolio.css";

function ProfessionalPortfolio({ data }) {
  return (
    <div className="professional-container">
      <aside className="professional-sidebar">
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

        {data.skills && (
          <div className="professional-sidebar-skills">
            <h2>CORE SKILLS</h2>
            <p>{data.skills}</p>
          </div>
        )}
      </aside>

      <main className="professional-main">
        <header className="professional-heading">
          <p>PROFILE &amp; EXPERIENCE</p>
          <span>✦</span>
        </header>

        {data.aboutMe && (
          <section className="professional-section">
            <h2>Professional Summary</h2>
            <p>{data.aboutMe}</p>
          </section>
        )}

        {data.experience && (
          <section className="professional-section">
            <h2>Experience</h2>
            <p>{data.experience}</p>
          </section>
        )}

        {data.projects && (
          <section className="professional-section">
            <h2>Selected Projects</h2>
            <p>{data.projects}</p>
          </section>
        )}

        {data.education && (
          <section className="professional-section">
            <h2>Education</h2>
            <p>{data.education}</p>
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
