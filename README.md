# Kigoma Results Portal: frontend (React + Vite)

## Run it
    npm install
    npm run dev        # opens at http://localhost:5173

Demo logins (password `demo1234`): `region`, `kasulu`, `lakeview`, `teacher`.
Public results page: /results (try registration number S0101/0001).

## What is included
- Login with 4 roles (regional admin, council admin, school admin, teacher)
- Role-based menu and data scope (a council admin only sees their council)
- Dashboard: pass rate, GPA, divisions, girls vs boys, school ranking
- Schools list with search and filters
- Students list with filters, pagination and a register-student form
- Marks entry: validation (max 100), absent flag, Enter-to-next, CSV import
- Public results search and printable result slip

## Connecting your PHP + MySQL backend
1. Every backend call is in `src/api/client.js`. Replace each demo function body
   with the `request()` call shown in its comment.
2. `vite.config.js` proxies `/api` to `http://localhost:8000` (run PHP with
   `php -S localhost:8000`). For production, set `VITE_API_URL`.
3. Grading rules live in `src/utils/grading.js`. They are PLACEHOLDERS: confirm
   the official rules and later load them from a settings table.
4. Do the real login, role checks and marks validation on the PHP side too.
   The frontend checks are only for convenience, never for security.

## Folder map
    src/api/        backend calls (demo data for now)
    src/components/ Layout, Modal, Bars chart, route guard
    src/context/    login state
    src/data/       demo data (delete when API is ready)
    src/pages/      one file per screen
    src/utils/      grading rules, role scope
# kigoma_results
