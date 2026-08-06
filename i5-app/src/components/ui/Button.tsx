import React from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

/* ----------------------------------------------------------
   Types — per design-tokens.md §11.1
   ---------------------------------------------------------- */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "buy"
  | "sell";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

/* ----------------------------------------------------------
   Spinner
   ---------------------------------------------------------- */
function Spinner() {
  return (
    <svg
      className={styles.spinner}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="22"
        strokeDashoffset="8"
        opacity="0.4"
      />
      <path
        d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------
   Button
   ---------------------------------------------------------- */
export default function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && iconLeft && (
        <span className={styles.icon} aria-hidden>
          {iconLeft}
        </span>
      )}
      {children && <span className={styles.label}>{children}</span>}
      {iconRight && !loading && (
        <span className={styles.icon} aria-hidden>
          {iconRight}
        </span>
      )}
    </button>
  );
}
