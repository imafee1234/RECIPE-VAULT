# Recipe Vault — repaired React starter

## What changed
- Replaced the old global, conflicting styles with a responsive design system.
- Rebuilt the home page, search/explore page, recipe details, add/edit form, and dashboard to share a consistent layout.
- Fixed the malformed `<textarea>` JSX in the original recipe form.
- Added recipe create, edit, and delete workflows, category filtering, favourites, and recipe details.
- Added useful empty states, accessible labels, responsive navigation, and fallback recipe imagery.
- Added sample recipes so the app can be explored immediately.

## Run locally
1. Install Node.js (LTS).
2. In this folder run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000`.

## Data storage limitation
This version saves recipe and favourite data in the current browser's `localStorage`. It is suitable for a single-browser demo and will survive refreshes in that browser, but it is **not** a shared database, user authentication, or cloud sync. Different browsers/devices won't share data. To make it multi-user, connect a backend/database and authentication layer.

## Deployment
This project uses Create React App (`react-scripts`). Build with `npm run build`, then deploy the resulting `build` directory to Vercel. If Vercel is connected to the GitHub repository, commit/push these changes and redeploy.

## Important
The source project did not include a backend or tests for recipe persistence. The code has been reviewed and JSX issues corrected, but a full production build could not be confirmed in this environment because dependency installation timed out. Please run `npm install` and `npm run build` locally before deploying.
