## Auth + Simple Buyer Portal (Favourites) — Frontend

Production-style frontend for the take-home assignment:
**Auth + Simple Buyer Portal (Favourites)**.

### Tech stack
- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Context API auth state
- `react-hot-toast` notifications
- `framer-motion` restrained animations

### Backend contract (must be running)
- Base URL: `http://localhost:9004/api`
- Auth: `Authorization: Bearer <token>`

### Installation

From the repo root:

```bash
cd client
npm install
```

### Run (dev)

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal.

### Build

```bash
cd client
npm run build
```

### Example user flow
1. Register
2. Auto-redirect to Dashboard
3. Add/remove favourites from the property grid
4. View your favourites in the Favourites page
5. Open a property detail page and toggle favourite

### Project structure (client)
See `src/` for modular API, context, components, layouts, pages, and routes.
