import { useEffect, useRef, useState } from "react";
import { buildClasses } from "../data/parts.js";
import { contactEmail } from "../data/legalPages.js";
import { copyTextToClipboard } from "../utils/shareUrl.js";

const feedbackAreas = [
  "Understanding the builder",
  "Incorrect or missing hardware data",
  "Compatibility warning looks wrong",
  "Bug or broken interaction",
  "Mobile usability",
  "Feature I expected but could not find",
  "Other",
];

export function BetaFeedbackPanel({ onClose }) {
  const closeRef = useRef(null);
  const [buildClass, setBuildClass] = useState("5-inch-freestyle");
  const [device, setDevice] = useState("Desktop");
  const [area, setArea] = useState(feedbackAreas[0]);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const report = [
    "MaidenReady beta feedback",
    "",
    `Build class: ${buildClass}`,
    `Device: ${device}`,
    `Area: ${area}`,
    `Page: ${typeof window !== "undefined" ? window.location.href : ""}`,
    replyTo ? `Reply to: ${replyTo}` : "",
    "",
    "Feedback:",
    message || "(describe what happened)",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(report);
      setStatus("Feedback copied. Paste it into an email or message.");
    } catch {
      setStatus("Copy failed. Select the text manually.");
    }
    window.setTimeout(() => setStatus(""), 3000);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("MaidenReady beta feedback");
    const body = encodeURIComponent(report);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="feedback-layer">
      <button
        aria-label="Close beta feedback"
        className="feedback-scrim"
        type="button"
        onClick={onClose}
      />
      <div
        aria-labelledby="feedback-title"
        aria-modal="true"
        className="feedback-panel"
        role="dialog"
      >
        <div className="feedback-header">
          <div>
            <p className="eyebrow">Limited beta</p>
            <h2 id="feedback-title">Send feedback</h2>
          </div>
          <button
            ref={closeRef}
            className="drawer-close"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <p className="feedback-intro">
          No account or backend. Copy the report or open it in your email app.
          Please do not include passwords or private account details.
        </p>

        <div className="feedback-grid">
          <label>
            Build class
            <select value={buildClass} onChange={(event) => setBuildClass(event.target.value)}>
              {buildClasses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
              <option value="not-sure">Not sure</option>
            </select>
          </label>
          <label>
            Device
            <select value={device} onChange={(event) => setDevice(event.target.value)}>
              <option>Desktop</option>
              <option>iPhone</option>
              <option>Android</option>
              <option>Tablet</option>
            </select>
          </label>
        </div>

        <label>
          What is this about?
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            {feedbackAreas.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          What happened?
          <textarea
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What did you expect, what happened, and which part or build was involved?"
          />
        </label>

        <label>
          Reply-to email (optional)
          <input
            type="email"
            value={replyTo}
            onChange={(event) => setReplyTo(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <div className="feedback-actions">
          <button type="button" onClick={handleCopy}>
            Copy report
          </button>
          <button className="primary" type="button" onClick={handleEmail}>
            Email report
          </button>
        </div>
        <span aria-live="polite" className="feedback-status">{status}</span>
      </div>
    </div>
  );
}