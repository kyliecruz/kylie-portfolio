export function Wave({ fill, flip }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginTop: -1 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
        <path d="M0,30 C180,56 360,4 540,30 C720,56 900,4 1080,30 C1260,56 1350,10 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function SectionDivider({ c, isBeach }) {
  return isBeach
    ? null
    : <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`, margin: "0 48px" }} />;
}
