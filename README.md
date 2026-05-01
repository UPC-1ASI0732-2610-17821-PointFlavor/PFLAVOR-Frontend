# PuntoSabor (Vue + Vite, DDD-inspirado)

## Scripts
- `npm run dev` — arranca el frontend en http://localhost:5173
- `npm run api` — levanta json-server en http://localhost:3001

## Estructura
- `auth/` (login, register, role-select)
- `discovery/` (categorías, resultados, mapa)
- `promotions/`, `reviews/`, `memberships/`, `contact/`
- `shared/` (infra transversal y vistas comunes)

## Flujo
1. Ir a **/auth** para “loguearse” (usa email de `server/db.json` o regístrate).
2. Seleccionar rol en **/role**.
3. Explorar **/categories**, ver **/results?q=Pollo**, **/map**, **/promos**, **/plans**, **/contact**.
