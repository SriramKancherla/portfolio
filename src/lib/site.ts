export const RESUME_PDF_URL = "/documents/sriram-kancherla-resume.pdf";
export const RESUME_PAGE_PATH = "/resume";
export const EMAIL = "kancherlasriram2006@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sriram-kancherla-80a7b028a/";
export const GITHUB_URL = "https://github.com/sriramkancherla";
export const NUS_CREDENTIALS_URL = "https://credentials.nus.edu.sg/profile/sriramkancherla155324/wallet";
export const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/sriram-kancherla-80a7b028a/details/certifications/";

/** Footer role line */
export const FOOTER_ROLE_LINE = "Final year @ VIT Vellore · ex-FlyRank AI · ex-NUS";

/** Role titles shown in hero. */
export const ROLES_LINE = "ML Engineer · Data Analyst";

/** Set NEXT_PUBLIC_SITE_URL at build time for absolute canonical / OG URLs. */
export const SITE_URL =
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined)?.replace(/\/$/, "") ?? "";

/** Hero name styling — clean grotesk, no script face. */
export const NAME_TITLE_CLASS =
  "font-display font-bold text-[clamp(2.5rem,7.5vw,5rem)] leading-[1.08] tracking-tight";

export const NAME_HERO_TITLE_CLASS = `${NAME_TITLE_CLASS} inline-flex flex-wrap justify-center items-baseline gap-x-[0.25em] max-w-full`;
