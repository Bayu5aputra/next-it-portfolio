# Next-IT Portfolio: Bayu Saputra

A cutting-edge portfolio for an **IT Infrastructure Engineer**, redesigned by **Bayu Saputra**.

This project is a unique fusion of two distinct UI philosophies: the **Magic Portfolio** structural template merged with the immersive **Chronark** introduction animation. It features custom-built interactive typography and a high-performance, minimalist aesthetic tailored for showcasing infrastructure and engineering expertise.

![Next-IT Portfolio](public/images/og/home.jpg)

## 🚀 Key Features

### 1. The "Chronark" Splash Screen
A seamless port of the iconic Chronark introduction animation.
- **Particle System:** Canvas-based particle rendering.
- **Dynamic Routing:** Splash screen titles change dynamically based on the current page (e.g., "About", "Work").
- **Smart Transition:** Smooth fade-out sequence that perfectly synchronizes with the main content reveal.

### 2. Interactive Typography
Custom-engineered text animations that react to user interaction:
- **True Focus (Header):** A "flashlight" effect applied to the Location and Time display. Moving your mouse reveals sharp text through a blur filter using CSS masking.
- **Variable Proximity (Home):** A sophisticated font-weight interpolation effect applied to the Headline and Subline. Characters swell and bold individually as the cursor approaches, creating a fluid, wave-like interaction without disrupting layout.

### 3. IT Infrastructure Branding
- **Content:** Tailored specifically for High Availability Networks, IoT Integration, and Hybrid Monitoring Systems.
- **Aesthetics:** Clean, dark-mode centric design with "cyber-physical" vibes suitable for an engineer dealing with sensors and fiber optics.
- **Hidden Scrollbar:** Global CSS override to maintain a sleek, app-like feel (`::-webkit-scrollbar { display: none }`).

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **UI System:** [Once UI](https://once-ui.com)
- **Styling:** SCSS Modules & Custom CSS Variables
- **Animations:** Canvas API (Particles) & Native React Hooks (`requestAnimationFrame`)

## 🏁 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/Bayu5aputra/next-it-portfolio.git
```

**2. Install dependencies**
```bash
npm install
```

**3. Run development server**
```bash
npm run dev
```

## 📂 Customization

- **Config:** Edit `src/resources/once-ui.config.ts` for global settings.
- **Content:** Edit `src/resources/content.tsx` to update bio, experience, and skills.
- **Animations:**
  - `src/components/Splash`: Chronark intro logic.
  - `src/components/TrueFocus.tsx`: Flashlight blur effect.
  - `src/components/VariableProximity.tsx`: Font weight interaction.

## 📄 License

Based on the [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template by Once UI.
Distributed under the **CC BY-NC 4.0 License**.

---
*Redesigned by Bayu Saputra*