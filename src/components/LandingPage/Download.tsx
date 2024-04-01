import React, { PropsWithChildren, useEffect, useState } from "react";
import { FaLinux, FaWindows, FaApple } from "react-icons/fa";
import { recordEvent } from "../../common/analytics";
import { IconType } from "react-icons";

type DownloadState = {
  os: OperatingSystem;
  architecture: Architecture;
  downloadLink?: string;
};

type OperatingSystem = "Windows" | "Apple" | "Linux" | "Unknown";
type Architecture = "Intel" | "ARM" | "Unknown";

export function DownloadButton() {
  const [detectedSystem, setDetectedSystem] = useState<DownloadState>({
    os: "Unknown",
    architecture: "Unknown",
  });

  useEffect(() => {
    // Detect operating system
    const userAgent = window.navigator.userAgent;
    let os: OperatingSystem;
    if (userAgent.includes("Win")) {
      os = "Windows";
    } else if (userAgent.includes("Mac")) {
      os = "Apple";
    } else if (userAgent.includes("Linux") && !userAgent.includes("Android")) {
      os = "Linux";
    } else {
      os = "Unknown";
    }

    // Detect architecture
    let architecture: Architecture = "Unknown";
    if (!navigator.userAgentData) {
      setDetectedSystem({
        os,
        architecture,
        downloadLink: getDownloadLink(os, architecture),
      });
      return;
    }
    navigator.userAgentData
      .getHighEntropyValues(["architecture"])
      .then((result) => {
        switch (result.architecture) {
          case "x86":
          case "x86_64":
            architecture = "Intel";
            break;
          case "arm":
          case "arm64":
            architecture = "ARM";
            break;
        }
      })
      .catch(() => {})
      .finally(() => {
        setDetectedSystem({
          os,
          architecture,
          downloadLink: getDownloadLink(os, architecture),
        });
      });
  }, []);

  return <OSCard {...detectedSystem} />;
}

// Component for detected OS Card
function OSCard(props: DownloadState) {
  const { os, architecture, downloadLink } = props;
  let Icon: IconType;
  switch (os) {
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
      return;
  }
  recordEvent("detected_operating_system", {
    downloadCLIAutoDetectOperatingSystem: true,
    downloadCLIOperatingSystemArchitecture: architecture,
    downloadCLIOperatingSystemName: os,
  });
  return (
    <div className="detected-operating-system-card">
      <a
        href={downloadLink}
        className="download-button"
        onClick={handleDownloadLinkEventTrigger(true, architecture, os)}
      >
        <Icon className="detected-system-download-image" />
        <div>
          <p className="detected-operating-system-name-top">Download for</p>
          <p className="detected-operating-system-name-bottom">
            {getDisplayString(os, architecture)}
          </p>
        </div>
      </a>
    </div>
  );
}

export function DownloadCard() {
  return (
    <div className="download">
        <h3 className="center-download-page-headers">All Downloads</h3>
        <div className="operating-system-download-section">
          <div className="operating-system-card">
            <FaWindows className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Windows</h3>
            <p>
              <a
                href={getDownloadLink("Windows", "Intel")}
                onClick={handleDownloadLinkEventTrigger(
                  true,
                  "Intel",
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
              </a>
              <span> / </span>
              <a
                href={getDownloadLink("Apple", "Intel")}
                onClick={handleDownloadLinkEventTrigger(true, "Intel", "Apple")}
              >
                Intel (x64)
              </a>
            </p>
          </div>
          <div className="operating-system-card">
            <FaLinux className="operating-system-download-image" />
            <h3 className="operating-system-card-title">Linux</h3>
            <p className="no-bottom-margin">
              {" "}
              deb: &nbsp;
              <a
                href={getDownloadLink("Linux", "ARM")}
                onClick={handleDownloadLinkEventTrigger(true, "ARM", "Linux")}
              >
                ARM
              </a>
              <span> / </span>
              <a
                href={getDownloadLink("Linux", "Intel")}
                onClick={handleDownloadLinkEventTrigger(true, "Intel", "Linux")}
              >
                Intel (x64)
              </a>
            </p>
          </div>
        </div>
        <p>
          After installing the Celest CLI, visit our{" "}
          <a href="/docs/get-started">documentation</a> to start building your
          backend!
        </p>
    </div>
  );
}

function getDownloadLink(
  os: OperatingSystem,
  architecture: Architecture
): string {
  if (os === "Apple" && architecture === "Intel") {
    return "https://releases.celest.dev/macos_x64/latest/celest-latest-macos_x64.pkg";
  } else if (os === "Apple" && architecture === "ARM") {
    return "https://releases.celest.dev/macos_arm64/latest/celest-latest-macos_arm64.pkg";
  } else if (os === "Linux") {
    switch (architecture) {
      case "Intel":
        return "https://releases.celest.dev/linux_x64/latest/celest-latest-linux_x64.deb";
      case "ARM":
        return "https://releases.celest.dev/linux_arm64/latest/celest-latest-linux_arm64.deb";
    }
  } else if (os === "Windows" && architecture === "Intel") {
    return "https://releases.celest.dev/windows_x64/latest/celest-latest-windows_x64.appx";
  }
}

function getDisplayString(
  os: OperatingSystem,
  architecture: Architecture
): string {
  switch (os) {
    case "Windows":
      return architecture === "Intel" ? "Windows (x64)" : "Windows (ARM)";
    case "Apple":
      return architecture === "Intel" ? "macOS (Intel)" : "macOS (Silicon)";
    case "Linux":
      return architecture === "Intel" ? "Linux (x64)" : "Linux (ARM)";
  }
}

// Event handler for download link click used for recording analytics
function handleDownloadLinkEventTrigger(
  autoDetectOperatingSystemValue: boolean,
  architecture: Architecture,
  operatingSystem: OperatingSystem
) {
  return function (_: React.MouseEvent<HTMLAnchorElement>) {
    recordEvent("click_download_cli", {
      downloadCLIAutoDetectOperatingSystem: autoDetectOperatingSystemValue,
      downloadCLIOperatingSystemArchitecture: architecture,
      downloadCLIOperatingSystemName: operatingSystem,
    });
  };
}
