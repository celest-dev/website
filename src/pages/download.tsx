import React, { useEffect, useState } from "react";
import { FaLinux, FaWindows, FaApple } from "react-icons/fa";
import { recordEvent } from "../common/analytics";
import Layout from "@theme/Layout";

const DownloadPage = () => {
  const [detectedSystem, setDetectedSystem] = useState({
    os: null,
    architecture: null,
    downloadLink: null,
  });

  useEffect(() => {
    // Detect operating system
    const userAgent = window.navigator.userAgent;
    let os = null;
    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "Apple";
    else if (userAgent.includes("Linux") && !userAgent.includes("Android"))
      os = "Linux";
    else os = "Unknown";

    // Detect architecture
    let architecture = "Unknown";
    if (navigator.userAgentData) {
      navigator.userAgentData
        .getHighEntropyValues(["architecture"])
        .then((result) => {
          if (
            result.architecture === "x86" ||
            result.architecture === "x86_64"
          ) {
            architecture = "Intel (x64)";
          } else if (
            (result.architecture === "arm" && os != "Apple") ||
            (result.architecture === "arm64" && os != "Apple")
          ) {
            architecture = "ARM";
          } else if (
            (result.architecture === "arm" && os == "Apple") ||
            (result.architecture === "arm64" && os == "Apple")
          ) {
            architecture = "Silicon";
          }
          setDetectedSystem({
            os,
            architecture,
            downloadLink: getDownloadLink(os, architecture),
          });
          console.log(result.architecture);
        });
    } else {
      setDetectedSystem({
        os,
        architecture,
        downloadLink: getDownloadLink(os, architecture),
      });
    }
  }, []);

  // Event handler for download link click used for recording analytics
  const handleDownloadLinkEventTrigger =
    (
      autoDetectOperatingSystemValue: boolean,
      architecture: string,
      operatingSystem: string
    ) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Logic for ARM click
      recordEvent("download_cli", {
        autoDetectOperatingSystem: autoDetectOperatingSystemValue,
        architecture: architecture,
        operatingSystem: operatingSystem,
      });
      // Add any other logic or function calls here
    };

  // Component for detected OS Card
  const OSCard = ({ osName, downloadLink, architecture }) => {
    let Icon;
    switch (osName) {
      case "Windows":
        Icon = FaWindows;
        break;
      case "Apple":
        Icon = FaApple;
        break;
      case "Linux":
        Icon = FaLinux;
        break;
      default:
        Icon = null; // or some default icon
    }
    return (
      <div className="detected-operating-system-card">
        <a
          href={downloadLink}
          className="download-button"
          onClick={handleDownloadLinkEventTrigger(true, architecture, osName)}
        >
          {Icon && <Icon className="detected-system-download-image" />}
          <div>
            <p className="detected-operating-system-name-top">Download for</p>
            <p className="detected-operating-system-name-bottom">
              {osName} {architecture}
            </p>
          </div>
        </a>
      </div>
    );
  };

  // set download link based on OS and architecture
  const getDownloadLink = (os, architecture) => {
    if (os === "Windows" && architecture === "Intel (x64)")
      return "https://releases.celest.dev/windows_x64/0.1.0/celest-0.1.0-windows_x64.appx";
    else if (os === "Windows" && architecture === "ARM")
      return "https://releases.celest.dev/windows_arm64/0.1.0/celest-0.1.0-windows_arm64.appx";
    else if (os === "Apple" && architecture === "Intel (x64)")
      return "https://releases.celest.dev/macos_x64/0.1.0/celest-0.1.0-macos_x64.pkg";
    else if (os === "Apple" && architecture === "Silicon")
      return "https://releases.celest.dev/macos_arm64/0.1.0/celest-0.1.0-macos_arm64.pkg";
    else if (os === "Linux" && architecture === "Intel (x64)")
      return "https://releases.celest.dev/linux_x64/0.1.0/celest-0.1.0-linux_x64.zip";
    else if (os === "Linux" && architecture === "ARM")
      return "https://releases.celest.dev/linux_arm64/0.1.0/celest-0.1.0-linux_arm64.zip";
    else return "#"; // Placeholder link
  };

  // render the right component based on detected OS
  const renderDetectedOS = () => {
    const { os, architecture, downloadLink } = detectedSystem;
    if (
      !os ||
      os === "Unknown" ||
      !architecture ||
      architecture === "Unknown"
    ) {
      return;
    }
    return (
      <section className="detected-operating-system-section">
        {/* <h3 className="center-download-page-headers">
          We've detected you need this installer
        </h3> */}
        <OSCard
          osName={os}
          downloadLink={downloadLink}
          architecture={architecture}
        />
      </section>
    );
  };

  return (
    <Layout>
      <div className="download-page">
        <h2 className="download-page-title">Download Celest CLI</h2>
        <p className="download-page-subtitle">
          Use the Celest CLI to create, build, and deploy your Celest project.
        </p>
        {renderDetectedOS()}

        <h3 className="center-download-page-headers">
          All available installers
        </h3>
        <section className="operating-system-download-section">
          <div className="operating-system-card">
            <FaWindows className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Windows</h3>
            <p>
              <a
                href={getDownloadLink("Windows", "ARM")}
                onClick={handleDownloadLinkEventTrigger(true, "ARM", "Windows")}
              >
                ARM
              </a>{" "}
              /{" "}
              <a
                href={getDownloadLink("Windows", "Intel (x64)")}
                onClick={handleDownloadLinkEventTrigger(
                  true,
                  "Intel (x64)",
                  "Windows"
                )}
              >
                Intel (x64)
              </a>
            </p>
          </div>
          <div className="operating-system-card">
            <FaApple className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Apple</h3>
            <p>
              <a
                href={getDownloadLink("Apple", "ARM")}
                onClick={handleDownloadLinkEventTrigger(true, "ARM", "Apple")}
              >
                Apple Silicon (ARM)
              </a>{" "}
              /{" "}
              <a
                href={getDownloadLink("Apple", "Intel (x64)")}
                onClick={handleDownloadLinkEventTrigger(
                  true,
                  "Intel (x64)",
                  "Apple"
                )}
              >
                Intel (x64)
              </a>
            </p>
          </div>
          <div className="operating-system-card">
            <FaLinux className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Linux</h3>
            <p>
              <a
                href={getDownloadLink("Linux", "ARM)")}
                onClick={handleDownloadLinkEventTrigger(true, "ARM", "Linux")}
              >
                ARM
              </a>{" "}
              /{" "}
              <a
                href={getDownloadLink("Linux", "Intel (x64))")}
                onClick={handleDownloadLinkEventTrigger(
                  true,
                  "Intel (x64)",
                  "Linux"
                )}
              >
                Intel (x64)
              </a>
            </p>
          </div>
          <p>
            After installing the Celest CLI, visit our{" "}
            <a href="/docs/get-started">documentation</a> to start building your
            backend with Celest
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default DownloadPage;
