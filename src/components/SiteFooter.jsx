import { footerLinks } from "../data/legalPages.js";

export function SiteFooter({ onOpenLegalPage, onOpenBetaFeedback }) {
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
        <button
          className="site-footer-link"
          type="button"
          onClick={onOpenBetaFeedback}
        >
          Beta feedback
        </button>
      </nav>
      <p className="site-footer-note">
        Limited beta · estimates for planning only — verify parts and fly safely.
      </p>
    </footer>
  );
}