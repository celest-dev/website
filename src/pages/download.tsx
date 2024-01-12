import React from "react";
import { FaLinux, FaWindows, FaApple } from "react-icons/fa";
import Layout from "@theme/Layout";

const DownloadPage = () => {
  return (
    <Layout>
      <div className="download-page">
        <h2 className="download-page-title">Download Celest CLI</h2>
        <p className="download-page-subtitle">
          Use the Celest CLI to create, build, and deploy your backend in Dart.
        </p>
        <section className="operating-system-download-section">
          <div className="operating-system-card">
            <FaWindows className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Windows</h3>
            <p><a>ARM</a> / <a>Intel (x64)</a></p>
          </div>
          <div className="operating-system-card">
            <FaApple className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Apple</h3>
            <p><a>Apple silicon</a> / <a>Intel (x64)</a></p>
          </div>
          <div className="operating-system-card">
            <FaLinux className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Linux</h3>
            <p><a>ARM</a> / <a>Intel (x64)</a></p>
          </div>
          <p>After installing the Celest CLI, visit our <a href="/docs">documentation</a> to start building your backend with Celest</p>
        </section>
      </div>
    </Layout>
  );
};

export default DownloadPage;
