type GTagFunction = (
  command: 'config' | 'event' | 'set', 
  eventNameOrConfigId: string, 
  params?: GTagEventProps | { [key: string]: any }
) => void;

// Extend the Window interface
declare global {
  interface Window {
    gtag: GTagFunction;
  }
}

type GTagEventProps = {
  errorMessage?: String;
  success?: boolean;
};

export const recordEvent = (eventName: string, props?: GTagEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, props);
  }
};