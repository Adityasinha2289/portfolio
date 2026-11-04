/** Shown only while a code-split route loads on first visit (usually a few ms). */
export function PageLoader() {
  return (
    <div className="bg-grid flex min-h-screen items-center justify-center" role="status" aria-live="polite">
      <span className="meta flex items-center gap-3 text-muted">
        <span aria-hidden className="inline-block size-2 animate-pulse bg-ink" />
        Loading
      </span>
    </div>
  );
}
