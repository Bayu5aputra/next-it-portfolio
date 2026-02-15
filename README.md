# Next-IT Portfolio

Personal portfolio website for **Bayu Saputra**, focused on IT Infrastructure Engineering, Network Operations, and IoT Systems.

## Live Website

- Production: https://portfolio.next-it.my.id/

## Domain Setup

- Main domain: `next-it.my.id` (different website/project)
- Portfolio domain: `portfolio.next-it.my.id` (this project)
- Hosting model:
  - App is deployed on Vercel
  - `portfolio.next-it.my.id` is connected using a cPanel DNS CNAME to Vercel

For SEO and canonical consistency, this repository uses `https://portfolio.next-it.my.id` as its base URL.

## Overview

This project is built on top of the Once UI Magic Portfolio base and customized for infrastructure-focused storytelling:

- Professional profile and work history
- Certifications and badges page
- Project and blog sections powered by MDX
- Interactive homepage typography and splash transition
- SEO-focused metadata, sitemap, robots, RSS, and structured data

## Core Features

- Custom splash intro with smooth page transition
- Variable proximity typography interaction on homepage
- Dedicated pages:
  - Home
  - About
  - Work
  - Blog
  - Badges (Licenses and Certifications)
- Structured SEO setup:
  - Open Graph and Twitter metadata
  - `robots.txt`
  - `sitemap.xml`
  - `manifest.webmanifest`
  - `llms.txt`
  - JSON-LD on key pages

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI: Once UI
- Styling: SCSS Modules + custom CSS
- Content: MDX
- Icons: react-icons
- Analytics: @vercel/analytics

## Project Structure

```txt
src/
  app/                # App Router pages and route handlers
  components/         # UI and feature components
  resources/          # Site content and global config
  types/              # TypeScript types
  utils/              # Utilities
public/
  images/             # Local images and assets
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Run production server

```bash
npm run start
```

## Configuration

- Main site config: `src/resources/once-ui.config.ts`
- Main content data: `src/resources/content.tsx`
- Next config: `next.config.mjs`

## Notes

- Some badge/logo assets are loaded from external sources to reduce repository size.
- If deploying to static-only hosting, server routes (`/api/*`) must be removed or replaced first.

## License

Based on the Magic Portfolio template from Once UI.
Original template license and attribution remain applicable.
