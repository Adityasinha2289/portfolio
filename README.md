# Aditya Sinha · Portfolio

Personal website of **Aditya Sinha**, founder of [RenoCred](https://renocred.com), an AI-powered credit card and financial intelligence platform that tells you which card to swipe for every spend.

The site is a horizontal, panel-based experience: each section fills one screen and you move between them by scrolling, swiping or using the arrow keys.

## Sections

| # | Panel | What it covers |
|---|-------|----------------|
| 01 | Intro | Who I am and what I'm building |
| 02 | RenoCred | The product, how it works, 536+ cards in the dataset |
| 03 | The founder's job | Product, engineering, financial intelligence, business and growth |
| 04 | Milestones | Entrepreneurship Bootcamp by Bennett University × HED: top 15 of 200 teams |
| 05 | Work | Selected projects: Hate Speech Detector, NEXGram, ExtractFlow, UniAssist, Bennett Connect |
| 06 | Experience | Roles and education |
| 07 | Skills | Build, Intelligence and Business capabilities, each linked to evidence |
| 08 | Contact | Email and links |

## Tech

Plain HTML, CSS and JavaScript in a single `index.html`. No framework, no build step, no dependencies. Fonts come from Google Fonts (Archivo, Schibsted Grotesk, IBM Plex Mono).

- Native CSS scroll-snap for the horizontal track, so touch and trackpad swipes feel natural
- Mouse-wheel scrolling mapped to one panel per gesture; tall panels scroll vertically first
- Keyboard navigation (← → / PageUp / PageDown / Home / End), deep links (`#renocred`, `#milestones`, …) and a mobile menu
- Respects `prefers-reduced-motion`

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

Hosted on [Vercel](https://vercel.com) as a static site. Every push to `main` redeploys.

## Updating the bootcamp milestone

The milestone lives in the `<!-- 4. MILESTONES -->` block of `index.html`:

- Add facts as extra `<div><dt>Label</dt><dd>Value</dd></div>` rows inside `.mile-facts`.
- When the investor pitch happens, change `data-status="upcoming"` to `data-status="done"` on that step and update its text.

## Contact

- Email: adityasinha2598@gmail.com
- LinkedIn: [aditya-sinha2289](https://www.linkedin.com/in/aditya-sinha2289/)
- GitHub: [Adityasinha2289](https://github.com/Adityasinha2289)

© 2026 Aditya Sinha
