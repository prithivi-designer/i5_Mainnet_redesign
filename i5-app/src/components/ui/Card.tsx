import React from "react";
import { cn } from "@/lib/cn";
import styles from "./Card.module.css";

/* ----------------------------------------------------------
   Types
   ---------------------------------------------------------- */
export interface CardProps {
  /** Optional header content (title, badge, actions) */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Remove default padding (useful for full-bleed charts) */
  noPadding?: boolean;
  /** Highlight with an emerald top border accent */
  accent?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ----------------------------------------------------------
   Card
   ---------------------------------------------------------- */
export default function Card({
  header,
  footer,
  noPadding = false,
  accent = false,
  children,
  className,
  style,
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        accent && styles.accent,
        className
      )}
      style={style}
    >
      {header && (
        <div className={cn(styles.header, noPadding && styles.headerNoPad)}>
          {header}
        </div>
      )}
      <div className={cn(styles.body, noPadding && styles.noPadding)}>
        {children}
      </div>
      {footer && (
        <div className={cn(styles.footer, noPadding && styles.footerNoPad)}>
          {footer}
        </div>
      )}
    </div>
  );
}
