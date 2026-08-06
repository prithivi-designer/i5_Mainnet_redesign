/**
 * cn — class name merger
 * Lightweight alternative to clsx/tailwind-merge for pure CSS module usage.
 * Filters falsy values and joins with a space.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
