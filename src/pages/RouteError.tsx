import { isRouteErrorResponse, useRouteError } from "react-router";

/**
 * Last-resort error screen. Rendered outside RootLayout, so it carries its own
 * minimal chrome. A failed lazy chunk (e.g. after a redeploy) is the most likely
 * cause, so the primary action is a reload.
 */
export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Unknown error";

  if (import.meta.env.DEV) console.error(error);

  return (
    <main className="bg-grid flex min-h-screen items-center">
      <div className="container-x py-20">
        <p className="meta mb-6 text-muted">Runtime error</p>
        <h1 className="font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[clamp(2.5rem,9vw,6rem)]">
          Something
          <br />
          <span className="bg-coral px-[0.06em]">broke.</span>
        </h1>
        <p className="mt-6 max-w-lg text-muted">
          That's on me, not you. Reloading usually fixes it.
          <span className="mt-2 block font-mono text-xs">{message}</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload page
          </button>
          <a href="/" className="btn btn-secondary">
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}
