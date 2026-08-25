type PatternDividerProps = {
  flip?: boolean;
};

/** Slim kolam band — the motif's single signature appearance on the page. */
export const PatternDivider = ({ flip = false }: PatternDividerProps) => (
  <div
    className={`pattern-divider pattern-divider--kolam ${flip ? "pattern-divider--flip" : ""}`}
    aria-hidden="true"
  />
);
