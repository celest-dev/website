// interface to avoid errors when using gtag for Google Analytics
interface Window {
    gtag: (...args: any[]) => void;
  }