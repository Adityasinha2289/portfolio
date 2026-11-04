import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import type { Evidence } from "@/data/types";

interface Props extends Evidence {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-size image viewer on the native <dialog> element: modal focus trap,
 * Escape-to-close and inert background come from the browser. Clicking the
 * backdrop also closes it.
 */
export function ImageLightbox({ open, onClose, src, alt, width, height, caption }: Props) {
  const landscape = width > height;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={caption}
      className={`m-auto max-h-[92vh] overflow-visible ${landscape ? "w-[min(94vw,1040px)]" : "w-[min(92vw,560px)]"} bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-[2px]`}
    >
      <figure className="card-brutal flex max-h-[92vh] flex-col overflow-hidden bg-ivory">
        <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-3 py-2">
          <span className="meta truncate">Evidence</span>
          <button type="button" onClick={onClose} className="btn btn-secondary btn-sm" autoFocus>
            <X aria-hidden className="size-4" /> Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-concrete">
          <img src={src} alt={alt} width={width} height={height} className="mx-auto block h-auto w-full" />
        </div>
        <figcaption className="border-t-2 border-ink px-3 py-2.5 text-sm text-muted">{caption}</figcaption>
      </figure>
    </dialog>
  );
}
