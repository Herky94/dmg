"use client";

/**
 * SkipToContent Component
 * WCAG 2.4.1 (Level A) - Bypass Blocks
 *
 * Provides a skip link that appears on keyboard focus
 * to allow users to bypass navigation and jump directly to main content.
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content"
      aria-label="Salta al contenuto principale"
    >
      Salta al contenuto
    </a>
  );
}
