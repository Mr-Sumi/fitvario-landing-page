# Design brief

Branch `seo-design`. Written before any design change. Everything here is a decision, not a mood board.

## Who it is for

A gym owner in an Indian city or town, often also the person at the desk. Reads on an Android phone, often on mobile data, between sessions. Compares three or four tools. Does not read brochure copy; looks for the answer to "what will this do on Monday morning, and what will it cost me".

Second reader: a franchise owner or a manager who opens the site on a laptop to check details before a call.

## Positioning

Fitvario is plain, working software for running a gym in India: members, fees, attendance, enquiries. The site should feel like a competent person at the next gym explaining how they run theirs. Not a startup launch page.

Three things we say with the design, in this order:

1. **It is real.** The real product, shown in real screens, with real rupee amounts and real WhatsApp messages. No stock photos, no invented customers, no fake ratings.
2. **It is specific.** Every line names the task: "Renewal reminder goes out 3 days before expiry", not "powerful automation".
3. **It is honest about limits.** Where Fitvario does not do something, the page says so.

## Palette

Taken from the app (`AppColors` in the Flutter app) and its current icon, not from the old blue logo.

| Token | Value | Use |
|---|---|---|
| `ink` | `#192126` | Text, header, footer, dark sections. The app's `primaryDark`. |
| `lime` | `#BBF246` | The one accent. Buttons, highlights, markers. The app's `primaryLime`. |
| `lime-deep` | `#4D7C0F` | Lime as text or a link on white (5.2:1). Lime itself never carries text on white. |
| `paper` | `#FAFAF6` | Page background, a warm off-white. |
| `white` | `#FFFFFF` | Cards and form fields. |
| `line` | `#E3E5DE` | Borders and rules. |
| `mute` | `#4B555B` | Secondary text (7.9:1 on paper). |
| `signal` | `#B42318` | Errors only. |

Rules: one accent. Lime appears as a solid fill with ink text on it, never as thin lime text. No gradients. No second brand colour. WhatsApp green appears only on WhatsApp buttons and WhatsApp message previews, because that is the real colour of that product.

## Type

One deliberate pairing:

- **Display: Bricolage Grotesque** (600 and 700). Used for H1, H2 and large numbers. It has a slightly uneven, human shape that stops headings looking like default sans-serif.
- **Text and UI: Instrument Sans** (400, 500, 600). Used for everything else. Clear at small sizes on low-end Android screens, and it supports tabular figures for rupee amounts.

Both are self-hosted by `next/font`, `display: swap`, only the weights listed, Latin subset. Nothing else.

Scale (mobile / desktop): H1 `2.25rem / 3.5rem`, H2 `1.75rem / 2.5rem`, H3 `1.25rem`, body `1.0625rem` at 1.65 line height, small `0.875rem`. Headings use tight line height (1.08 to 1.15) and slight negative tracking; body uses none. Maximum line length 68 characters.

## Spacing, radius, shadow

- **Spacing scale (rem):** 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4.5, 7. Sections use 4.5 on mobile and 7 on desktop; nothing else.
- **One radius:** 8 px for buttons, inputs, cards, frames. Pills are not used. Phone frames use 28 px because that is the shape of a phone.
- **One shadow:** `0 1px 0 rgb(25 33 38 / 0.05), 0 12px 28px -16px rgb(25 33 38 / 0.35)`, used only on screenshot frames and the sticky header. Cards use a 1 px `line` border and no shadow.

## Buttons and links

- **Primary:** lime fill, ink text, 600 weight, 48 px high, 8 px radius. Hover darkens the lime by 8 percent. Used for "Book a free demo".
- **Secondary:** transparent, 1 px ink border, ink text. Used for "Chat on WhatsApp" (with a WhatsApp-green dot) and quiet alternatives.
- **Text link:** ink text, underlined with a 1 px `lime-deep` line, 3 px offset. No colour change on hover, the underline thickens.
- **Focus:** 3 px ink outline with 2 px offset, always visible.
- Tap targets are 44 px or more on mobile.

## Layout

- Grid based: 12 columns on desktop, content column 68 characters. Left-aligned by default. Centre alignment only for a single short statement.
- Asymmetric sections: text column and a wider screenshot column; the proportions alternate.
- Varied rhythm: a dark ink section, a ruled list, a table, a two-column explainer and a single large number each appear at least once on the home page.
- Generous whitespace between sections; tight inside a section.
- The home hero leads with product UI in a frame (a phone and a desktop window), beside the headline, not under a centred slogan.
- Motion: none beyond a 150 ms colour and underline transition. Respects `prefers-reduced-motion`. No scroll-triggered animation.

## Product imagery rules

- Real screenshots only, from a demo gym with invented data. Until they exist, a `ScreenshotFrame` renders a neutral block marked `data-placeholder`.
- A launch check fails if any placeholder is still on an indexable page, so nothing ships with one.
- Never draw a mockup of a screen that has not been seen.
- Screenshots are exported as WebP or AVIF with explicit width and height, `next/image`, meaningful alt text. Only the first (LCP) image is preloaded.

## What we avoid

- Purple or blue gradient heroes, any gradient background, glassmorphism and blurred glass panels.
- Floating blob shapes, grid-line backgrounds, glow effects.
- The identical icon-in-a-circle card repeated three across.
- Bento grids as a default layout.
- Everything centred.
- Vague hype words: revolutionize, seamless, unlock, supercharge, all-in-one, cutting-edge, game-changing, next-level, empower.
- Fake logos, star ratings, user counts, "trusted by" strips, team or client photos, stock photos, emoji as icons.
- Uppercase letter-spaced eyebrow labels above every heading.

## Copy rules

- Name the task and the number: "7, 3 and 1 days before expiry", "₹3,000 plan, 18% tax, ₹1,540 due".
- Short sentences. Owner to owner. No second-person flattery.
- Every verified claim, title, H1, meta description, FAQ, internal link and structured-data field stays as it is.
- A claim is only added if its flag is live in `feature-status.json`.

## Performance targets

Lighthouse mobile performance 95 or more, accessibility 100, LCP at or under 2.5 s on home, pricing, a feature page, a tool and a blog post. Two font families only, no new runtime dependencies, no client JavaScript added for layout.

## Result (2026-10-11)

Lighthouse mobile on home, pricing, features, a feature page, a tool, a blog post, Hinglish hub and contact: performance 95 to 97, accessibility 100, best practices 100, SEO 100, CLS 0. Simulated LCP 2.6 to 2.9 s (target 2.5 s not met in simulation; observed LCP about 0.2 s).

## Out of scope for this pass

Hinglish and comparison pages inherit the shared components and tokens but are not individually redesigned. Real screenshots arrive from the owner; wiring them in is a follow-up.
