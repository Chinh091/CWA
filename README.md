# Assignment 1 – Next.js App (TypeScript, App Router)

**Delivered files meet the brief**: Header (with student number, hamburger/kebab menu), breadcrumbs, theme toggle, footer with name/student number/date; cookies to remember which menu tab (page) was last opened; About page with a short how‑to video placeholder; Home page has a **Tabs code generator** that outputs **a standalone HTML file** with **inline CSS only (no classes)** and **vanilla JS**.

> AI disclosure: scaffold and parts of implementation assisted by **GPT‑5 Pro** at your request (see comment headers in source files).

## Quick start
```bash
npm i
npm run dev
# or: pnpm i && pnpm dev, or: yarn && yarn dev
```

Open http://localhost:3000

## What to customise
- Search and replace `STUDENT_NUMBER_HERE` with your real student number.
- Update `YOUR_NAME_HERE` in Footer/About (I set it to "Chinh Cong Phan" by default).
- Replace the video on **About** with your actual 3–8 minute walkthrough.
- Commit weekly to satisfy the GitHub evidence requirement.

## Where the key bits live
- Header/Menu/Theme/Breadcrumbs: `components/Header.tsx`, `components/ThemeToggle.tsx`, `components/Breadcrumbs.tsx`
- Cookie persistence (last menu page): `components/Header.tsx` + `lib/cookies-client.ts`
- Tabs generator (Home): `components/TabsGenerator.tsx` – emits an **entire HTML document** with inline styles only.
- Footer with date/name/student number: `components/Footer.tsx`

## Why this meets the brief
- **Next.js + TypeScript + App Router** structure under `/app`.
- **Student number** is shown top-left in the header on every page.
- **Accessibility**: semantic HTML, keyboardable menu, WAI‑ARIA for tabs, focus management.
- **Cookies**: remember which menu tab/page was last opened (restored in the header as a “Resume last page” link).
- **Video + About page** included.
- **Copy/Download** for generated `Hello.html` snippet.

## License
For educational assessment use.
