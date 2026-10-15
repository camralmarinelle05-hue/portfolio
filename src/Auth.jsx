
import { useState } from "react";
import { supabase } from "./supabase";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        setMessage(
          data.session
            ? "Account created successfully!"
            : "Please check your email to confirm your account."
        );
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <section className="auth-card">
        <div className="auth-brand">
          <span className="auth-brand-mark">✳</span>
          <span>folio<span className="auth-brand-dot">.</span></span>
        </div>

        <p className="auth-eyebrow">YOUR STORY STARTS HERE</p>

        <h1>{isLogin ? "Welcome back." : "Create your space."}</h1>

        <p className="auth-description">
          {isLogin
            ? "Pick up where your story left off."
            : "A portfolio that feels like you starts here."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Log In to Folio"
                : "Create My Account"}
            {!loading && <span>↗</span>}
          </button>
        </form>

        {message && (
          <p
            className={`auth-message ${
              message.toLowerCase().includes("successfully") ||
              message.toLowerCase().includes("check your email")
                ? "auth-message-success"
                : "auth-message-error"
            }`}
            role="status"
          >
            {message}
          </p>
        )}

        <div className="auth-switch">
          <span>
            {isLogin
              ? "New to Folio?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Create an account" : "Log in"}
          </button>
        </div>

        <p className="auth-footer">
          ✳ &nbsp; Made to tell your story.
        </p>
      </section>
    </main>
  );
}