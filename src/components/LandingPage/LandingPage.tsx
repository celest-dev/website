import React, { useEffect, useState } from "react";
import {
  CloudIcon,
  ForwardIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { AiFillApi } from "react-icons/ai";
import { FaLock, FaDatabase, FaImages, FaServer } from "react-icons/fa";
import { FiCloudLightning } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { MdPolicy, MdOutlineComputer } from "react-icons/md";
import CodeBlock from "@theme/CodeBlock";

import EmailForm from "./EmailForm";
import Link from "@docusaurus/Link";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <h1 className="header-title">
                Build your backend,
                <br /> Flutter style.
              </h1>
              <p className="header-subtitle">
                From your Flutter app to your backend in the cloud, Celest helps
                you build every piece of your application in Dart, all without
                leaving your IDE.
                you build every piece of your application in Dart, all without
                leaving your IDE.
              </p>
              <div className="hero-cta">
                <div className="download-button-container">
                  {/* <p className="download-text">Install and try Celest today.</p> */}
                  <a
                    href= {operatingSystem.downloadLink}
                    target="_blank"
                    className="download-button"
                  >
                    <IoMdDownload className="download-icon" /> Install Celest
                  </a>
                </div>
                {/* <a
                  href="https://www.ycombinator.com/companies/celest"
                  target="_blank"
                >
                  <img
                    src="/img/yc-badge.svg"
                    alt="YC Logo"
                    className="yc-image"
                  />
                </a> */}
              </div>
            </div>
            <div className="hero-media">
              <CodeBlock
                className="hero-code"
                language="dart"
                title="app/celest/apis/my_api.dart  ←  Your API"
              >
                {`
import 'package:celest/celest.dart';
import 'package:celest/api.dart' as api;

@api.authenticated()
String sayHello(String name) {
  return 'Hello, $name!';
}`.trim()}
              </CodeBlock>
              <br />
              <CodeBlock
                className="hero-code"
                language="dart"
                title="app/lib/main.dart  ←  Your Flutter app"
              >
                {`
import 'celest/client.dart';

Future<void> introduceMyself() async {
  final res = await apis.myApi.sayHello('Celest');
  print(res); // Hello, Celest!
}`.trim()}
              </CodeBlock>
            </div>
          </div>
        </section>
        <section className="hero-get-started">
          <div>
            <h2 className="get-started-header">Want To Stay Updated?</h2>
            <EmailForm />
          </div>
        </section>
      </header>
      <h2 className="middle-header">Activate the builder in you</h2>
      <section className="features">
        <div className="feature-card">
          <CodeBracketIcon className="feature-icon" />
          <h3 className="feature-title">All in Dart</h3>
          <p>
            Build your backend features all in Dart, with no additional packages
            or tooling!
          </p>
        </div>
        <div className="feature-card">
          <ForwardIcon className="feature-icon" />
          <h3 className="feature-title">Iterate locally fast</h3>
          <p>
            Run <code>celest start</code> to test your changes instantly.
          </p>
        </div>
        <div className="feature-card">
          <CloudIcon className="feature-icon" />
          <h3 className="feature-title">Managed Backend</h3>
          <p>
            Use a single command <code>celest deploy</code> to update your
            backend.
          </p>
        </div>
      </section>
      <section className="celest-categories">
        <h2 className="middle-header categories-bottom-header-margin">
          Code your backend in Dart
        </h2>
        <div className="categories">
          <div className="category-card">
            <AiFillApi className="category-icon" />
            <h3 className="category-title">Functions</h3>
            <p className="category-description">
              Build serverless functions that run in the cloud.
            </p>
          </div>
          <div className="category-card">
            <FaDatabase className="category-icon" />
            <img src="/img/coming-soon.svg" alt="Coming Soon Badge" />
            <h3 className="category-title">Data</h3>
            <p className="category-description">
              Define your data schema, relationships, and authorization rules in
              code.
            </p>
          </div>
          <div className="category-card">
            <FaLock className="category-icon" />
            <img src="/img/coming-soon.svg" alt="Coming Soon Badge" />
            <h3 className="category-title">Auth</h3>
            <p className="category-description">
              Authenticate your users with social sign-in, passwordless and
              WebAuthn.
              Authenticate your users with social sign-in, passwordless and
              WebAuthn.
              Authenticate your users with social sign-in, passwordless and
              WebAuthn.
            </p>
          </div>
          <div className="category-card">
            <img src="/img/coming-soon.svg" alt="Coming Soon Badge" />
            <MdPolicy className="category-icon" />
            <h3 className="category-title">Policies</h3>
            <p className="category-description">
              Author fine-grained access controls for all your backend
              components.
            </p>
          </div>
          <div className="category-card">
            <img src="/img/coming-soon.svg" alt="Coming Soon Badge" />
            <FaImages className="category-icon" />
            <h3 className="category-title">Content</h3>
            <p className="category-description">
              Serve content globally with edge caching built in.
            </p>
          </div>
        </div>
      </section>
      <section className="celest-categories-client">
        <h2 className="middle-header categories-bottom-header-margin">
          Accelerate development of your Flutter app
        </h2>
        <div className="categories">
          <div className="category-card">
            <MdOutlineComputer className="category-icon-client" />
            <h3 className="category-title">Hot Reload</h3>
            <p className="category-description">
              Test your backend changes fast&mdash;just like Flutter!
            </p>
          </div>
          <div className="category-card">
            <FiCloudLightning className="category-icon-client" />
            <h3 className="category-title">Dart Client</h3>
            <p className="category-description">
              Connect your Flutter app to your Celest project using a
              code-generated client.
            </p>
          </div>
          <div className="category-card">
            <FaServer className="category-icon-client" />
            <h3 className="category-title">Cloud Logging</h3>
            <p className="category-description">
              Configure and track logs from your backend in your IDE.
            </p>
          </div>
        </div>
      </section>
      <section className="team">
        <h2 className="team-header">Meet the Celest team</h2>
        <div className="team-info">
          <div className="team-member">
            <picture>
              <source srcSet="/img/dillon.webp" type="image/webp" />
              <img src="/img/dillon.png" alt="Dillon Nys" />
            </picture>
            <h3>Dillon Nys</h3>
            <span>Founder, Engineering</span>
            <div className="team-member-social">
              <Link href="https://twitter.com/dillonthedev">
                <picture>
                  <source srcSet="/img/x.webp" type="image/webp" />
                  <img
                    className="navbar-custom-image"
                    src="/img/x.png"
                    alt="Dillon's X/Twitter Page"
                  />
                </picture>
              </Link>
              <Link href="https://www.linkedin.com/in/dillon-nys/">
                <img
                  className="navbar-custom-image"
                  src="/img/linkedin-black.svg"
                  alt="Dillon's LinkedIn Page"
                />
              </Link>
            </div>
          </div>
          <div className="team-member">
            <picture>
              <source srcSet="/img/abdallah.webp" type="image/webp" />
              <img src="/img/abdallah.png" alt="Abdallah Shaban" />
            </picture>
            <h3>Abdallah Shaban</h3>
            <span>Founder, Product</span>
            <div className="team-member-social">
              <Link href="https://twitter.com/AbdallahSh07" target="_blank">
                <picture>
                  <source srcSet="/img/x.webp" type="image/webp" />
                  <img
                    className="navbar-custom-image"
                    src="/img/x.png"
                    alt="Abdallah's X/Twitter Page"
                  />
                </picture>
              </Link>
              <Link href="https://www.linkedin.com/in/abdallahshaban/">
                <img
                  className="navbar-custom-image"
                  src="/img/linkedin-black.svg"
                  alt="Abdallah's LinkedIn Page"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
