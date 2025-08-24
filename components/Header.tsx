"use client";

// Accessible header with hamburger menu, breadcrumbs and theme toggle.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { setCookie } from "@/lib/cookies-client";
import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  studentName: string;
  studentNumber: string;
  lastMenuPathFromCookie?: string | null;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
] as const;

export default function Header(props: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Click outside to close (mobile)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (navRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // ESC to close (mobile)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function handleLinkClick(href: string) {
    // Persist last visited menu tab (page) in a cookie.
    setCookie("lastMenuPath", href);
  }

  return (
    <header className="site-header" role="banner">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="container">
        <div className="header-row" aria-label="Top bar">
          <Link href="/" className="brand" onClick={() => handleLinkClick("/")}>
            <span aria-hidden="true">🏷️</span>
            <span className="student-number" title="Student number (shown on every page)">{props.studentNumber}</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Show quick resume link if we have a cookie */}
            {props.lastMenuPathFromCookie && props.lastMenuPathFromCookie !== pathname && (
              <Link href={props.lastMenuPathFromCookie} onClick={() => handleLinkClick(props.lastMenuPathFromCookie!)}>
                Resume last page
              </Link>
            )}
            <ThemeToggle />
            <button
              ref={btnRef}
              className="menu-button"
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={open ? "true" : "false"}
              aria-label="Open main menu"
              onClick={() => setOpen(v => !v)}
            >
              ☰ Menu
            </button>
          </div>
        </div>

        <nav
          ref={navRef}
          id="primary-navigation"
          className={`primary-nav ${open ? "open" : ""}`}
          aria-label="Primary"
        >
          <ul className="nav-list" role="menubar" aria-label="Primary menu">
            {NAV_LINKS.map(link => (
              <li key={link.href} role="none">
                <Link
                  prefetch={false}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  role="menuitem"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="breadcrumbs">
          <Breadcrumbs />
        </div>
      </div>
    </header>
  );
}
