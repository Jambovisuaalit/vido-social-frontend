import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`site-container ${className}`.trim()}>{children}</div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m4 10 4 4 8-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M6.4 3.2 8 6.9 6.6 8.3a11.6 11.6 0 0 0 5.1 5.1l1.4-1.4 3.7 1.6v2.1c0 .7-.6 1.3-1.3 1.3C8.6 17 3 11.4 3 4.5c0-.7.6-1.3 1.3-1.3h2.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M15.8 8.2c0 4.4-5.8 8.5-5.8 8.5S4.2 12.6 4.2 8.2a5.8 5.8 0 1 1 11.6 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="10" cy="8.2" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Murupolku" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            {index < items.length - 1 ? (
              <span aria-hidden="true">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
