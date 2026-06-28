const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
};

const placeholders = {
  frame: (
    <>
      <rect x="26" y="26" width="12" height="12" {...stroke} />
      <line x1="32" y1="26" x2="32" y2="8" {...stroke} />
      <line x1="32" y1="38" x2="32" y2="56" {...stroke} />
      <line x1="26" y1="32" x2="8" y2="32" {...stroke} />
      <line x1="38" y1="32" x2="56" y2="32" {...stroke} />
      <circle cx="32" cy="8" r="3.5" {...stroke} />
      <circle cx="32" cy="56" r="3.5" {...stroke} />
      <circle cx="8" cy="32" r="3.5" {...stroke} />
      <circle cx="56" cy="32" r="3.5" {...stroke} />
      <line x1="28" y1="28" x2="36" y2="36" {...stroke} />
      <line x1="36" y1="28" x2="28" y2="36" {...stroke} />
    </>
  ),
  motors: (
    <>
      <circle cx="32" cy="32" r="18" {...stroke} />
      <circle cx="32" cy="32" r="8" {...stroke} />
      <circle cx="32" cy="32" r="2" {...stroke} />
      <line x1="32" y1="14" x2="32" y2="24" {...stroke} />
      <line x1="32" y1="40" x2="32" y2="50" {...stroke} />
      <line x1="14" y1="32" x2="24" y2="32" {...stroke} />
      <line x1="40" y1="32" x2="50" y2="32" {...stroke} />
      <rect x="29" y="6" width="6" height="6" {...stroke} />
    </>
  ),
  esc: (
    <>
      <rect x="12" y="18" width="40" height="28" {...stroke} />
      <rect x="24" y="28" width="16" height="10" {...stroke} />
      <rect x="14" y="20" width="6" height="6" {...stroke} />
      <rect x="44" y="20" width="6" height="6" {...stroke} />
      <rect x="14" y="38" width="6" height="6" {...stroke} />
      <rect x="44" y="38" width="6" height="6" {...stroke} />
      <line x1="20" y1="23" x2="24" y2="28" {...stroke} />
      <line x1="44" y1="23" x2="40" y2="28" {...stroke} />
      <line x1="20" y1="41" x2="24" y2="38" {...stroke} />
      <line x1="44" y1="41" x2="40" y2="38" {...stroke} />
    </>
  ),
  flightController: (
    <>
      <rect x="14" y="16" width="36" height="32" {...stroke} />
      <rect x="26" y="28" width="12" height="8" {...stroke} />
      <rect x="16" y="18" width="4" height="4" {...stroke} />
      <rect x="44" y="18" width="4" height="4" {...stroke} />
      <rect x="16" y="42" width="4" height="4" {...stroke} />
      <rect x="44" y="42" width="4" height="4" {...stroke} />
      <rect x="30" y="12" width="4" height="4" {...stroke} />
      <line x1="18" y1="24" x2="26" y2="28" {...stroke} />
      <line x1="46" y1="24" x2="38" y2="28" {...stroke} />
    </>
  ),
  props: (
    <>
      <circle cx="32" cy="32" r="4" {...stroke} />
      <line x1="32" y1="32" x2="32" y2="10" {...stroke} />
      <line x1="32" y1="32" x2="51" y2="48" {...stroke} />
      <line x1="32" y1="32" x2="13" y2="48" {...stroke} />
      <line x1="32" y1="10" x2="28" y2="16" {...stroke} />
      <line x1="32" y1="10" x2="36" y2="16" {...stroke} />
      <line x1="51" y1="48" x2="45" y2="44" {...stroke} />
      <line x1="51" y1="48" x2="47" y2="52" {...stroke} />
      <line x1="13" y1="48" x2="19" y2="44" {...stroke} />
      <line x1="13" y1="48" x2="17" y2="52" {...stroke} />
    </>
  ),
  battery: (
    <>
      <rect x="14" y="20" width="36" height="24" {...stroke} />
      <line x1="22" y1="20" x2="22" y2="44" {...stroke} />
      <line x1="32" y1="20" x2="32" y2="44" {...stroke} />
      <line x1="42" y1="20" x2="42" y2="44" {...stroke} />
      <rect x="48" y="28" width="6" height="8" {...stroke} />
      <line x1="18" y1="26" x2="46" y2="26" {...stroke} />
      <line x1="18" y1="38" x2="46" y2="38" {...stroke} />
    </>
  ),
  receiver: (
    <>
      <rect x="18" y="30" width="22" height="14" {...stroke} />
      <rect x="22" y="34" width="6" height="6" {...stroke} />
      <polyline
        points="40,37 46,37 46,24 52,24 52,37 58,37"
        {...stroke}
      />
      <line x1="20" y1="32" x2="38" y2="32" {...stroke} />
      <line x1="20" y1="42" x2="34" y2="42" {...stroke} />
    </>
  ),
  camera: (
    <>
      <rect x="16" y="22" width="32" height="20" {...stroke} />
      <circle cx="32" cy="32" r="7" {...stroke} />
      <circle cx="32" cy="32" r="3" {...stroke} />
      <rect x="22" y="26" width="6" height="4" {...stroke} />
      <line x1="16" y1="28" x2="12" y2="28" {...stroke} />
    </>
  ),
  vtx: (
    <>
      <rect x="16" y="26" width="28" height="18" {...stroke} />
      <rect x="22" y="30" width="10" height="8" {...stroke} />
      <line x1="44" y1="34" x2="52" y2="34" {...stroke} />
      <line x1="52" y1="34" x2="52" y2="14" {...stroke} />
      <line x1="52" y1="14" x2="56" y2="10" {...stroke} />
      <line x1="24" y1="42" x2="36" y2="42" {...stroke} />
    </>
  ),
};

export function PartCategoryPlaceholder({ categoryKey }) {
  const graphic = placeholders[categoryKey] ?? placeholders.flightController;

  return (
    <svg
      aria-hidden="true"
      className="part-placeholder-svg"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {graphic}
    </svg>
  );
}
