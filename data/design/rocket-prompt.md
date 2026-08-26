# Rocket prompt — Sriram Kancherla portfolio (v2)

Two options in this file:

- **Part A — Follow-up command.** Your site already exists in Rocket. Paste Part A as a follow-up to patch the color, depth, motion, and hero line without rebuilding.
- **Part B — Full prompt.** The whole thing rewritten, if you'd rather start clean.

Notes for you are at the very bottom. Don't paste those.

---
---

# PART A — paste this into your existing Rocket project

Keep the current section structure and content. Change the visual system, add depth and motion, and update the hero. Specifically:

## A1. Replace the entire color palette

Every gold/amber value in the site is out. Swap to this deep-ocean set and re-derive every color from these tokens — no leftover warm tones anywhere.

```
--bg:          #08111C   /* page canvas — navy-black */
--surface-1:   #0F1B2A   /* cards, panels */
--surface-2:   #16293D   /* card hover, raised blocks */
--text:        #E8EEF5   /* primary text — cool off-white, never pure #FFF */
--muted:       #8697AD   /* metadata, secondary text */
--border:      rgba(232, 238, 245, 0.10)
--border-lit:  rgba(77, 163, 255, 0.45)   /* hover/active borders */
--accent:      #4DA3FF   /* electric blue — the ONLY accent */
--accent-dim:  rgba(77, 163, 255, 0.14)   /* tints, glows, badges */
```

The palette is cold on purpose. No warm tones, no second accent, no gradients between two hues. The accent carries links, section numbers, active states, focus rings, the live badge, and small icons — never large fills.

## A2. Fix the flatness — add real depth

The current build reads flat. Give it layered elevation:

- **Surface steps.** Cards sit on `--surface-1`, lift to `--surface-2` on hover. Never leave a card the same color as the page.
- **Top-edge highlight.** Every card and panel gets `box-shadow: inset 0 1px 0 rgba(232,238,245,0.07)`. This single line is what makes dark UI read as physical instead of painted on.
- **Ambient glow behind the hero.** A large soft radial gradient anchored above the fold: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(77,163,255,0.13), transparent 65%)`. Fixed, behind everything, `pointer-events: none`. Do not repeat it in other sections — one atmospheric moment, not five.
- **Film grain.** A full-viewport fixed overlay generated with an inline SVG `feTurbulence` (baseFrequency ~0.85, monochrome), at 3.5% opacity, `mix-blend-mode: overlay`, `pointer-events: none`, above the background and below the content. It should be almost invisible — you notice it only when you remove it.
- **Gradient hairlines.** Section dividers fade at both ends instead of running edge to edge: `linear-gradient(90deg, transparent, var(--border) 15%, var(--border) 85%, transparent)`.
- **Bigger, more dramatic type.** Scale the hero name up to `clamp(3.5rem, 13vw, 10rem)` with `letter-spacing: -0.045em` and `line-height: 0.92`. Section headings up to `clamp(2.25rem, 5.5vw, 4rem)`. The type should feel like the loudest thing on the page — that's where the drama comes from, not from decoration.
- **Project cards get real weight.** Give each one `--surface-1`, 1px border, 20px radius, and generous internal padding (32–40px desktop). They should read as objects, not as rows separated by lines.

Still forbidden: glassmorphism, gradient mesh backgrounds, neon glow around text, drop shadows on text, a second accent color.

## A3. Add motion

Right now it's static. Add these, all gated behind `prefers-reduced-motion: reduce`:

1. **Cursor spotlight on cards.** As the pointer moves inside a project or skill card, a soft radial highlight follows it — `radial-gradient(400px circle at var(--mx) var(--my), rgba(77,163,255,0.08), transparent 40%)` on a pseudo-element, with `--mx`/`--my` updated from a throttled `mousemove`. Fades in over 200ms on enter, out on leave. Desktop only; skip on touch.
2. **Magnetic buttons.** Primary buttons drift up to 6px toward the cursor when it's within ~40px, and spring back on leave with `cubic-bezier(0.34, 1.56, 0.64, 1)`. Subtle — it should feel like weight, not like the button is chasing the mouse.
3. **Animated metric counters.** When a project card scrolls into view, its numeric metrics count up from zero over 900ms with an ease-out curve. Only animate values that begin with a digit — animate the leading integer and keep any suffix static, so `8+` counts to 8 then shows the `+`, `120+` counts to 120, `5` counts to 5. Values like `80/20`, `Semiconductor`, `JWT`, and `Render` render statically with no animation. Use `font-variant-numeric: tabular-nums` so nothing jitters while counting.
4. **Sliding nav indicator.** A small accent underline slides horizontally between nav links as the scroll-spy changes sections, rather than appearing and disappearing. Animate with a transform, not `left`.
5. **Parallax on section headings.** As a section scrolls through the viewport, its heading translates upward ~12px slower than the body content beside it. Drive it from a scroll listener with `requestAnimationFrame`, or `animation-timeline: view()` where supported. Keep it small enough that people feel it rather than see it.
6. **Skill tag river.** In the Skills section, render the tag pool as two rows drifting horizontally in opposite directions at ~40s per loop, pausing on hover. Hovering a category still dims the non-matching tags — the drift and the dim work together.
7. **Richer card hover.** On hover a project card lifts 3px, its border goes to `--border-lit`, and its background steps to `--surface-2`, all over 250ms `cubic-bezier(0.16, 1, 0.3, 1)`.

Keep the existing scroll-reveal (fade + rise, staggered) and the name intro animation.

## A4. Update the hero

Directly under the `<h1>`, replace whatever role line is there now with this credential line:

> **Final year at VIT Vellore · ex-ML Intern @ FlyRank AI · ex-Academic Intern @ NUS Singapore**

Render it as a single mono line at 13–14px, `letter-spacing: 0.04em`, centered, wrapping to two or three lines on narrow screens with the `·` separators hidden at the wrap points. Set the `ex-` prefixes and the word `at`/`@` in `--muted`, and the organization names — VIT Vellore, FlyRank AI, NUS Singapore — in `--text`. That contrast is what makes the line scannable instead of a grey blur.

Remove the old `ML Intern @ FlyRank AI` status pill — this line replaces it. Keep `ML Engineer · Data Analyst` above it as the role line, and the location line below.

Also update the footer's role line to: `Final year @ VIT Vellore · ex-FlyRank AI · ex-NUS`

## A5. Refresh this copy

Replace the existing strings with these:

- **Hero tagline:**
  > I build machine learning systems that have to hold up outside a notebook — wafer defects, market signals, and the log entries nobody wants to find. One of them is live right now.

- **About heading:** `The short version.`
- **About body:**
  > CS at VIT Vellore, now in my final year. I like the unglamorous half of machine learning — the pipelines, the feature engineering, the evaluation, the part where the model has to work for someone who isn't me. Most of what I've built has landed in finance, healthcare, and security, which wasn't the plan so much as what kept turning out to be interesting.

- **Experience heading:** `Where I've shown up.`
- **Experience intro:** `Two so far — a June in Singapore and a remote summer. Both beat the syllabus.`
- **Projects intro:** `Five worth showing. One of them you can go use right now.`
- **Skills intro:** `Hover a category. Everything that doesn't belong gets out of the way.`
- **Certifications intro:** `The receipts. Newest first.`
- **Contact heading:** `Let's build something.`
- **Contact body:**
  > Open to full-time roles, research collaborations, or a project that just sounds fun. Based in Vellore, and I reply faster than you'd expect.

- **FlyRank experience entry** — rewrite in past tense, since it's finished:
  > Eight weeks on FlyRank AI's ML Engineering internship, July through August. Real ML engineering the whole way — experimentation, workflow design, and pipelines built to run in production rather than sit in a notebook.

Everything else — sections, project data, certifications, links, skills — stays exactly as it is.

---
---

# PART B — full prompt, if you'd rather rebuild from scratch

Build a personal portfolio website for **Sriram Kancherla** — a final-year Computer Science student at VIT Vellore working in machine learning and data analytics.

Responsive single-page site plus one extra route (`/resume`). Production-quality: semantic HTML, accessible, fast, no layout shift, no horizontal scroll at any width.

## 1. Visual direction — deep ocean, dark, with weight

Cold, technical, and physical. Layered dark surfaces with a single electric blue running through them. Confident and quiet, but not flat — the page should feel like it has depth and atmosphere.

**Palette:**

```
--bg:          #08111C
--surface-1:   #0F1B2A
--surface-2:   #16293D
--text:        #E8EEF5
--muted:       #8697AD
--border:      rgba(232, 238, 245, 0.10)
--border-lit:  rgba(77, 163, 255, 0.45)
--accent:      #4DA3FF
--accent-dim:  rgba(77, 163, 255, 0.14)
```

Accent rules: links, section numbers, active states, focus rings, the live badge, small icons. Never a large fill, never a second accent, never a two-hue gradient.

**Depth system:**

- Cards on `--surface-1`, lifting to `--surface-2` on hover.
- `box-shadow: inset 0 1px 0 rgba(232,238,245,0.07)` on every card and panel.
- One ambient radial glow behind the hero only: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(77,163,255,0.13), transparent 65%)`, fixed, `pointer-events: none`.
- A fixed film-grain overlay from an inline SVG `feTurbulence` (baseFrequency ~0.85, monochrome) at 3.5% opacity, `mix-blend-mode: overlay`, `pointer-events: none`.
- Section dividers are hairlines that fade at both ends: `linear-gradient(90deg, transparent, var(--border) 15%, var(--border) 85%, transparent)`.

**Type:**

- Headings and hero name: `Inter Tight` (Google Fonts), 500–600.
- Body: `Inter`, 400, `line-height: 1.65`, paragraphs capped at 68ch.
- Metadata — section numbers, dates, tags, metrics, badges: `JetBrains Mono`, 11–13px, `letter-spacing: 0.08em`, uppercase where noted.
- Hero name: `clamp(3.5rem, 13vw, 10rem)`, `letter-spacing: -0.045em`, `line-height: 0.92`. Section headings: `clamp(2.25rem, 5.5vw, 4rem)`, `letter-spacing: -0.03em`. The type is the loudest element on the page.

**Layout:**

- Max width 1120px, side padding `clamp(20px, 5vw, 64px)`.
- ~128px between sections on desktop, ~72px on mobile.
- Cards: 1px border, 20px radius, 32–40px internal padding on desktop.

**Motion** — every item below gated behind `prefers-reduced-motion: reduce`:

- Scroll reveal: fade + 14px rise, 550ms `cubic-bezier(0.16, 1, 0.3, 1)`, 60ms stagger, fired once via IntersectionObserver at 15% visibility.
- Cursor spotlight inside project and skill cards: `radial-gradient(400px circle at var(--mx) var(--my), rgba(77,163,255,0.08), transparent 40%)` on a pseudo-element, coordinates from a throttled `mousemove`. Desktop only.
- Magnetic primary buttons: up to 6px drift toward the cursor within ~40px, springing back on `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Card hover: 3px lift, border to `--border-lit`, background to `--surface-2`, 250ms.
- Metric counters animating up from zero on scroll-in over 900ms, ease-out — leading integer only, suffixes static, non-numeric values untouched, `tabular-nums` throughout.
- Nav indicator sliding between links on scroll-spy change, driven by transform.
- Section headings parallaxing ~12px slower than adjacent body copy.
- Smooth scroll on anchor links.

## 2. Section structure

`Navbar → Hero → About → Experience → Projects → Skills → Certifications → Contact → Footer`, plus `/resume`.

Each section after the hero gets a mono eyebrow: `01 —— ABOUT` — number in accent, short hairline, label in muted uppercase and letterspaced. About 01, Experience 02, Projects 03, Skills 04, Certifications 05, Contact 06.

### Navbar

Fixed. Transparent at rest; past 20px of scroll it takes a `backdrop-filter: blur(14px)` with `background: rgba(8,17,28,0.72)` and a bottom hairline, over 400ms.

- Left: an `SK` monogram in a small square with a 1px accent border, then **Sriram Kancherla** (name hides below `sm`).
- Center/right: `About · Experience · Projects · Skills · Certs · Contact`, with a sliding accent indicator under the active section (IntersectionObserver scroll-spy).
- Right: a `Résumé` button, outlined in accent, to `/resume`.
- Mobile: hamburger opening a full-height sheet that slides down, locks body scroll, and closes on tap.

### Hero

Full viewport height, centered.

**Name intro (once per session):** on first load, the letters of `SRIRAM KANCHERLA` fade and rise into place one at a time over ~1.6s (40ms stagger), hold ~400ms, then the lockup scales down into its hero position as the rest of the page fades in. Under 2.6s total. Skippable on click, scroll, or Esc. Persist completion in `sessionStorage` so client-side navigation doesn't replay it, but let a hard reload play it again. Skip entirely under `prefers-reduced-motion`. Include a 6s failsafe that unlocks the page regardless.

**Content, in order:**

1. Mono eyebrow: `CS @ VIT VELLORE · 2023–2027`
2. `<h1>`: **Sriram Kancherla** — "Sriram" in `--text`, "Kancherla" in `--accent`.
3. Role line, mono, muted: `ML Engineer · Data Analyst`
4. **Credential line** — single mono line, 13–14px, `letter-spacing: 0.04em`, centered:
   > Final year at VIT Vellore · ex-ML Intern @ FlyRank AI · ex-Academic Intern @ NUS Singapore

   Set `ex-`, `at`, and `@` in `--muted`; set **VIT Vellore**, **FlyRank AI**, and **NUS Singapore** in `--text`. Wraps to two or three lines on narrow screens, hiding the `·` separators at the wrap points.
5. Location, muted, with a pin icon: `Vellore, Tamil Nadu, India`
6. Tagline, max 62ch, centered:
   > I build machine learning systems that have to hold up outside a notebook — wafer defects, market signals, and the log entries nobody wants to find. One of them is live right now.
7. Three buttons (full-width stacked on mobile):
   - `See the work` → `#projects` — primary, accent border, transparent fill, arrow icon, magnetic
   - `Résumé` → `/resume` — secondary, muted border
   - `LinkedIn` → LinkedIn URL, new tab — ghost
8. Scroll cue: a 40px vertical hairline with a short accent segment looping downward. Fades out on first scroll.

### About — `01`

Two columns on desktop (left sticky at `top: 7rem`), one on mobile.

**Left:**
- Heading: **The short version.**
- Body:
  > CS at VIT Vellore, now in my final year. I like the unglamorous half of machine learning — the pipelines, the feature engineering, the evaluation, the part where the model has to work for someone who isn't me. Most of what I've built has landed in finance, healthcare, and security, which wasn't the plan so much as what kept turning out to be interesting.

**Right — four cards, 2×2 on desktop,** each with a mono uppercase accent kicker:

| Kicker | Body |
| --- | --- |
| `EDUCATION` | B.Tech in Computer Science & Engineering, VIT Vellore — Aug 2023 to Aug 2027, currently final year. Coursework in DSA, OOP, NLP, and AI/ML. CGPA 7.29/10. |
| `FOCUS` | ML engineering, data analytics, and finance — with detours into NLP, computer vision, anomaly detection, and full-stack ML apps built on FastAPI and Docker. |
| `GOAL` | Build AI products people actually use — ideally ones that don't quietly fall over in production. |
| `LANGUAGES` | English, Telugu, and Tamil natively. Hindi and French are a work in progress. |

### Experience — `02`

- Heading: **Where I've shown up.**
- Intro, muted: `Two so far — a June in Singapore and a remote summer. Both beat the syllabus.`

A vertical timeline with a left hairline rail and a small bordered node at each entry. Each entry is a card.

**Entry 1**
- Meta (mono, accent): `JUL 2026 — AUG 2026 · REMOTE · 8 WEEKS`
- Role: `Machine Learning Engineering Intern`
- Company (accent): `FlyRank AI (FlyRank Corp.)`
- Body:
  > Eight weeks on FlyRank AI's ML Engineering internship, July through August. Real ML engineering the whole way — experimentation, workflow design, and pipelines built to run in production rather than sit in a notebook.
- Tags: `Machine Learning` `ML Engineering` `FlyRank AI`

**Entry 2**
- Meta: `JUN 2025 · SINGAPORE`
- Role: `Academic Intern`
- Company: `National University of Singapore (NUS)`
- Body:
  > Spent June doing exploratory data analysis on large-scale user activity and system log data, looking for the behavioral patterns that turn out to be insider threats. Built and evaluated a detection model using big data analytics and deep learning, then presented the findings under faculty supervision.
- Tags: `EDA` `Insider Threat Detection` `Deep Learning` `Research`
- Verification link, small and accent with a document icon: `NUS Digital Certificate` → `https://credentials.nus.edu.sg/profile/sriramkancherla155324/wallet` (new tab)

### Projects — `03`

- Heading: **Things I've built.**
- Intro, muted: `Five worth showing. One of them you can go use right now.`

**Filter row** right-aligned, level with the heading: `All · ML · AI · Analytics · Full-Stack`. Active is accent with a 2px accent underline; inactive muted. Filtering animates cards out and in (opacity + 8px rise, 250ms). Empty result: `Nothing under that one yet. Try another.`

Each project is a full-width card containing, in order:

1. Mono meta, muted: `PERIOD · CATEGORIES`
2. Title (`h3`)
3. **Live badge** where a live URL exists — bordered pill with a pulsing accent dot reading `LIVE`, next to the clickable domain
4. Description
5. Metrics row — three mono stat pairs separated by `·`, value in `--text`, label in `--muted`, counters animating on scroll-in
6. Tech line, muted, joined with `·`
7. Links — `Code` (GitHub icon), `Live` (external-link icon), certificate links — accent, underline on hover

---

**Image Based Wafer Map Pattern Intelligence**
- `Feb 2026 — Present` · ML, AI
- > A CNN that looks at silicon wafer maps and tells you what went wrong on the fab floor. The hard part isn't the model — it's wafers arriving at wildly different sizes and a dataset format from another decade. Evaluated properly with confusion matrices, not vibes.
- Metrics: `8+ Defect Classes` · `80/20 Train/Test Split` · `Semiconductor Domain`
- Tech: Python · PyTorch · OpenCV · NumPy · Pandas · scikit-learn
- Code: `https://github.com/SriramKancherla/Image-based-Wafer-Map-Pattern-intelligence`

**AInvestify — AI Stock Screener**
- `Dec 2025 — Present` · ML, Full-Stack, Analytics
- Live: `https://ainvestify.onrender.com` (badge label `ainvestify.onrender.com`)
- > An AI stock screener that reads the fundamentals and the news at the same time, then calls a stock strong or weak. A Random Forest classifier rates the fundamentals good or bad, an XGBoost regressor turns that into a 0–1 strength score, and VADER handles sentiment across whatever the news is saying that day. Data comes in through yFinance and Google News RSS, models ship out via joblib. It's deployed — go break it.
- Metrics: `4+ ML Models` · `5 API Endpoints` · `Deployed on Render`
- Tech: Python · FastAPI · XGBoost · Random Forest · VADER NLP · yFinance · REST APIs · Docker
- Code: `https://github.com/SriramKancherla/AInvestify`

**Shiksha Sahayak — Offline-First Education Management Console**
- `Sep 2025 — Nov 2025` · AI, Full-Stack
- > An education management platform built for schools where the internet isn't a given. Everything runs locally, including the LLM. Teachers upload material and get worksheets and assessments back; students get a tutor that has actually read the material, thanks to FAISS semantic search. MySQL locally, Firebase for backup, JWT holding the doors.
- Metrics: `JWT Auth` · `FAISS Search` · `Local LLM Privacy`
- Tech: FastAPI · Streamlit · MySQL · FAISS · JWT · Firebase
- Code: `https://github.com/SriramKancherla/Shiksha-Sahayak`

**Healthcare Analytics — IITK D&G Capstone**
- `Sep 2025 — Nov 2025` · ML, Analytics
- > Predicts whether a patient is coming back within 30 days, using demographics, medical history, admission details, procedures, and discharge outcomes. The point is catching the high-risk cases before the readmission — and the cost — happens. Capstone for the IIT Kanpur E&ICT program.
- Metrics: `30-day Risk Window` · `6+ Data Sources` · `IITK D&G Partner`
- Tech: Python · scikit-learn · Machine Learning · Data Analytics
- Code: `https://github.com/SriramKancherla/Healthcare-Management---IITK-D-G-Capstone-Project`
- Certificate: `/documents/iitk-dg-professional-certificate.pdf`, labeled `Certificate`

**Insider Threat Detection**
- `Aug 2025 — Oct 2025` · ML, AI
- > User Behavior Analytics on the CERT Insider Threat dataset. Fused five log sources — logon, email, HTTP, file, and USB — into one view, then engineered features for the things people do when they're up to something: late-night USB usage, off-hours logins, non-HTTPS browsing, suspicious email attachments. Autoencoders, Isolation Forest, and LightGBM stacked into one hybrid anomaly pipeline.
- Metrics: `5 Log Sources` · `3 Models` · `120+ Features`
- Tech: Python · LightGBM · Autoencoders · Isolation Forest · UBA
- Certificate: `https://credentials.nus.edu.sg/profile/sriramkancherla155324/wallet`, labeled `NUS Certificate`

### Skills — `04`

- Heading: **The stack.**
- Intro, muted: `Hover a category. Everything that doesn't belong gets out of the way.`

Two columns. Left: a narrow list of category cards. Right: a large panel holding every skill as a bordered mono tag, arranged as **two rows drifting horizontally in opposite directions** at roughly 40s per loop, pausing on hover.

Hovering or tapping a category highlights its border in accent and fades every non-matching tag to 30% opacity, while matching tags take an accent border and nudge up 1–2%. 200ms transitions, restoring on mouse-leave. Skills in multiple categories light up for each.

- **ML & Data** — Python, Machine Learning, Deep Learning, TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, NLP, EDA, ETL, Big Data, Joblib
- **Analytics** — Data Analytics, Data Acquisition, Data Manipulation, Data Modeling, Tableau, Excel, SQL
- **Backend** — Python, FastAPI, Node.js, JavaScript, REST APIs, Postman API, Firebase
- **Databases** — MySQL, SQL, FAISS
- **Cloud** — AWS, Azure, Oracle Cloud Infrastructure (OCI), AWS Glue, Amazon S3
- **DevOps** — Docker, Git, GitHub, CI/CD
- **Frontend & Other** — HTML, CSS, JavaScript, React.js, React Native, Java, C, C++, MATLAB

Each category card shows its label and a mono count line beneath it — compute the count from the list, don't hardcode. Deduplicate the tag pool: each skill appears exactly once, lighting up for every category it belongs to.

### Certifications — `05`

- Heading: **Certifications.**
- Intro, muted: `The receipts. Newest first.`

A divided list, no cards. Title and issuer left; date and a `View ↗` link right; hairlines between rows; row background lifting subtly on hover. All links open in a new tab.

| Title | Issuer | Date | Link |
| --- | --- | --- | --- |
| AWS Certified Cloud Practitioner (CLF-C02) | Amazon Web Services | Aug 2026 | LinkedIn certifications page |
| Microsoft Azure Fundamentals (AZ-900) | Microsoft | Jul 2026 | LinkedIn certifications page |
| Professional Certificate in Data Analytics and Generative AI | E&ICT Academy, IIT Kanpur | Dec 2025 | `/documents/iitk-dg-professional-certificate.pdf` |
| Postman API Fundamentals Student Expert | Postman | Aug 2025 | LinkedIn certifications page |
| Oracle Cloud Infrastructure 2025 Certified Generative AI Professional | Oracle | Jul 2025 | `/documents/oci-genai-professional.pdf` |
| AWS AI Practitioner Challenge | Amazon Web Services | Jun 2025 | `/documents/aws-ai-practitioner.pdf` |
| Supervised Machine Learning: Regression and Classification | DeepLearning.AI · Coursera | May 2025 | `/documents/supervised-ml-coursera.pdf` |
| NumPy | CodeChef | Mar 2025 | `https://codechef.com/certificates/public/508d224` |
| Pandas | CodeChef | Mar 2025 | `https://codechef.com/certificates/public/84eb5d2` |
| Docker Foundations Professional | Docker | Mar 2025 | `/documents/docker-foundations.pdf` |
| Foundations of GenAI | Udacity | Dec 2024 | `/documents/foundations-genai-udacity.pdf` |

"LinkedIn certifications page" = `https://www.linkedin.com/in/sriram-kancherla-80a7b028a/details/certifications/`

### Contact — `06`

Two columns: pitch and links left, form right.

**Left:**
- Heading: **Let's build something.**
- Body:
  > Open to full-time roles, research collaborations, or a project that just sounds fun. Based in Vellore, and I reply faster than you'd expect.
- Three links with icons, `--text` going accent on hover:
  - `kancherlasriram2006@gmail.com` → `mailto:`
  - `LinkedIn` → `https://www.linkedin.com/in/sriram-kancherla-80a7b028a/`
  - `github.com/sriramkancherla` → `https://github.com/sriramkancherla`

  (Label the LinkedIn one just `LinkedIn` — the profile slug is too long to read well, and shortening it produces a label that doesn't resolve.)

**Right — form** in a bordered panel: Name, Email, Subject, Message (5 rows), full-width `Send` button with a paper-plane icon.

- Inputs transparent, 1px `--border`, 10px radius, border to accent on focus. Never the browser's default focus ring.
- Client-side email regex with inline errors in a soft red — no browser tooltips.
- Hidden honeypot field named `botcheck`; silently drop the submit if filled.
- Max lengths: name 100, email 254, subject 200, message 5000.
- Submit to a Web3Forms endpoint with the access key read server-side from an environment variable — never in client code. With no key configured, fall back to opening a prefilled `mailto:` rather than failing silently.
- Toast both ways. Success: `Sent. I'll get back to you.` Failure: `That didn't send. Email me directly instead.`
- Disable the button and show a spinner while sending.

### Footer

A faded hairline above, then three parts (stacking centered on mobile):

- **Left:** `Sriram Kancherla` in the heading font with a small straw-hat SVG beside it. Under it, mono and muted: `Final year @ VIT Vellore · ex-FlyRank AI · ex-NUS`
- **Center:** GitHub, LinkedIn, and Mail icon links, muted going accent on hover.
- **Right:** `© 2026 Sriram Kancherla` — compute the year dynamically.

**Easter egg:** the straw hat is a small inline SVG — a wide-brimmed straw hat with a red band — with `title="One Piece is real"`. On hover it tilts ~12° and bobs once. At the end of the hero name intro, the same hat drops in from above and lands at a slight angle on the last letter of "Kancherla" and stays. Small and easy to miss. A detail, not a feature.

### `/resume` route

Same theme, minimal:

- `← Back` link top left.
- Heading `Résumé` with a `Download PDF` button beside it.
- The PDF embedded in a bordered viewer at a comfortable width, filling most of the viewport height.
- On mobile, where inline PDF embedding is unreliable, show a large `Open PDF` button instead of a broken frame.
- Path: `/documents/sriram-kancherla-resume.pdf`

## 3. Voice

Understated, dry, a little nonchalant. Short sentences. No exclamation marks, no emoji, no "passionate about", no "leveraging", no "cutting-edge". Confidence comes from specifics.

Exact strings:

- Empty filter: `Nothing under that one yet. Try another.`
- Form success: `Sent. I'll get back to you.`
- Form failure: `That didn't send. Email me directly instead.`
- Live badge: `LIVE`
- 404 heading `Nothing here.`, body `That page doesn't exist. Here's the way back.`, plus a link home.

## 4. Technical requirements

- **Accessibility:** semantic landmarks, a single `h1`, headings in order, alt text on images, `aria-label` on icon-only links, `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`. Body text must clear 4.5:1 — verify `--muted` on `--bg` and lighten the muted tone if it doesn't. Every motion effect must have a `prefers-reduced-motion` off-switch.
- **Responsive:** 360px, 768px, 1024px, 1440px. No horizontal overflow. 44px minimum tap targets. Respect safe-area insets.
- **Performance:** CSS transitions and IntersectionObserver over an animation library. Throttle `mousemove` handlers with `requestAnimationFrame`. Preconnect the fonts, `font-display: swap`. Lazy-load below the fold. Reserve space for images and the PDF frame.
- **SEO:** title `Sriram Kancherla — ML Engineer & Data Analyst`; description from the hero tagline; Open Graph and Twitter tags; `Person` JSON-LD with name, job title, VIT Vellore affiliation, and `sameAs` to GitHub and LinkedIn.
- **Assets:** certificate and résumé PDFs under `/public/documents/` with exactly the filenames above. Render a link even where a PDF is missing — don't drop the row.
- **Code quality:** all content arrays (projects, certifications, skills, experience) in one data file; all site constants (email, LinkedIn, GitHub, résumé path, credential line) in one constants file.

## 5. What NOT to do

- No light mode, no theme toggle.
- No glassmorphism, no gradient mesh, no neon glow on text, no two-hue gradients.
- No second accent color, no warm tones anywhere.
- No stock photography, no illustrated blobs, no 3D scenes, no particle fields.
- No fake metrics, no invented titles, no testimonials, no "trusted by" logo wall.
- No skill percentage bars or star ratings.
- No autoplaying audio or video.
- No cookie banner, no newsletter popup, no chat widget.

## END OF PROMPT

---
---

## Notes for Sriram — don't paste

**The credential line is in, worded as:** `Final year at VIT Vellore · ex-ML Intern @ FlyRank AI · ex-Academic Intern @ NUS Singapore`. I specified the org names in full white and the connective bits in grey, because a line that long set entirely in grey turns into a smudge nobody reads.

**One timing thing:** your FlyRank internship runs to **26 August 2026** — that's tomorrow. So "ex-" is accurate from Thursday, not today. Nobody will notice, but if you're sending the link to anyone in the next day or so, you may want `ML Intern @ FlyRank AI` for 24 hours. I also rewrote the FlyRank experience entry into past tense to match the "ex-" framing.

**"Final year" checks out** — you're 2023–2027, so 2026–27 is year four.

**On the color:** the gold was the problem, but so was the flatness — a minimal spec with no elevation just reads as unfinished, which is probably what you were reacting to. Part A adds five specific depth techniques. The one that does the most work is the `inset 0 1px 0` top-edge highlight on cards; it costs one line and it's the difference between a dark card looking like an object and looking like a hole.

**Content changes in this version:** new hero tagline, new About heading and body, past-tense FlyRank entry, refreshed section intros, and "currently final year" added to the education card. Project descriptions, metrics, certifications, links, and skills are all unchanged and still verified against your resume.

**Still open from last time:**

- **Phone number** left off deliberately — spam magnet, and it's in the résumé PDF anyway. Say the word.
- **Three certificate PDFs sitting unused** in `public/documents/`: `iitk-dg-business-analytics-excel.pdf`, `iitk-dg-etl.pdf`, `nptel-hci.pdf`. Send me titles, issuers, and dates and I'll add the rows — I won't guess at credential names.
- **GitHub capitalization** is inconsistent between your constants file and your repo URLs. Harmless, but pick one.

**If the blue lands wrong too,** the only lines you need to change are the nine tokens at the top of Part A — everything else derives from them. Tell me and I'll give you a different set.
