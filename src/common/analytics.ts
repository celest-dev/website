import type { PostHog } from 'posthog-js';

// Extend the Window interface
declare global {
  interface Window {
    posthog: PostHog;
  }
}

type EventProps = {
  category?: string;
  errorMessage?: String;
  success?: boolean;
  downloadCLIAutoDetectOperatingSystem?: boolean;
  downloadCLIOperatingSystemName?: string;
  downloadCLIOperatingSystemArchitecture?: string;
};

export const recordEvent = (eventName: string, props?: EventProps) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, props);
  }
};

export const identifyUser = (email: string) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.setPersonProperties({ email });
  }
};
