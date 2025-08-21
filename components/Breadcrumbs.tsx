"use client";

// Accessible breadcrumb builder based on current pathname.
// AI disclosure: assisted by GPT-5 Pro.
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [
    { href: "/", label: "Home" },
    ...segments.map((seg, idx) => ({
      href: "/" + segments.slice(0, idx + 1).join("/"),
      label: decodeURIComponent(seg).replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase()),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {crumbs.map((c, i) => (
          <li key={c.href}>
            {i > 0 && <span aria-hidden="true">/</span>}{" "}
            {i < crumbs.length - 1 ? (
              <Link href={c.href}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
