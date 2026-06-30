import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import logoAsset from "@/assets/logo.png.asset.json";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${
            scrolled ? "glass-light shadow-card" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Abdul Web Agency" width={140} height={36} className="h-9 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition"
          >
            Get a Quote
          </a>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 glass-light rounded-2xl p-4 shadow-card">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}