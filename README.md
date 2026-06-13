# Carbon Twin AI™ 🌍✨

Carbon Twin AI is a modern web simulator that creates a personalized "digital twin" representing your annual carbon footprint. It helps users analyze their environmental impact, run real-time habit simulations in a sandbox environment, chat with an AI Carbon Coach, and explore physical Earth consequences.

## Key Features

- **Personalized Digital Twin**: Evaluates your diet, transit, home energy, travel, and shopping patterns to calculate your annual carbon footprint in CO2e tonnes.
- **Carbon Aura Assignment**: Assigns a deterministic Carbon Aura (Green, Emerald, Sapphire, Amber, or Crimson) based on scientific thresholds (e.g., Paris Agreement target vs. global and regional averages).
- **Habit Sandbox**: Interact with toggles and sliders to simulate shifting habits (e.g., eating plant-based, installing solar panels, commuting by electric vehicle) and watch your twin's score and aura react in real-time.
- **AI Carbon Coach**: A direct conversational agent powered by Google Gemini, giving customized, context-aware suggestions for your unique habit profile.
- **Earth Consequences**: Translates abstract carbon numbers into physical, real-world metrics like square meters of Arctic ice melted, tree-years of absorption required, or equivalents in transatlantic flights.
- **Accessibility First**: Fully WCAG 2.2 AA compliant, featuring keyboard-friendly controls, programmatically managed focus transitions, and semantic landmarks.
- **Production-Hardened**: Incorporates security headers (CSP, frame options), automated API rate limiting, and achieves a **100/100 React Doctor health score**.

## Tech Stack

- **Core**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (respecting `prefers-reduced-motion` settings)
- **AI Integration**: Google Gemini SDK (`@google/generative-ai`)
- **State Management**: Zustand (with local persistence)
- **Testing & Quality**: Vitest, React Doctor, ESLint

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- Google Gemini API Key (obtain from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maheshmm7/Carbon-Twin.git
   cd Carbon-Twin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and add your Google Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and replace the placeholder value:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Commands

- **Build**: `npm run build` (builds the optimized Next.js production bundle)
- **Lint**: `npm run lint` (runs ESLint checks)
- **Tests**: `npx vitest run` (runs the test suite)
- **Type Check**: `npx tsc --noEmit` (runs TypeScript compiler without outputting files)
- **React Doctor**: `npx react-doctor` (scans for performance, security, and rendering issues)

## Security & Rate Limiting

- **Rate Limiter**: The backend API endpoints (`/api/generate-twin` and `/api/carbon-coach`) are rate-limited per IP in memory to prevent abuse. Too many requests will return a `429 Too Many Requests` status code with rate-limit headers.
- **Security Headers**: Includes Content Security Policy (CSP), clickjacking protection (`X-Frame-Options: DENY`), mime sniffing protection (`X-Content-Type-Options: nosniff`), and feature policies.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
