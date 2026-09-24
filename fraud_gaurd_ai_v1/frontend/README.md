# FraudGuard AI — Frontend

A React + Vite dashboard for a real-time transaction fraud detection demo.

## Design
- **Look:** dark "control room" instrument panel — deep navy background, amber signal accent for attention, green for safe, red for fraud.
- **Type:** Space Grotesk (headings), Inter (UI text), IBM Plex Mono (data/numbers).
- **Signature element:** the radial `RiskGauge` — a sweeping arc that reads the fraud score, reused on the dashboard and the scan result.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173. Log in with any email/password — it's a demo auth flow.

## Backend

By default the app tries `http://localhost:8000` for these endpoints, and automatically falls back to an on-device mock scorer if none is running, so the UI works standalone:

- `POST /auth/login` → `{ token, user }`
- `POST /score` → `{ id, score, verdict, reasons }`
- `GET /transactions` → `[{ id, amount, merchant, location, timestamp, score, verdict }]`
- `GET /stats` → `{ totalScanned, flagged, review, blockedAmount, avgResponseMs }`

Point it at a real backend by setting `VITE_API_URL` in a `.env` file:

```
VITE_API_URL=https://your-api.example.com
```

## Structure

```
src/
├── components/   # Navbar, Sidebar, StatCard, TransactionForm, FraudResult, TransactionTable, RiskGauge
├── pages/        # Login, Dashboard, FraudDetection, Transactions, Profile
├── services/     # api.js — axios client + mock fallback scoring
├── App.jsx       # routes + auth guard
└── index.css     # design tokens & base styles
```
