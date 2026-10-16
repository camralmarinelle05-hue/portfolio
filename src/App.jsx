import "./App.css";
import SimplePortfolio from "./templates/SimplePortfolio";
import ModernPortfolio from "./templates/ModernPortfolio";
import CreativePortfolio from "./templates/CreativePortfolio";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth";


function App() {
const [session, setSession] = useState(null);
const [showLogin, setShowLogin] = useState(false);
const [checkingSession, setCheckingSession] = useState(true);
const [showPreview, setShowPreview] = useState(false);
const [showSavedPortfolios, setShowSavedPortfolios] = useState(false);
const [savedPortfolios, setSavedPortfolios] = useState([]);
const [loadingSavedPortfolios, setLoadingSavedPortfolios] = useState(false);


useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
    setCheckingSession(false);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => subscription.unsubscribe();
}, []);


  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [experience, setExperience] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState("simple");
  const [templateChosen, setTemplateChosen] = useState(false);

  const [portfolioId, setPortfolioId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = {
  
  full_name: fullName,
  profile_picture: profilePicture,
  email,
  contact_number: contactNumber,
  address,
  about_me: aboutMe,
  education,
  skills,
  projects,
  experience,
  social_links: socialLinks,
  template: selectedTemplate,
};
const uploadProfilePicture = async (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Please choose an image smaller than 2 MB.");
    return;
  }

  try {
    const fileExt = file.name.split(".").pop().toLowerCase();
    const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);

    setProfilePicture(data.publicUrl);
    alert("Profile picture uploaded successfully!");
  } catch (error) {
    console.error("Profile picture upload error:", error);
    alert("Could not upload profile picture: " + error.message);
  }
};
  const fetchSavedPortfolios = async () => {
    if (!session?.user?.id) return;

    setLoadingSavedPortfolios(true);
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .select("id, full_name, email, template")
        .eq("user_id", session.user.id);

      if (error) throw error;
      setSavedPortfolios(data ?? []);
    } catch (error) {
      console.error("Could not fetch saved portfolios:", error);
      alert("Could not load saved portfolios: " + error.message);
    } finally {
      setLoadingSavedPortfolios(false);
    }
  };

  const openSavedPortfolio = async (id, preview = false) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", id)
        .eq("user_id", session.user.id)
        .single();

      if (error) throw error;
      setFormValues(data);
      setSearchId(data.id);
      setTemplateChosen(true);
      setShowSavedPortfolios(false);
      setShowPreview(preview);
    } catch (error) {
      console.error("Could not open saved portfolio:", error);
      alert("Could not open portfolio: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSavedPortfolio = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this portfolio?");
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("portfolios")
        .delete()
        .eq("id", id)
        .eq("user_id", session.user.id);

      if (error) throw error;

      if (portfolioId === id) {
        setPortfolioId(null);
        setSearchId("");
        setFullName("");
        setEmail("");
        setContactNumber("");
        setAddress("");
        setAboutMe("");
        setEducation("");
        setSkills("");
        setProjects("");
        setExperience("");
        setSocialLinks("");
        setSelectedTemplate("simple");
        setShowPreview(false);
      }

      await fetchSavedPortfolios();
      alert("Portfolio deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete portfolio: " + error.message);
    }
  };

  useEffect(() => {
    if (session?.user?.id) fetchSavedPortfolios();
  }, [session]);

  const setFormValues = (data) => {
    setPortfolioId(data.id);
    setFullName(data.full_name ?? "");
    setProfilePicture(data.profile_picture ?? "");
    setEmail(data.email ?? "");
    setContactNumber(data.contact_number ?? "");
    setAddress(data.address ?? "");
    setAboutMe(data.about_me ?? "");
    setEducation(data.education ?? "");
    setSkills(data.skills ?? "");
    setProjects(data.projects ?? "");
    setExperience(data.experience ?? "");
    setSocialLinks(data.social_links ?? "");
    setSelectedTemplate(data.template ?? "simple");
  };

  const loadPortfolio = async () => {
    if (!searchId.trim()) {
      alert("Enter the portfolio ID first.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
     .from("portfolios")
     .select("*")
     .eq("id", searchId.trim())
     .eq("user_id", session.user.id)
     .single();
      
      if (error) throw error;

      setFormValues(data);
      alert("Portfolio loaded. You can now edit it.");
    } catch (error) {
      console.error("Load error:", error);
      alert("Could not load portfolio: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const savePortfolio = async () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Please enter your full name and email.");
      return;
    }

    setLoading(true);

    try {
      let result;

      if (portfolioId) {
        result = await supabase
          .from("portfolios")
          .update(fields)
          .eq("id", portfolioId)
          .eq("user_id", session.user.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("portfolios")
          .insert([{ ...fields, user_id: session.user.id }])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setPortfolioId(result.data.id);
      setSearchId(result.data.id);
      await fetchSavedPortfolios();

      alert(
        portfolioId
          ? "Portfolio updated successfully!"
          : "Portfolio saved successfully! Your portfolio ID is now in the Load field."
      );
    } catch (error) {
      console.error("Save error:", error);
      alert("Could not save portfolio: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolio = async () => {
  if (!portfolioId) {
    alert("No portfolio selected.");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete this portfolio?"
  );

  if (!confirmed) return;

  try {
    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", portfolioId)
      .eq("user_id", session.user.id);

    if (error) throw error;

    setPortfolioId(null);
    setSearchId("");
    setFullName("");
    setEmail("");
    setContactNumber("");
    setAddress("");
    setAboutMe("");
    setEducation("");
    setSkills("");
    setProjects("");
    setExperience("");
    setSocialLinks("");
    setSelectedTemplate("simple");

    await fetchSavedPortfolios();
    alert("Portfolio deleted successfully!");
  } catch (error) {
    alert("Delete failed: " + error.message);
  }
}; 

  const inputStyle = {
  display: "block",
  width: "100%",
  maxWidth: "500px",
  padding: "10px",
  marginTop: "6px",
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
};

  const textFields = [
    ["Contact Number", contactNumber, setContactNumber],
    ["Address", address, setAddress],
    ["About Me", aboutMe, setAboutMe],
    ["Education", education, setEducation],
    ["Skills", skills, setSkills],
    ["Projects", projects, setProjects],
    ["Experience", experience, setExperience],
    ["Social Links", socialLinks, setSocialLinks],
  ];
    const portfolioData = {
    fullName,
    profilePicture,
    email,
    contactNumber,
    address,
    aboutMe,
    education,
    skills,
    projects,
    experience,
    socialLinks,
  };
if (checkingSession) {
  return <p>Checking login...</p>;
}
  if (showLogin && !session) {
  return <Auth />;
}
if (!templateChosen) {
    if (showSavedPortfolios) {
      return (
        <div className="home-screen">
          <header className="home-nav">
            <button
              type="button"
              className="brand"
              onClick={() => setShowSavedPortfolios(false)}
            >
              <span className="brand-mark decorative-star" aria-hidden="true" />
              <span>folio.</span>
            </button>

            <button
              type="button"
              className="nav-saved-button"
              onClick={() => setShowSavedPortfolios(false)}
            >
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
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>{" "}
                Back to Home
            </button>
          </header>

          <section className="saved-section">
            <h2>My Saved Portfolios</h2>
          <p>Manage your saved portfolios in one place.</p>
          <div className="saved-grid">
                    {savedPortfolios.map((portfolio) => (
                      <article className={`saved-card saved-card-${portfolio.template || "simple"}`}
                           key={portfolio.id}>
                       
                        <p className="template-number">
                              {(portfolio.template || "simple") === "professional"
                                ? "CREATIVE"
                                : (portfolio.template || "simple").toUpperCase()}
                          </p>
                        <h3>{portfolio.full_name || "Untitled Portfolio"}</h3>
                        <p>{portfolio.email || "No email provided"}</p>
                          
                          
                      
                      <div className="saved-actions">
                        <button
                          type="button"
                          className="action-button action-preview"
                          onClick={() => openSavedPortfolio(portfolio.id, true)}
                          disabled={loading}
                        >
                          Preview
                        </button>

                        <button
                          type="button"
                          className="action-button action-edit"
                          onClick={() => openSavedPortfolio(portfolio.id, false)}
                          disabled={loading}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="action-button action-delete"
                          onClick={() => deleteSavedPortfolio(portfolio.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>


                      </article>
                    ))}
                  </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <header className="home-nav">
        <button
          type="button"
          className="brand"
          onClick={() => setTemplateChosen(false)}
        >
          <span className="brand-mark decorative-star" aria-hidden="true" />
          <span>folio.</span>
        </button>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#templates">Templates</a>
          
          <button
                  type="button"
                  className="nav-saved-button"
                  onClick={async () => {
                    await fetchSavedPortfolios();
                    setShowSavedPortfolios(true);
                  }}
                >
          My Portfolios
          </button>
          </nav>
                <button
                  type="button"
                  className="nav-account-button"
                  onClick={async () => {
                    if (session) {
                      await supabase.auth.signOut();
                    } else {
                      setShowLogin(true);
                    }
                  }}
                >
                  {session ? "Log out" : "Log in"}{" "}
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
                </button>

      </header>

      <section className="hero-section" id="home">
        <div className="hero-glow" />

        <div className="hero-copy">
          <p className="eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </p>

          <h1>
            Your journey.
            <br />
            Your vision.
            <br />
            <span>Your Portfolio.</span>
          </h1>

          <p className="hero-description">
            Thoughtfully designed for students, professionals, and creators,
            our portfolio generator helps you transform your experiences,
            skills, and achievements into a beautiful digital presence.
            Choose from Simple, Modern, or Creative templates and share
            your story with confidence and style.
          </p>

          <a className="hero-cta" href="#templates">
            Find your template <span className="template-plus">+</span>
          </a>

          <p className="hero-note">
  <         span className="decorative-star" aria-hidden="true" />
              Three styles. One space to tell your story.
          </p>
        </div>

        <div className="hero-art" aria-label="Portfolio style previews">
          <div className="floating-note">
              MADE BY YOU
              <span className="decorative-star" aria-hidden="true" />
          </div>

          <div className="mini-portfolio mini-modern">
            <span className="mini-label">01 / MODERN</span>
            <div className="mini-modern-shape" />
            <h3>Ideas into<br />impact.</h3>
            <div className="mini-line" />
            <div className="mini-line short" />
            <div className="mini-dots">●　●　●</div>
          </div>

          <div className="mini-portfolio mini-professional">
            <span className="mini-label">03 / PROFESSIONAL</span>
            <div className="mini-professional-orb" />
            <h3>Build something<br />remarkable.</h3>
            <div className="mini-line" />
            <div className="mini-line short" />
          </div>

          <div className="mini-portfolio mini-simple">
            <span className="mini-label">02 / SIMPLE</span>
            <div className="mini-avatar">
              <span className="decorative-star" aria-hidden="true" />
            </div>
            <p className="mini-hello">Hello, I'm</p>
            <h3>Your Name.</h3>
            <p className="mini-caption">Your story, thoughtfully told.</p>
            <div className="mini-line" />
            <div className="mini-line short" />
          </div>

          <span
              className="art-sparkle sparkle-one decorative-star"
              aria-hidden="true"
          />
          <span className="art-sparkle sparkle-two decorative-star" aria-hidden="true" />
        </div>
      </section>

      <section className="template-section" id="templates">
        <div className="section-heading">
          <p className="eyebrow">A STYLE FOR EVERY STORY</p>
          <h2>Three templates. <span>Three vibes.</span></h2>
          <p>
            From clean and understated to creative and bold,
            find the look that feels right for you.
          </p>
        </div>

        <div className="template-grid">
          <article className="template-card card-simple">
            <div className="template-preview preview-simple">
              <div className="preview-topline">
                <span>YOUR NAME</span>
                <span>ABOUT　 WORK</span>
              </div>
              <div className="preview-simple-content">
                <p>PORTFOLIO / 2026</p>
                <h3>Less, but<br />better.</h3>
                <div className="preview-rule" />
                <div className="preview-lines">
                  <i /><i /><i />
                </div>
              </div>
                <div className="preview-circle">
               <span className="decorative-star" aria-hidden="true" />
             </div>
            </div>

            <div className="template-info">
              <div>
                <p className="template-number">01 — THE ESSENTIAL</p>
                <h3>Simple</h3>
                <p>Polished, clean, timeless.</p>
              </div>
              <button
                type="button"
                className="template-arrow"
                aria-label="Choose Simple template"
                onClick={() => {
                  setSelectedTemplate("simple");
                  setTemplateChosen(true);
                }}
              >
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
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
              </button>
            </div>
          </article>

          <article className="template-card card-modern">
            <div className="template-preview preview-modern">
              <div className="preview-topline">
                <span>YOUR NAME®</span>
                <span>
                  SELECTED WORK{" "}
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
              </div>
              <div className="preview-modern-shape" />
              <div className="preview-modern-content">
                <p>CREATIVE PORTFOLIO</p>
                <h3>Make ideas<br />matter.</h3>
               <span className="preview-pill">
                    EXPLORE MY WORK{" "}
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
              </div>
              <span className="preview-star decorative-star" aria-hidden="true" />
            </div>

            <div className="template-info">
              <div>
                <p className="template-number">02 — THE CREATIVE</p>
                <h3>Modern</h3>
                <p>Expressive, fresh, distinctive.</p>
              </div>
              <button
                type="button"
                className="template-arrow"
                aria-label="Choose Modern template"
                onClick={() => {
                  setSelectedTemplate("modern");
                  setTemplateChosen(true);
                }}
              >
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
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </button>
            </div>
          </article>

          <article className="template-card card-professional">
            <div className="template-preview preview-professional">
              <div className="preview-topline">
                <span>NAME / PORTFOLIO</span>
                <span>2026</span>
              </div>
              <div className="preview-pro-content">
                <p>SELECTED EXPERIENCE</p>
                <h3>Thoughtful<br />work. Real<br />impact.</h3>
                <div className="preview-pro-bottom">
                  <span>DESIGN / BUSINESS / TECH</span>
                  <span>01 — 04</span>
                </div>
              </div>
            </div>

            <div className="template-info">
              <div>
                <p className="template-number">03 — THE CREATIVE</p>
                <h3>Creative</h3>
                <p>Chic, cool, sophisticated.</p>
              </div>
              <button
                type="button"
                className="template-arrow"
                aria-label="Choose Creative template"
                onClick={() => {
                  setSelectedTemplate("professional");
                  setTemplateChosen(true);
                }}
              >
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
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </section>

      
      <footer className="home-footer">
        <span className="footer-brand">
          <span className="decorative-star" aria-hidden="true" /> folio.
        </span>
        <span>Made to tell your story.</span>
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top{" "}
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
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
}

  if (showPreview) {
  const previewButtons = (
    <div className="preview-navigation">
      <button
        type="button"
        className="logout-button"
        onClick={() => setShowPreview(false)}
      >
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
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>{" "}
        Back to Edit
      </button>

      <button
        type="button"
        className="preview-home-button"
        onClick={() => {
          setShowPreview(false);
          setTemplateChosen(false);
        }}
      >
        Home
      </button>
    </div>
  );

  if (selectedTemplate === "simple") {
    return (
      <>
        {previewButtons}
        <SimplePortfolio data={portfolioData} />
      </>
    );
  }

  if (selectedTemplate === "modern") {
    return (
      <>
        {previewButtons}
        <ModernPortfolio data={portfolioData} />
      </>
    );
  }

  return (
    <>
      {previewButtons}
      <CreativePortfolio data={portfolioData} />
    </>
  );
}
return (
    <main
    style={{
    width: "100%",
    maxWidth: "760px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box",
    }}
    >
   <div
   style={{
   display: "flex",
   justifyContent: "space-between",
   marginBottom: "20px",
  }}
>
  <button
  type="button"
  className="logout-button"
  onClick={() => {
    setShowPreview(false);
    setTemplateChosen(false);
    setShowSavedPortfolios(false);
  }}
>
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
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>{" "}
      Home
      </button>
  <button
  type="button"
  className="logout-button"
  onClick={async () => {
    await supabase.auth.signOut();
  }}
>
  Logout
</button>
</div>
      <h1>Portfolio Generator</h1>

     

      <h2>Load an existing portfolio</h2>
      <label htmlFor="portfolio-id">Portfolio ID</label>
      <input
        id="portfolio-id"
        style={inputStyle}
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Paste a saved portfolio UUID"
      />

      <button
        type="button"
        onClick={loadPortfolio}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        Load Portfolio
      </button>

      <hr style={{ margin: "24px 0" }} />
    <button
  type="button"
  onClick={() => setTemplateChosen(false)}
  style={{
    marginBottom: "20px",
    padding: "10px",
  }}
>
  Change Template
</button>
        <h2>{portfolioId ? "Edit Portfolio" : "Create Portfolio"}</h2>
              <label htmlFor="profile-picture">Upload Profile Picture</label>
              <input
                id="profile-picture"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={inputStyle}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadProfilePicture(file);
                  }
                }}
              />

              {profilePicture && (
                <div style={{ textAlign: "center", marginTop: "12px" }}>
                  <img
                    src={profilePicture}
                    alt="Profile preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}

        <label htmlFor="full-name">Full Name</label>
        <input
          id="full-name"
          style={inputStyle}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        style={inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      {textFields.map(([label, value, setter]) => (
        <div key={label} style={{ marginTop: "14px" }}>
          <label>{label}</label>
          <textarea
            style={{ ...inputStyle, minHeight: "65px" }}
            value={value}
            onChange={(e) => setter(e.target.value)}
            placeholder={label}
          />
        </div>
      ))}

    
        <button
          type="button"
        className={`action-button ${portfolioId ? "action-update" : "action-edit"}`}
          onClick={savePortfolio}
          disabled={loading}
          style={{ marginTop: "20px", padding: "10px 18px" }}
        >
          {loading
            ? "Please wait..."
            : portfolioId
              ? "Update Portfolio"
              : "Save Portfolio"}
        </button>
            
            <button
            type="button"
            className="action-button action-preview"
            onClick={() => setShowPreview(true)}
            style={{
              marginLeft: "10px",
              marginTop: "20px",
              padding: "10px 18px",
          }}
  >
      Preview Portfolio
  </button>

      {portfolioId && (
  <>
    <button
      type="button"
      onClick={deletePortfolio}
      className="action-button action-delete"
style={{
  marginLeft: "10px",
  marginTop: "20px",
  padding: "10px 18px",
}}
    >
      Delete Portfolio
    </button>

    <button
        type="button"
        className="action-button action-edit"
        onClick={() => {
        setPortfolioId(null);
        setSearchId("");
        setFullName("");
        setEmail("");
        setContactNumber("");
        setAddress("");
        setAboutMe("");
        setEducation("");
        setSkills("");
        setProjects("");
        setExperience("");
        setSocialLinks("");
        setSelectedTemplate("simple");
          }}
            style={{
            marginLeft: "10px",
            marginTop: "20px",
            padding: "10px 18px"
          }}
    >
      Create New Portfolio
    </button>
  </>
)}
    </main>
  );
}


export default App;