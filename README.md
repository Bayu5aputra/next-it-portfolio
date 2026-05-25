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
- **AI Portfolio Co-pilot (Chatbot)**: An interactive assistant docked on the screen to guide visitors and answer professional inquiries about Bayu.
- Structured SEO setup:
  - Open Graph and Twitter metadata
  - `robots.txt`
  - `sitemap.xml`
  - `manifest.webmanifest`
  - `llms.txt`
  - JSON-LD on key pages

---

## AI Portfolio Co-pilot (Chatbot) Features

The website features a custom-built, modern AI Assistant featuring the following capabilities:

### 1. Unified Client SDK Integration
- Refactored backend and upgraded manually written `fetch` calls to the official `@openrouter/sdk` Client SDK.
- Strongly typed parameters satisfy the strict Speakeasy-generated type declarations for absolute stability.

### 2. Dual-Engine Model Selection & Failover Fallback
- Features a premium slide-out configuration drawer in the UI allowing users to choose between:
  - **NVIDIA Nemotron 3 Super (Free)**: A 120B parameter hybrid MoE model via OpenRouter (`nvidia/nemotron-3-super-120b-a12b:free`).
  - **Gemini 2.5 Flash**: A low-latency Google model via direct Google AI Studio API.
- Implements **automatic backend failover fallback**: if OpenRouter encounters rate limits or credit quotas, the backend `/api/chat` route handler gracefully falls back to the direct Gemini API so requests never fail.

### 3. Dynamic Real-Time Scraper Engine
- **Workspace Scraper**: Backend dynamically scans local project files (`src/app/work/projects/*.mdx`) and blog logs (`src/app/blog/posts/*.mdx`) on each request, summarizing titles and categories.
- **GitHub Scraper**: Dynamically queries the public GitHub API for `bayu5aputra`'s top 10 most recently updated public repositories, extracting languages, star counts, and summaries.
- All scraped items are summarized and fed directly into the system context. Tautings dynamically point absolute URLs strictly to the active production domain `https://portfolio.next-it.my.id`.

### 4. Styled Markdown Links & Layout Fixes
- Supports bold, italic, code blocks, and absolute Markdown links `[text](url)` parsed client-side into premium styled anchor tags (`<a>`) opening instantly in a new tab (`target="_blank"`).
- Implements custom flexbox height auto-scaling and `flexShrink: 0` rules on headers/suggest/footers, preventing layout overlap on small screens.
- Utilizes custom `.no-scrollbar` styling in `custom.css` to hide bulky scrollbars while keeping touch/scroll functionality fluid.

### 5. Smart Context-Aware Follow-Up Suggestions
- Suggestions row dynamically morphs context: if the user talks about certifications, it suggests CCNA/MTCNA follow-ups; if about Sinar Mas Land or BAZNAS, it suggests work projects; if about contact channels, it offers email/social follow-ups.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Once UI
- **AI Integrations**: @openrouter/sdk + Google Gen AI REST API
- **Styling**: SCSS Modules + custom CSS
- **Content**: MDX
- **Icons**: react-icons
- **Analytics**: @vercel/analytics

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# OpenRouter API Key (to use NVIDIA Nemotron 3 Super)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Google AI Studio Gemini API Key (as low-latency fallback)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Run production server

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
