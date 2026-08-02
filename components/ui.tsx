import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  children,
  href = "#start-form",
  variant = "primary",
  event,
  className = ""
}: {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  event?: string;
  className?: string;
}) {
  const styles: Record<ButtonVariant, string> = {
    primary: "bg-brand-red text-white shadow-red hover:bg-brand-red-dark",
    secondary: "border border-brand-navy/15 bg-white text-brand-navy hover:border-brand-navy/35 hover:bg-brand-light",
    ghost: "text-brand-navy hover:bg-brand-light"
  };

  return (
    <a
      href={href}
      data-event={event}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition duration-200 active:scale-[0.99] ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Badge({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
        inverse
          ? "border-white/20 bg-white/8 text-white"
          : "border-brand-red/20 bg-brand-red/6 text-brand-red"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  inverse = false
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className={`mb-4 text-xs font-semibold uppercase tracking-[0.14em] ${inverse ? "text-white/70" : "text-brand-red"}`}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className={`text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl ${inverse ? "text-white" : "text-brand-navy"}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 text-base leading-7 sm:text-lg sm:leading-8 ${inverse ? "text-white/70" : "text-brand-charcoal/80"}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function VidoLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/VIDO_Social_Primary_Horizontal.svg"
      alt="VIDO Social"
      width={2000}
      height={560}
      className={className}
    />
  );
}
