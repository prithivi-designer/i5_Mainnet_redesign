import React from "react";
import { cn } from "@/lib/cn";
import styles from "./Badge.module.css";

/* ----------------------------------------------------------
   Types — per design-tokens.md §11.4
   ---------------------------------------------------------- */
export type BadgeVariant =
  | "neutral-1"
  | "neutral-2"
  | "outline"
  | "gain"
  | "loss";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

/* ----------------------------------------------------------
   Badge Component
   ---------------------------------------------------------- */
export default function Badge({
  variant = "neutral-1",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(styles.badge, styles[variant], "text-caption", className)}
    >
      {children}
    </span>
  );
}
