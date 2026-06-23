import { AuroraBackground } from "./AuroraBackground";
import { FluidBackground } from "./FluidBackground";

/** Layered site backdrop — mesh base + interactive fluid blobs. */
export const SiteBackground = () => (
  <>
    <AuroraBackground />
    <FluidBackground />
  </>
);
