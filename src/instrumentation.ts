import * as Sentry from '@sentry/nextjs';

const edgeConfig = {
  dsn: "https://5e1c9ebbaa5b3f636fc63ba5003412d2@o4506345201532928.ingest.us.sentry.io/4506345292693504",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

const serverConfig = {
  dsn: "https://5e1c9ebbaa5b3f636fc63ba5003412d2@o4506345201532928.ingest.us.sentry.io/4506345292693504",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
  
};

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init(serverConfig);
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init(edgeConfig);
  }
}
