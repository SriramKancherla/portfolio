/** Slow aurora bands — cyan → violet → blue, drifting horizontally. */
export const AuroraBackground = () => (
  <div className="aurora-bg fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
    <div className="aurora-bg__base" />
    <div className="aurora-bg__band aurora-bg__band--1" />
    <div className="aurora-bg__band aurora-bg__band--2" />
    <div className="aurora-bg__band aurora-bg__band--3" />
    <div className="aurora-bg__band aurora-bg__band--4" />
    <div className="aurora-bg__veil" />
  </div>
);
