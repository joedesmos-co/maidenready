import { footerLinks } from "../data/legalPages.js";

export function SiteFooter({ onOpenLegalPage }) {
  return (
    <footer className="site-footer">
      <nav aria-label="Site information" className="site-footer-nav">
        {footerLinks.map((link) => (
          <button
            key={link.id}
            className="site-footer-link"
            type="button"
            onClick={() => onOpenLegalPage(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <p className="site-footer-note">
        Estimates for planning only — verify parts and fly safely.
      </p>
    </footer>
  );
}
