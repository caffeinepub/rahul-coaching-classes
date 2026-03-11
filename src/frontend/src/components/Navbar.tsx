import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const path = routerState.location.pathname;

  const links = [
    { href: "/", label: "Home" },
    { href: "/materials", label: "Study Materials" },
    { href: "/papers", label: "Sample Papers" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-foreground leading-tight text-base">
              Rahul Coaching
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              Classes 1–12
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                path === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                path === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
