import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'; // Default to US cloud

if (typeof window !== 'undefined' && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only', // capture profiles only when identified
    autocapture: true, // auto-capture clicks, pageviews, etc.
    capture_pageview: false, // We'll handle this manually or via react router if needed, though default is okay
  });
}

export const trackEvent = (eventName, properties = {}) => {
  if (POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  } else {
    // Fallback for development if no key is set
    console.log(`[Analytics - Event] ${eventName}`, properties);
  }
};

export const identifyUser = (distinctId, properties = {}) => {
  if (POSTHOG_KEY) {
    posthog.identify(distinctId, properties);
  } else {
    console.log(`[Analytics - Identify] ${distinctId}`, properties);
  }
};

export default posthog;
