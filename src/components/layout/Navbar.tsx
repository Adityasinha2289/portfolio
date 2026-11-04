import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { m, useScroll, useSpring, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { navItems } from "@/data/navigation";
import { social, resumeUrl, resumeRequestHref } from "@/data/site";
import { useScrollToSection } from "@/hooks/useScrollToSection";

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, enabled]);
  return enabled ? active : null;
}

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const goTo = useScrollToSection();
  const active = useActiveSection(ids, isHome);
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The menu is modal and every link in it closes it, so no route-change effect is needed.

  // Mobile sheet: lock scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheet.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && sheet.current) {
        const f = Array.from(sheet.current.querySelectorAll<HTMLElement>("a, button"));
        if (!f.length) return;
        const firstEl = f[0]!;
        const lastEl = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const resume = resumeUrl
    ? { href: resumeUrl, label: "Resume", download: true }
    : { href: resumeRequestHref, label: "Resume", download: false };

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  return (
    <>
      <a href="#main" className="skip-link btn btn-primary btn-sm">
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 border-b-2 border-ink transition-colors duration-200 ${
          scrolled ? "bg-ivory/95 backdrop-blur-[2px]" : "bg-ivory"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-x flex items-center justify-between gap-4 transition-[height] duration-200 ${
            scrolled ? "h-[52px]" : "h-[var(--nav-h)]"
          }`}
        >
          <Link
            to="/"
            className="group flex items-baseline gap-0.5 font-display text-[17px] font-bold tracking-[-0.02em]"
            aria-label="Aditya Sinha — home"
            onClick={() => {
              if (isHome) window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
          >
            ADITYA
            <sup className="text-[10px] font-medium transition-transform duration-300 group-hover:rotate-[360deg]">®</sup>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={handleNav(item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`relative block px-3 py-2 font-body text-[13.5px] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-ink ${
                      active === item.id ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-px h-[3px] bg-lime transition-transform duration-300 ${
                        active === item.id ? "scale-x-100" : "scale-x-0"
                      } origin-left`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <span aria-hidden className="mx-3 h-5 w-px bg-ink/25" />
            <a
              href={resume.href}
              {...(resume.download ? { download: "" } : {})}
              className="btn btn-primary btn-sm"
              title={resume.download ? "Download resume (PDF)" : "Request my resume by email"}
            >
              <FileText aria-hidden className="size-3.5" strokeWidth={2.5} />
              {resume.label}
            </a>
            <a
              href={social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1 px-2 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted hover:text-ink"
            >
              GH <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only">GitHub profile (opens in a new tab)</span>
            </a>
            <a
              href={social.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted hover:text-ink"
            >
              IN <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
            </a>
          </div>

          <button
            ref={menuBtn}
            type="button"
            className="btn btn-secondary btn-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden className="size-4" strokeWidth={2.5} />
            Menu
          </button>
        </nav>

        {/* Scroll progress — a measuring tape along the bottom edge */}
        <m.div
          aria-hidden
          className="absolute -bottom-[2px] left-0 h-[2px] w-full origin-left bg-coral"
          style={{ scaleX: reduce ? scrollYProgress : progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={sheet}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="theme-dark bg-grid-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x flex h-[var(--nav-h)] items-center justify-between border-b-2 border-ivory/20">
              <span className="font-display text-[17px] font-bold">
                ADITYA<sup className="text-[10px]">®</sup>
              </span>
              <button
                type="button"
                className="btn btn-primary btn-sm btn-on-dark"
                onClick={() => {
                  setOpen(false);
                  menuBtn.current?.focus();
                }}
              >
                <X aria-hidden className="size-4" strokeWidth={2.5} />
                Close
              </button>
            </div>
            <ul className="container-x flex flex-1 flex-col justify-center gap-1 py-10">
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={handleNav(item.id)}
                    className="group flex items-baseline gap-4 border-b border-ivory/15 py-4 font-display text-[clamp(2.4rem,11vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em] hover:text-lime"
                  >
                    <span className="meta text-muted-dark">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="container-x grid grid-cols-2 gap-3 pb-10">
              <a
                href={resume.href}
                {...(resume.download ? { download: "" } : {})}
                className="btn btn-primary btn-on-dark col-span-2"
              >
                <FileText aria-hidden className="size-4" /> {resume.download ? "Download resume" : "Request resume"}
              </a>
              <a href={social.github.href} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-on-dark">
                GitHub <ArrowUpRight aria-hidden className="size-4" />
              </a>
              <a href={social.linkedin.href} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-on-dark">
                LinkedIn <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
