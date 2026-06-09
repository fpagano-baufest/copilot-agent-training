# AI in Development - Copilot Agent Training

Aplicación de ejemplo con autenticación JWT:

- `backend/`: API FastAPI con endpoint de login (`POST /token`).
- `frontend/`: app React con pantalla de login y pantalla de bienvenida protegida.

## Requisitos

- Python 3.10+
- Node.js 20+

## Ejecución del backend

```bash
cd /home/runner/work/copilot-agent-training/copilot-agent-training/fpagano-baufest/copilot-agent-training/backend
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart bcrypt==4.0.1
uvicorn main:app --reload
```

Backend disponible en `http://localhost:8000`.

Credenciales de prueba:

- Usuario: `admin`
- Contraseña: `admin123`

## Ejecución del frontend

```bash
cd /home/runner/work/copilot-agent-training/copilot-agent-training/fpagano-baufest/copilot-agent-training/frontend
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`.

Variables opcionales:

- `VITE_API_URL`: URL base del backend (por defecto `http://localhost:8000`).

## Flujo de uso

1. Abrir el frontend.
2. Iniciar sesión con las credenciales.
3. El token se guarda en `sessionStorage`.
4. La ruta `/welcome` está protegida y redirige a `/login` si no hay sesión.

## Diseño aplicado

El frontend sigue el estándar de `design.md`:

- Canvas crema `#faf9f5`
- Primario coral `#cc785c`
- Textos en tonos `ink/body`
- Inputs y botones con bordes redondeados (8px)

## Licencia

MIT
