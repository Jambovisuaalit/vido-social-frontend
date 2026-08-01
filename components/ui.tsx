import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Button({ children, href = "#pricing", variant = "primary" }: { children: ReactNode; href?: string; variant?: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary: "bg-cyan-glow text-ink-inverse shadow-cyan hover:brightness-110 hover:shadow-cyan-strong",
    secondary: "border border-line-strong bg-surface-700 text-ink-primary hover:border-cyan-500 hover:bg-surface-600",
    ghost: "text-ink-secondary hover:bg-surface-700 hover:text-ink-primary"
  }[variant];
  return <a href={href} className={`inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${styles}`}>{children}</a>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-cyan-600/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-300">{children}</span>;
}

export function SectionTitle({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return <div className="max-w-3xl">
    {eyebrow ? <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{eyebrow}</div> : null}
    <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink-primary sm:text-4xl lg:text-5xl">{title}</h2>
    {body ? <p className="mt-5 text-base leading-7 text-ink-secondary sm:text-lg">{body}</p> : null}
  </div>;
}
