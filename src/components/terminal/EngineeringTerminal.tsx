import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Minus, Maximize2, CornerDownLeft, Eraser } from "lucide-react";
import { complete, quickCommands, runCommand, MAX_INPUT, type OutputLine } from "./commands";

interface Entry {
  id: number;
  input?: string;
  lines: OutputLine[];
}

const PROMPT = "aditya@engineering-lab";

const toneCls = {
  default: "text-ivory",
  muted: "text-muted-dark",
  lime: "text-lime",
  coral: "text-coral",
} as const;

function Line({ line }: { line: OutputLine }) {
  switch (line.kind) {
    case "spacer":
      return <div className="h-2" />;
    case "heading":
      return <div className="mt-2 font-semibold uppercase tracking-[0.08em] text-lime">{line.text}</div>;
    case "text":
      return <div className={`whitespace-pre-wrap break-words ${toneCls[line.tone ?? "default"]}`}>{line.text}</div>;
    case "row": {
      const value = line.to ? (
        <Link to={line.to} className="underline decoration-ivory/40 underline-offset-4 hover:text-lime hover:decoration-lime">
          {line.value}
        </Link>
      ) : line.href ? (
        <a
          href={line.href}
          target={line.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="underline decoration-ivory/40 underline-offset-4 hover:text-lime hover:decoration-lime"
        >
          {line.value}
        </a>
      ) : (
        <span>{line.value}</span>
      );
      return (
        <div className="flex flex-wrap gap-x-4 sm:grid sm:grid-cols-[11rem_1fr]">
          <span className="min-w-[4.5rem] text-muted-dark">{line.label}</span>
          <span className="min-w-0 break-words text-ivory">{value}</span>
        </div>
      );
    }
  }
}

const welcome: Entry = {
  id: 0,
  lines: [
    { kind: "text", text: "Engineering Lab — v2.0 (read-only, sandboxed)", tone: "lime" },
    { kind: "text", text: "Type `help`, or tap a command below.", tone: "muted" },
  ],
};

export function EngineeringTerminal() {
  const [entries, setEntries] = useState<Entry[]>([welcome]);
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const history = useRef<string[]>([]);
  const histIdx = useRef(-1);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const inputId = useId();

  // Keep the newest output in view — scrolls the log box only, never the page
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const execute = (raw: string, focusInput = true) => {
    const input = raw.trim().slice(0, MAX_INPUT);
    if (input) {
      history.current = [input, ...history.current.filter((h) => h !== input)].slice(0, 30);
    }
    histIdx.current = -1;
    const res = runCommand(input);
    if (res.type === "clear") {
      setEntries([]);
    } else if (res.type === "exit") {
      setEntries((e) => [...e, { id: nextId.current++, input, lines: [{ kind: "text", text: "Session collapsed.", tone: "muted" }] }]);
      setCollapsed(true);
      requestAnimationFrame(() => expandRef.current?.focus());
      setValue("");
      return;
    } else if (res.type === "navigate") {
      setEntries((e) => [...e, { id: nextId.current++, input, lines: res.lines }]);
      window.setTimeout(() => navigate(res.to), 350);
    } else {
      setEntries((e) => [...e, { id: nextId.current++, input, lines: res.lines }].slice(-40));
    }
    setValue("");
    if (focusInput) inputRef.current?.focus({ preventScroll: true });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx.current + 1, history.current.length - 1);
      if (next >= 0) {
        histIdx.current = next;
        setValue(history.current[next] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx.current - 1;
      histIdx.current = Math.max(next, -1);
      setValue(next >= 0 ? (history.current[next] ?? "") : "");
    } else if (e.key === "Tab" && value.trim()) {
      const c = complete(value);
      if (c) {
        e.preventDefault();
        setValue(c);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    } else if (e.key === "Escape") {
      setValue("");
    }
  };

  if (collapsed) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-md border-2 border-ivory/60 bg-[#0b0b0b] px-4 py-3 font-mono text-[13px]">
        <span className="truncate text-muted-dark">
          <span className="text-lime">●</span> {PROMPT} — collapsed
        </span>
        <button
          ref={expandRef}
          type="button"
          onClick={() => setCollapsed(false)}
          className="btn btn-primary btn-sm btn-on-dark shrink-0"
        >
          <Maximize2 aria-hidden className="size-3.5" /> Open terminal
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border-2 border-ivory/80 bg-[#0b0b0b] shadow-[8px_8px_0_var(--lime)]">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-ivory/20 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-coral" />
          <span className="size-2.5 rounded-full bg-concrete" />
          <span className="size-2.5 rounded-full bg-lime" />
        </span>
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-muted-dark">{PROMPT}: ~</span>
        <span className="flex gap-1">
          <button
            type="button"
            onClick={() => {
              setEntries([]);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="grid size-8 place-items-center text-muted-dark hover:text-ivory"
            aria-label="Clear terminal"
            title="Clear"
          >
            <Eraser aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="grid size-8 place-items-center text-muted-dark hover:text-ivory"
            aria-label="Collapse terminal"
            title="Collapse"
          >
            <Minus aria-hidden className="size-4" />
          </button>
        </span>
      </div>

      {/* Output */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-[340px] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[12.5px] leading-[1.7] sm:h-[380px] sm:text-[13px]"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
      >
        {entries.map((e) => (
          <div key={e.id} className="mb-3">
            {e.input !== undefined && (
              <div className="break-words">
                <span className="text-lime">❯ </span>
                <span className="text-ivory">{e.input}</span>
              </div>
            )}
            {e.lines.map((l, i) => (
              <Line key={i} line={l} />
            ))}
          </div>
        ))}

        {/* Prompt */}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor={inputId} className="sr-only">
            Terminal command. Type help for a list of commands.
          </label>
          <span aria-hidden className="shrink-0 text-lime">
            ❯
          </span>
          <input
            ref={inputRef}
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_INPUT))}
            onKeyDown={onKeyDown}
            maxLength={MAX_INPUT}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            placeholder="type a command…"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ivory caret-lime outline-none placeholder:text-muted-dark/60 sm:text-[13px]"
          />
          <button type="submit" className="grid size-8 shrink-0 place-items-center text-muted-dark hover:text-lime" aria-label="Run command">
            <CornerDownLeft aria-hidden className="size-4" />
          </button>
        </form>
      </div>

      {/* Quick commands — for mouse and touch */}
      <div className="border-t-2 border-ivory/20 p-3">
        <p className="meta mb-2 text-muted-dark">Quick commands</p>
        <div className="flex flex-wrap gap-1.5">
          {quickCommands.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => execute(c, false)}
              className="min-h-9 border-[1.5px] border-ivory/40 px-2.5 py-1 font-mono text-[12px] text-ivory transition-colors hover:border-lime hover:bg-lime hover:text-ink active:translate-y-px"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
