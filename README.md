## Interactive Nexus Scenario Modeling Platform (Frontend)

A modern, responsive decision-support tool designed for policy analysts to visualize trade-offs across the Food-Energy-Water (FEW) Nexus. This frontend allows users to interactively adjust policy levers and instantly view projected outcomes, sustainability indices, and cross-sectoral impacts.

## 🚀 Features

Interactive Scenario Composer: Adjust critical policy levers (Crop Intensity, Renewables, Water Efficiency) via reactive sliders.

Real-time Projections: Instant feedback on sustainability indices using dynamic SVG visualizations.

Scenario Comparator: Split-screen view to compare a "Baseline" against a "Proposed" scenario side-by-side.

Smart Analysis: Automatic detection of critical thresholds (e.g., Water Stress warnings) and "What Changed?" summaries.

Adaptive UI: Fully responsive layout with persistent Dark/Light mode preferences.

Robust Architecture: Built on Nuxt 3 with server-side proxying to handle CORS securely.

## 🛠️ Tech Stack

Framework: Nuxt 3 (Vue 3)

Styling: Tailwind CSS

Icons: Lucide Vue

State Management: Vue Composition API (ref, computed, watch) + useCookie for persistence.

Backend Communication: useFetch with server-side proxy configuration.

## 📦 Installation

Clone the repository

git clone [https://github.com/Aeyooo/Nexus-Project.git](https://github.com/Aeyooo/Nexus-Project.git)
cd Nexus-Project


Install dependencies

npm install
# or
yarn install


Start Development Server

npm run dev


The application will be available at (https://nexus-project-gilt.vercel.app/).

⚙️ Configuration

The project uses nuxt.config.ts to manage the backend connection. We use a server-side proxy to avoid CORS issues when talking to the Python/Flask backend.

nuxt.config.ts:

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  
  // Proxy configuration for CORS bypass
  routeRules: {
    '/proxy/api/**': { 
      proxy: '[https://cpe-2lfo.onrender.com/api/](https://cpe-2lfo.onrender.com/api/)**', 
    }
  },

  // ... tailwind & app config
})
```


## 📂 Project Structure

```
nexus-platform/
├── assets/
│   └── css/
│       └── main.css          # Global styles & transitions
├── components/
│   ├── NexusChart.vue        # SVG Visualization component
│   ├── TeamMarquee.vue       # Animated team section
│   ├── landing/              # Landing page specific sections
│   └── ui/                   # Reusable UI (Cards, Sliders, Badges)
├── composables/
│   └── useNexusModel.ts      # API logic & data transformation
├── pages/
│   ├── index.vue             # Landing Page
│   └── dashboard.vue         # Main Modeling Application
└── nuxt.config.ts            # Project Configuration
```


## 🔌 API Integration

The useNexusModel composable handles all data fetching. It automatically normalizes backend data (0.0-1.0) to frontend percentages (0-100).

Example Usage:

```ts
const { fetchProjections } = useNexusModel()

// Unique key ('scenario-a') prevents state collision between comparison cards
const { data } = await fetchProjections('scenario-a', inputsA)
```


## 🚀 Deployment

Static Generation (Recommended for Vercel/Netlify)

This project is optimized for static hosting.

Generate Static Build:

npm run generate


This creates a .output/public or dist directory.

Deploy to Vercel:

Connect your GitHub repo.

Framework Preset: Nuxt.

Output Directory: .output/public (or dist depending on version).

Important: Ensure your routeRules in nuxt.config.ts are compatible with Vercel's Edge functions for the proxy to work.

## 🤝 Team Group 4

Eze, Joseph Uzochukwu: UX/UI Design & Scenario Composer

Oladipupo Olatunji: Backend Development (Flask/API)

Ayeni Adeola Opeyemi: Data Science & System Dynamics

Ojo Daniel Ayotomiwa: Documentation & QA

Dosunmu Ayomide: Frontend Developer

Olawole Daniel: Backend Developer

## 📄 License

This project is licensed under the MIT License.