# LuxeHaven — Client

The frontend for **LuxeHaven**, a luxury real-estate listing platform built with React, TypeScript, and Tailwind CSS. Browse, search, and filter high-end properties, view detailed listings, and (once logged in) list and manage your own properties.

> This is the **client** repo. The backend API lives in a separate repo: [server-type-script-project](https://github.com/Salmakhandoker/server-type-script-project).

## Live Demo

- **Live site:** [https://ts-client-side.vercel.app]
- **Demo login:** click **"Auto-Fill Demo Access"** on the [Login page](/login) — it creates/logs into a demo account automatically, no credentials to remember.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Charts | Recharts |
| Auth | better-auth (React client) |
| Icons / Animation | lucide-react, Framer Motion |

## Features

- **Landing page** with hero section and 9 content sections (features, categories, stats, testimonials, etc.)
- **Explore page** — search, filter by type/location/price, sort by price/rating/newest, and paginated results
- **Property details page** — full description, specs, and related listings
- **Auth** — email/password login & registration, with a one-click demo login
- **Add Property** (`/items/add`) — protected, redirects to `/login` if not authenticated
- **Manage Properties** (`/items/manage`) — protected page listing your own listings with view/delete actions
- **Responsive design** across mobile, tablet, and desktop
- **Skeleton loaders** while listings load

## Project Structure

```
src/
├── components/       # Navbar, Footer, PropertyCard, SkeletonCard
├── lib/
│   └── auth-client.ts   # better-auth React client config
├── pages/
│   ├── LandingPage.tsx
│   ├── ExplorePage.tsx
│   ├── DetailsPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── AddPropertyPage.tsx
│   ├── ManagePropertiesPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── App.tsx            # Routes
└── main.tsx            # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- The [backend API](https://github.com/Salmakhandoker/server-type-script-project) running locally or deployed

### Installation

```bash
git clone https://github.com/Salmakhandoker/ts-client-side.git
cd ts-client-side
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

Set this to wherever your backend API is running (locally or your deployed backend URL).

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run preview
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Routes

| Route | Access |
|---|---|
| `/` | Public |
| `/explore` | Public |
| `/properties/:id` | Public |
| `/login`, `/register` | Public |
| `/items/add` | Protected — redirects to `/login` if not authenticated |
| `/items/manage` | Protected — redirects to `/login` if not authenticated |
| `/about`, `/contact` | Public |

## Deployment

This project is configured for [Vercel](https://vercel.com) (see `vercel.json`). Remember to set `VITE_API_URL` as an environment variable in your Vercel project settings, pointing to your deployed backend.