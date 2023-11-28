import React from "react";
import {
  CloudIcon,
  ForwardIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import EmailForm from "./EmailForm";

const LandingPage = () => {
  // const youtubeVideoId = 'aHmv3LSsoDI';
  // const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
  return (
    <div className="landing-page">
      <header className="header">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              {/* <img src="/img/Celest_Gradient_Icon.png" alt="Celest Logo" className="hero-logo" /> */}
              <h1 className="header-title">
                Build your backend,
                <br /> Flutter style.
              </h1>
              <p className="header-subtitle">
                From your Flutter app, to building your backend in the cloud,
                Celest helps you build every piece of your Flutter app in your
                IDE.
              </p>
              <div className="hero-cta">
                <img src="/img/YC.svg" alt="YC Logo" className="yc-image" />
              </div>
            </div>
            <div className="hero-media">
              <img
                src="/img/data.png"
                alt="Celest Hero"
                className="hero-image"
              />
            </div>
          </div>
        </section>
        <section className="hero-get-started">
          <div>
            <h2 className="get-started-header">Interested in Early Access?</h2>
            <EmailForm />
          </div>
        </section>
      </header>
      <h2 className="features-header">Activate the builder in you</h2>
      <section className="features">
        <div className="feature-card">
          <CloudIcon className="feature-icon" />
          <h3 className="feature-title">Managed Backend</h3>
          <p>
            Use a single command <code>celest deploy</code> to setup your
            backend.
          </p>
        </div>
        <div className="feature-card">
          <CodeBracketIcon className="feature-icon" />
          <h3 className="feature-title">All in Dart</h3>
          <p>
            Build your backend features all in Dart, with no additional tooling!
          </p>
        </div>
        <div className="feature-card">
          <ForwardIcon className="feature-icon" />
          <h3 className="feature-title">Iterate locally fast</h3>
          <p>
            Run <code>celest start</code> to see your changes locally instantly.
          </p>
        </div>
      </section>
      <section className="team">
        <h2 className="team-header">Meet the Celest team</h2>
        <div className="team-info">
          <div className="team-member">
            <img src="/img/Dillon.png" alt="Dillon Nys" />
            <h3>Dillon Nys</h3>
            <p>Founder, Engineering</p>
          </div>
          <div className="team-member">
            <img src="/img/Abdallah.png" alt="Abdallah Shaban" />
            <h3>Abdallah Shaban</h3>
            <p>Founder, Product</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
