"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
  eventName: string;
  eventLabel?: string;
};

export function TrackedLink({
  children,
  eventName,
  eventLabel,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={() =>
        trackEvent(eventName, {
          label: eventLabel,
          destination: String(props.href),
        })
      }
    >
      {children}
    </Link>
  );
}
