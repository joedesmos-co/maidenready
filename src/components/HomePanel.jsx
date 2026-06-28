const howItWorksSteps = [
  "Start with a preset or choose a build class.",
  "Pick parts in Custom Build.",
  "Check estimates and compatibility.",
  "Save, compare, or share your build.",
];

const featureCards = [
  {
    title: "Presets",
    description: "Curated starter lists for whoops, freestyle, cinewhoop, and long-range.",
  },
  {
    title: "Custom Build",
    description: "Nine-part picker with live stats, grades, and part details.",
  },
  {
    title: "Compatibility checks",
    description: "Static warnings for props, voltage, stack fit, and video systems.",
  },
  {
    title: "Estimated stats",
    description: "Price, mass, thrust, T:W, flight time, and top speed ranges.",
  },
  {
    title: "Saved Builds",
    description: "Store builds in this browser — no account required.",
  },
  {
    title: "Compare",
    description: "Side-by-side estimated stats for two saved builds.",
  },
  {
    title: "Learn glossary",
    description: "Plain-language FPV terms for motors, packs, props, and links.",
  },
  {
    title: "Share links",
    description: "Copy a URL with your class and part selections.",
  },
];

export function HomePanel({ onNavigateTab }) {
  return (
    <div className="home-panel">
      <section aria-labelledby="home-hero-heading" className="home-hero">
        <p className="eyebrow">Welcome</p>
        <h2 id="home-hero-heading" className="home-hero-title">
          Plan your FPV build before the maiden.
        </h2>
        <p className="home-hero-lead">
          MaidenReady estimates weight, price, thrust-to-weight, flight time, top speed,
          and part compatibility while you plan a quad. Use it to compare configurations
          and catch obvious mismatches before you buy or solder.
        </p>
        <p className="home-hero-note">
          MaidenReady is a build calculator — not a store. We do not sell parts, take
          orders, or link to checkout.
        </p>
      </section>

      <section aria-labelledby="home-how-heading" className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2 id="home-how-heading">How it works</h2>
        </div>
        <ol className="home-steps">
          {howItWorksSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="home-features-heading" className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Tools</p>
          <h2 id="home-features-heading">What you can do</h2>
        </div>
        <div className="home-feature-grid">
          {featureCards.map((card) => (
            <article className="home-feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-notes-heading" className="home-section home-notes">
        <div className="section-heading">
          <p className="eyebrow">Good to know</p>
          <h2 id="home-notes-heading">Before you fly</h2>
        </div>
        <div className="home-note">
          <h3>Estimates are approximate</h3>
          <p>
            Real-world performance depends on tuning, props, battery health, all-up weight,
            weather, and flying style. Use MaidenReady to compare builds — not as measured
            flight data.
          </p>
        </div>
        <div className="home-note">
          <h3>About part images</h3>
          <p>
            Some photos are manufacturer-source candidates pending review. Others are
            category illustrations when no verified product image is available. Check part
            details for source and review status.
          </p>
        </div>
      </section>

      <section aria-label="Get started" className="home-cta-row">
        <button className="home-cta-button primary" type="button" onClick={() => onNavigateTab("presets")}>
          Start with presets
        </button>
        <button className="home-cta-button" type="button" onClick={() => onNavigateTab("custom")}>
          Build from scratch
        </button>
        <button className="home-cta-button" type="button" onClick={() => onNavigateTab("learn")}>
          Learn FPV terms
        </button>
      </section>
    </div>
  );
}
