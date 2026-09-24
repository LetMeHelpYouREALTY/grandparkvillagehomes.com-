// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { addIntegration, init } from "@sentry/nextjs";

init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  // Replay is imported on the first interaction so it stays out of the LCP path.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/session-replay/
  integrations: [],
});

const loadReplay = () => {
  window.removeEventListener("pointerdown", loadReplay);
  window.removeEventListener("keydown", loadReplay);
  void import("@sentry/nextjs").then((lazyLoadedSentry) => {
    addIntegration(
      lazyLoadedSentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    );
  });
};

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", loadReplay, {
    once: true,
    passive: true,
  });
  window.addEventListener("keydown", loadReplay, { once: true });
}
