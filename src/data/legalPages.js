export const contactEmail = "joedesmos.co@gmail.com";

export const footerLinks = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "disclaimer", label: "Disclaimer" },
];

export const legalPages = {
  about: {
    id: "about",
    title: "About",
    sections: [
      {
        paragraphs: [
          "MaidenReady is an FPV drone build calculator for comparing parts, presets, estimated performance, compatibility warnings, and saved builds. It is designed for planning and education, not as a guarantee of real-world flight performance.",
        ],
      },
    ],
  },
  contact: {
    id: "contact",
    title: "Contact",
    sections: [
      {
        paragraphs: [
          "Send feedback, bug reports, part corrections, image/source issues, or general questions.",
        ],
        email: contactEmail,
      },
    ],
  },
  disclaimer: {
    id: "disclaimer",
    title: "Disclaimer",
    sections: [
      {
        heading: "Estimates only",
        paragraphs: [
          "Stats shown in MaidenReady are conservative estimates for comparison only. They help you compare builds inside the app; they are not measured flight data.",
        ],
      },
      {
        heading: "Real-world performance",
        paragraphs: [
          "Real performance depends on build quality, tune, battery health, props, wind, payload, and pilot input. Two builds with the same parts can behave differently in the field.",
        ],
      },
      {
        heading: "Verify before you buy or fly",
        paragraphs: [
          "Always verify compatibility with manufacturer documentation before buying or flying. MaidenReady catalogs simplified specs and cannot replace datasheets, manuals, or retailer listings.",
        ],
      },
      {
        heading: "Safety and legal compliance",
        paragraphs: [
          "FPV drones can be dangerous. Follow local laws, respect airspace rules, use appropriate safety gear, and fly responsibly.",
        ],
      },
    ],
  },
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    updated: "June 27, 2026",
    sections: [
      {
        paragraphs: [
          "This Privacy Policy describes how MaidenReady (https://maidenready.com) handles information when you use the site. This summary is provided for clarity and is not legal advice. We may update this policy from time to time.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy can be sent to:",
        ],
        email: contactEmail,
      },
      {
        heading: "What MaidenReady stores locally",
        paragraphs: [
          "Saved builds are stored locally in your browser using localStorage. They stay on your device unless you clear site data or use a different browser or device.",
          "Share links encode selected part IDs in the URL query string so builds can be opened or copied. Anyone with the link can see those part selections in the URL.",
        ],
      },
      {
        heading: "Accounts and profiles",
        paragraphs: [
          "MaidenReady does not currently require accounts and does not collect submitted personal profiles through sign-up forms.",
        ],
      },
      {
        heading: "Advertising",
        paragraphs: [
          "If ads are served through Google AdSense, Google and other third-party vendors may use cookies or similar technologies to serve ads based on visits to this and other sites.",
          "Google's use of advertising cookies enables it and its partners to serve ads based on visits to this site and/or other sites on the Internet.",
          "You may visit Google's ad settings page to manage personalized ads from Google.",
          "Third-party vendors and ad networks may also use cookies for personalized advertising. You may visit those vendor websites or aboutads.info to opt out where those tools are available.",
        ],
        links: [
          {
            label: "Google Ad Settings",
            href: "https://adssettings.google.com",
          },
          {
            label: "aboutads.info (opt-out info)",
            href: "https://www.aboutads.info/choices/",
          },
        ],
      },
      {
        heading: "Your browser controls",
        paragraphs: [
          "You can clear localStorage, cookies, and other site data through your browser settings. Clearing data will remove saved builds stored in this browser.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may revise this Privacy Policy as the site changes. Continued use of MaidenReady after updates means you accept the revised policy.",
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    title: "Terms of Service",
    updated: "June 27, 2026",
    sections: [
      {
        paragraphs: [
          "By using MaidenReady, you agree to these Terms of Service. If you do not agree, do not use the site.",
        ],
      },
      {
        heading: "Provided as is",
        paragraphs: [
          "MaidenReady is provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or accuracy of estimates.",
        ],
      },
      {
        heading: "Estimates are not guarantees",
        paragraphs: [
          "Performance, price, weight, compatibility, and flight-time figures are estimates for planning and comparison. They are not guarantees of real-world results.",
        ],
      },
      {
        heading: "Your responsibility",
        paragraphs: [
          "You are responsible for verifying parts, compatibility, local laws, airspace rules, and safe operation before purchasing or flying.",
          "Do not rely on MaidenReady as your only source for purchasing or flight decisions. Confirm details with manufacturers, retailers, and official documentation.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, MaidenReady and its operator will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, equipment, injury, or property damage arising from use of the site or reliance on its estimates.",
        ],
      },
      {
        heading: "Questions",
        paragraphs: ["Questions about these Terms can be sent to:"],
        email: contactEmail,
      },
    ],
  },
};
