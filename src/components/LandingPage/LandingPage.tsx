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
import { MdPolicy, MdOutlineComputer } from "react-icons/md";
import CodeBlock from "@theme/CodeBlock";

import EmailForm from "./EmailForm";

const LandingPage = () => {

  const [operatingSystem, setOperatingSystem] = useState({
    name: "Other",
    downloadLink: ""
  });

  useEffect(() => {
    const setDownloadLink = () => {
      let userAgent: String = navigator.userAgent;

      console.log(userAgent);
      if (userAgent.includes("Macintosh")) {
        setOperatingSystem({name: "MacOS", downloadLink: "https://download-link.com"}); 
      }

      if (userAgent.includes("Windows")) {
        setOperatingSystem({name: "Windows", downloadLink: "https://download-link.com"}); 
      }

      if (userAgent.includes("Linux")) {
        setOperatingSystem({name: "Linux", downloadLink: "https://download-link.com"}); 
      }

      if (userAgent.includes("iPhone")) {
        setOperatingSystem({name: "Other", downloadLink: "https://download-link.com"}); 
      }

      if (userAgent.includes("Android")) {
        setOperatingSystem({name: "Other", downloadLink: "https://download-link.com"}); 
      }
      console.log(operatingSystem);
    };

    setDownloadLink();
  }, []);

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
        <div className="feature-card">
          <CloudIcon className="feature-icon" />
          <h3 className="feature-title">Managed Backend</h3>
          <p>
            Use a single command <code>celest deploy</code> to setup your
            backend.
          </p>
        </div>
      </section>
      <section className="celest-categories">
        <h2 className="middle-header categories-bottom-header-margin">
          Your backend in Dart
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
              Serve content globally with edge caching built-in.
            </p>
          </div>
        </div>
      </section>
      <section className="celest-categories-client">
        <h2 className="middle-header categories-bottom-header-margin">
          Accelerate building your app
        </h2>
        <div className="categories">
          <div className="category-card">
            <MdOutlineComputer className="category-icon-client" />
            <h3 className="category-title">Hot Reload</h3>
            <p className="category-description">
              Iterate locally fast, see your backend changes instantly.
            </p>
          </div>
          <div className="category-card">
            <FiCloudLightning className="category-icon-client" />
            <h3 className="category-title">Dart Client</h3>
            <p className="category-description">
              Connect to your Celest project effortlessly using a code-generated
              Dart client.
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
            <img src="/img/dillon.png" alt="Dillon Nys" />
            <h3>Dillon Nys</h3>
            <p>Founder, Engineering</p>
          </div>
          <div className="team-member">
            <img src="/img/abdallah.png" alt="Abdallah Shaban" />
            <h3>Abdallah Shaban</h3>
            <p>Founder, Product</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
