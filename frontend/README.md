# Frontend React

Frontend en React para autenticación contra el backend FastAPI.

## Ejecutar

```bash
cd /home/runner/work/copilot-agent-training/copilot-agent-training/fpagano-baufest/copilot-agent-training/frontend
npm install
npm run dev
```

## Configuración

- `VITE_API_URL`: URL del backend (por defecto `http://localhost:8000`).

## Pantallas

- `/login`: solicita usuario y contraseña, invoca `POST /token` y guarda el JWT en `sessionStorage`.
- `/welcome`: página protegida, solo accesible con sesión iniciada.
