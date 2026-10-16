
import "./CreativePortfolio.css";

function CreativePortfolio({ data }) {
  const skills = (data.skills || "")
    .split(/[,\n]/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="creative-container">
      <header className="creative-header">
        <div className="creative-topbar">
          <span>CREATIVE PORTFOLIO</span>
          <span>SELECTED WORKS · 2026</span>
        </div>

        <div className="creative-hero">
          <div className="creative-hero-copy">
            <p className="creative-kicker">
               HELLO, WORLD! <span className="decorative-star" aria-hidden="true" />
            </p>
            <h1>{data.fullName || "Your Name"}<span>!</span></h1>
            <p className="creative-intro">
              {data.aboutMe ||
                "A curious mind creating ideas, exploring possibilities, and turning inspiration into action."}
            </p>
          </div>

          <div className="creative-hero-visual">
            {data.profilePicture ? (
              <img
                className="creative-profile-picture"
                src={data.profilePicture}
                alt={`${data.fullName || "Profile"}'s profile`}
              />
            ) : (
              <div className="creative-picture-placeholder">
                <span>YOUR</span>
                <span>STORY</span>
                <span>
                  STARTS HERE <span className="decorative-star" aria-hidden="true" />
                </span>
              </div>
            )}
            <span className="creative-visual-number">01 / ME</span>
          </div>

          <span
                className="creative-deco creative-deco-one decorative-star"
                aria-hidden="true"
                />
          <span className="creative-deco creative-deco-two">+</span>
        </div>

        <div className="creative-marquee">
            <span>IMAGINE IT</span>
            <span><span className="decorative-star" aria-hidden="true" /></span>
            <span>CREATE IT</span>
            <span><span className="decorative-star" aria-hidden="true" /></span>
            <span>MAKE IT MATTER</span>
            </div>
      </header>

      <main className="creative-content">
        <section className="creative-section creative-about">
          <div className="creative-section-label">
            <span>01</span>
            <span>THE PERSON BEHIND THE IDEAS</span>
          </div>
          <div className="creative-about-body">
            <h2>A little about <em>me.</em></h2>
            <p>
              {data.aboutMe ||
                "Every great journey begins with curiosity. This is where my story unfolds."}
            </p>
            {data.address && (
              <p className="creative-location">BASED IN · {data.address}</p>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="creative-section creative-skills">
            <div className="creative-section-label">
              <span>02</span>
              <span>THINGS I BRING TO THE TABLE</span>
            </div>
            <h2>My creative <em>suite.</em></h2>
            <div className="creative-skill-list">
              {skills.map((skill, index) => (
                <span className="creative-skill" key={`${skill}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {skill}
                  <svg
                        className="arrow-symbol"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                    </svg>
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="creative-feature-grid">
          {data.projects && (
            <article className="creative-feature creative-projects">
             <div className="creative-feature-top">
                <span>03 / WHAT I'VE MADE</span>
                <span>
                <span className="decorative-star" aria-hidden="true" />
                </span>
                </div>
              <h2>Fragments of <em>creative mind.</em></h2>
              <p>{data.projects}</p>
              <div className="creative-feature-bottom">
                    PROJECTS{" "}
                    <svg
                        className="arrow-symbol"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                    </svg>
                    </div>
            </article>
          )}

          {data.education && (
            <article className="creative-feature creative-education">
             <div className="creative-feature-top">
                <span>04 / ALWAYS LEARNING</span>
                <span>
                <span className="decorative-star" aria-hidden="true" />
                </span>
            </div>
              <h2>Still <em>growing.</em></h2>
              <p>{data.education}</p>
              <div className="creative-feature-bottom">
                    EDUCATION{" "}
                    <svg
                        className="arrow-symbol"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                    </svg>
                    </div>
            </article>
          )}
        </section>

        {data.experience && (
          <section className="creative-section creative-experience">
            <div className="creative-section-label">
              <span>05</span>
              <span>THE JOURNEY SO FAR</span>
            </div>
            <h2>Where I've <em>been.</em></h2>
           <div className="creative-experience-content">
                <span className="creative-experience-symbol">
                    <svg
                    className="arrow-symbol"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M5 5 19 19" />
                    <path d="M19 9v10H9" />
                    </svg>
                </span>
                <p>{data.experience}</p>
                </div>
          </section>
        )}

        <footer className="creative-footer">
          <p className="creative-kicker">HAVE A GOOD IDEA?</p>
          <h2>Let's make<br /><em>something happen.</em></h2>

          <div className="creative-contact-grid">
            {data.email && (
              <div>
                <span>EMAIL</span>
                <a href={`mailto:${data.email}`}>
                    {data.email}{" "}
                    <svg
                    className="arrow-symbol"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                    </svg>
                </a>
                </div>
            )}
            {data.contactNumber && (
              <div>
                <span>PHONE</span>
                <p>{data.contactNumber}</p>
              </div>
            )}
            {data.socialLinks && (
              <div>
                <span>FIND ME ONLINE</span>
                <p>{data.socialLinks}</p>
              </div>
            )}
          </div>

          <div className="creative-footer-bottom">
            <span>
                MADE WITH CURIOSITY{" "}
                <span className="decorative-star" aria-hidden="true" />
            </span>
            <span>{data.fullName || "YOUR NAME"} · PORTFOLIO</span>
        </div>
        </footer>
      </main>
    </div>
  );
}

export default CreativePortfolio;
