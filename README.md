# Hypnosis Journey

A modern, professional rebuild of [hypnosisjourney.org](https://hypnosisjourney.org/) — a
hypnotherapy practice helping clients transform their lives through the power of the mind.

## Overview

A fast, responsive, dependency-free single-page website with a calm, professional aesthetic
suited to a wellness practice. No build step required — it's plain HTML, CSS, and vanilla JS.

## Sections

- **Hero** — headline, calls to action, and trust signals
- **Philosophy** — the practice's approach (relaxation, guided imagery, positive affirmation)
- **Services** — Individual Hypnotherapy, Group Workshops, Corporate Programs
- **About** — who they are and how they work
- **Testimonials** — real client stories
- **Contact** — enquiry form with client-side validation

## Structure

```
index.html        Markup and content
css/styles.css    Design system + all styling
js/main.js        Sticky header, mobile nav, scroll reveals, form validation
```

## Running locally

It's a static site, so open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Design notes

- **Type:** Fraunces (display) + Inter (body), loaded from Google Fonts
- **Palette:** calming indigo/violet with a teal accent
- **Accessibility:** skip link, keyboard-friendly nav, visible focus states,
  reduced-motion support, semantic landmarks
- **Performance:** no frameworks, no images (decorative visuals are CSS/SVG)

## Wiring up the contact form

The form currently validates on the client and confirms receipt. To actually send
enquiries, replace the marked block in `js/main.js` with a `fetch()` to your form
endpoint (e.g. Formspree, Netlify Forms, or your own handler).
