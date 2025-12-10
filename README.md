## Periodic Table Explorer

An immersive periodic table built with Next.js (App Router + Tailwind) on the front end and an Express + TypeScript microservice for element and isotope data. Each element tile opens a richly animated modal with Bohr shell visualisations, isotope descriptions, and a playful "quantum arena" that highlights protons, neutrons, electrons, quarks, and positrons.

### Features

- Vibrant periodic table grid with category-driven gradients and responsive layout.
- Express API (`/api/elements`) supplying curated element/isotope metadata.
- Animated 2D Bohr model showcasing shell occupancy per isotope.
- 3D-inspired quantum view with orbiting electrons, pulsing nuclei, and drifting quark/positron clouds.
- Rich isotope narratives, half-life highlights, and quick statistical summaries.

### Prerequisites

- Node.js 18+ (the project uses Next.js 16).

### Installation

```bash
npm install
```

### Running the project

Start the Express backend (port 4000):

```bash
npm run server:dev
```

In a separate terminal, launch the Next.js frontend (port 3000):

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) and click any element tile to explore its isotopes. The frontend expects the API at `http://localhost:4000`; override with `NEXT_PUBLIC_API_BASE_URL` if you host the backend elsewhere.

### Project structure

- `src/app` – App Router layout and landing page.
- `src/components` – Interactive periodic table and modal UI.
- `src/lib` – API client helpers for the Express service.
- `src/types` – Shared TypeScript contracts for chemistry data.
- `server` – Express + TypeScript backend exposing element/isotope endpoints.

### Available scripts

- `npm run dev` – Next.js development server.
- `npm run build` – Production build for the frontend.
- `npm run start` – Run the built Next.js app.
- `npm run lint` – ESLint checks.
- `npm run server:dev` – Express backend with live reload via `tsx`.

### Next steps

- Add search, filters, or category toggles to help find elements quickly.
- Persist visitor selections or isotope bookmarks via a lightweight database layer.
- Introduce testing (React Testing Library, Vitest) for components and API contracts.
