import { useEffect, useRef } from "react";
import { legalPages } from "../data/legalPages.js";

export function LegalPanel({ pageId, onClose }) {
  const closeButtonRef = useRef(null);
  const page = pageId ? legalPages[pageId] : null;

  useEffect(() => {
    if (!page) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, page]);

  if (!page) {
    return null;
  }

  return (
    <div className="legal-panel-layer">
      <button
        aria-label="Close information panel"
        className="legal-panel-scrim"
        type="button"
        onClick={onClose}
      />
      <div
        aria-labelledby="legal-panel-title"
        aria-modal="true"
        className="legal-panel"
        role="dialog"
      >
        <div className="legal-panel-header">
          <div>
            <p className="eyebrow">Information</p>
            <h2 id="legal-panel-title">{page.title}</h2>
            {page.updated && (
              <p className="legal-panel-updated">Last updated: {page.updated}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            className="drawer-close"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="legal-panel-body">
          {page.sections.map((section, index) => (
            <section className="legal-section" key={`${page.id}-${index}`}>
              {section.heading && <h3>{section.heading}</h3>}
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${page.id}-${index}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.email && (
                <p className="legal-contact-email">
                  Email:{" "}
                  <a href={`mailto:${section.email}`}>{section.email}</a>
                </p>
              )}
              {section.links?.length > 0 && (
                <ul className="legal-link-list">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} rel="noopener noreferrer" target="_blank">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
