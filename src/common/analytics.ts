import type { PostHog } from 'posthog-js';

type GTagFunction = (
  command: 'config' | 'event' | 'set', 
  eventNameOrConfigId: string, 
  params?: GTagEventProps | { [key: string]: any }
) => void;

// Extend the Window interface
declare global {
  interface Window {
    gtag: GTagFunction;
    posthog: PostHog;
  }
}


type GTagEventProps = {
  category?: string;
  errorMessage?: String;
  success?: boolean;
  DownloadCLIAutoDetectOperatingSystem?: boolean;
  downloadCLIOperatingSystemName?: string;
  downloadCLIOperatingSystemArchitecture?: string;
};

export const recordEvent = (eventName: string, props?: GTagEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, props);
  }
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, props);
  }
};

export const identifyUser = (email: string) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.setPersonProperties({ email });
  }
};
