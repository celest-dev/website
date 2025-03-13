import React, { useEffect, useState } from "react";
import { FaLinux, FaWindows, FaApple } from "react-icons/fa";
import { IconBaseProps, IconType } from "react-icons";
import { usePostHog } from "posthog-js/react";
import { recordEvent } from "../src/analytics";
import { Card, Link } from "nextra-theme-docs";
import type { PostHog } from "posthog-js";
import clsx from "clsx";

type DownloadState = {
  os: OperatingSystem;
  architecture: Architecture;
  downloadLink?: string;
};

type OperatingSystem = "Windows" | "Apple" | "Linux" | "Unknown";
type Architecture = "Intel" | "ARM" | "Unknown";

const osDisplay = (os: OperatingSystem, architecture: Architecture) => {
  switch (os) {
    case "Windows":
      return architecture === "Intel" ? "Windows (x64)" : "Windows (ARM)";
    case "Apple":
      return architecture === "Intel" ? "macOS (Intel)" : "macOS (Silicon)";
    case "Linux":
      return architecture === "Intel" ? "Linux (x64)" : "Linux (ARM)";
  }
};

export function useDetectSystem() {
  const [detectedSystem, setDetectedSystem] = useState<DownloadState>({
    os: "Unknown",
    architecture: "Unknown",
  });

  useEffect(() => {
    // Detect operating system
    let os: OperatingSystem = "Unknown";
    const userAgent = (
      navigator.userAgentData?.platform ?? navigator.platform
    ).toLowerCase();
    if (userAgent.includes("win")) {
      os = "Windows";
    } else if (userAgent.includes("mac")) {
      os = "Apple";
    } else if (userAgent.includes("linux") && !userAgent.includes("android")) {
      os = "Linux";
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

  return detectedSystem;
}

export function DownloadButton() {
  const system = useDetectSystem();
  return <OSCard {...system} />;
}

function renderIcon(os: OperatingSystem) {
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
  const IconElement = (props: IconBaseProps) => {
    const icon = Icon(props);
    return <>{icon}</>;
  };
  return IconElement;
}

// Component for detected OS Card
function OSCard(props: DownloadState) {
  const { os, architecture, downloadLink } = props;
  let Icon = renderIcon(os);

  const posthog = usePostHog();
  recordEvent(posthog, "detected_operating_system", {
    downloadCLIAutoDetectOperatingSystem: true,
    downloadCLIOperatingSystemArchitecture: architecture,
    downloadCLIOperatingSystemName: os,
  });
  return (
    <div className="detected-operating-system-card">
      <a
        href={downloadLink}
        className="download-button"
        onClick={handleDownloadLinkEventTrigger(
          posthog,
          true,
          architecture,
          os
        )}
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

function DownloadCard(
  props: {
    os: OperatingSystem;
    architectures: Architecture[];
    detected: DownloadState;
  } & React.ComponentProps<"div">
) {
  const { os, architectures, detected } = props;

  let Icon = renderIcon(os);

  const posthog = usePostHog();
  const isDetected = (architecture: Architecture) =>
    os === detected.os && architecture === detected.architecture;
  const title = (architecture: Architecture) => {
    let title = getDisplayString(os, architecture);
    if (isDetected(architecture)) {
      title += " ⭐️";
    }
    return title;
  };

  return (
    <div className="flex flex-col items-stretch justify-start" {...props}>
      <Icon className="w-[50px] h-auto pb-4 self-center" />
      <h2 className="font-bold">{os}</h2>
      <hr className="my-4" />
      {architectures.map((architecture) => (
        <div
          key={`${os}-${architecture}`}
          className={clsx(
            "my-2 whitespace-nowrap cursor-pointer",
            `${
              isDetected(architecture)
                ? "border border-[#fde553]/40 rounded-lg"
                : ""
            }`
          )}
          onClick={handleDownloadLinkEventTrigger(
            posthog,
            false,
            architecture,
            os
          )}
        >
          <Card
            title={title(architecture)}
            icon={<Icon />}
            href={getDownloadLink(os, architecture)}
          >
            {title(architecture)}
          </Card>
        </div>
      ))}
    </div>
  );
}

export function Download(props?: React.ComponentProps<"section">) {
  const detected = useDetectSystem();
  return (
    <section id="download" className={clsx("p-6 text-lg", props?.className)}>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 text-center">
        <DownloadCard
          key={"Windows"}
          os="Windows"
          architectures={["Intel"]}
          detected={detected}
        />
        <DownloadCard
          key={"Apple"}
          os="Apple"
          architectures={["ARM", "Intel"]}
          detected={detected}
        />
        <DownloadCard
          key={"Linux"}
          os="Linux"
          architectures={["Intel", "ARM"]}
          detected={detected}
        />
      </div>
      {detected.os !== "Unknown" && detected.architecture !== "Unknown" && (
        <p className="text-sm mt-4">⭐️ Recommended for you</p>
      )}
    </section>
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
      return architecture === "Intel" ? "Windows x64" : "Windows ARM";
    case "Apple":
      return architecture === "Intel" ? "Apple Intel" : "Apple Silicon";
    case "Linux":
      return architecture === "Intel" ? "Linux x64" : "Linux ARM";
  }
}

// Event handler for download link click used for recording analytics
function handleDownloadLinkEventTrigger(
  posthog: PostHog,
  autoDetectOperatingSystemValue: boolean,
  architecture: Architecture,
  operatingSystem: OperatingSystem
) {
  return function (_: React.MouseEvent<HTMLElement>) {
    recordEvent(posthog, "click_download_cli", {
      downloadCLIAutoDetectOperatingSystem: autoDetectOperatingSystemValue,
      downloadCLIOperatingSystemArchitecture: architecture,
      downloadCLIOperatingSystemName: operatingSystem,
    });
  };
}
