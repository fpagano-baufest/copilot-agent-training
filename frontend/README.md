# Frontend — JWT Auth App

Aplicación web React que consume el backend de autenticación JWT. Incluye una página de login y una página de bienvenida protegida.

## Características

- 🔐 Página de login que llama al endpoint `/token` del backend
- 🔒 Token JWT almacenado en `sessionStorage`
- 🚧 Ruta protegida — la página de bienvenida redirige a `/login` si no hay sesión activa
- 🎨 Diseño oscuro siguiendo el estándar definido en `DESIGN.md` (paleta, tipografía e Inter UI)
- ⚡ Construido con Vite + React

## Requisitos

- Node.js 18+ y npm
- Backend corriendo en `http://localhost:8000` (ver `backend/`)

## Instalación y ejecución local

```bash
# Desde la carpeta frontend/
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

> El servidor de desarrollo Vite actúa como proxy para las rutas `/token`, `/refresh` y `/verify`, por lo que no necesitas configurar CORS manualmente.

## Páginas

### `/login`

Formulario de usuario y contraseña. Al enviar el formulario se realiza un `POST /token` al backend con `Content-Type: application/x-www-form-urlencoded`. Si las credenciales son correctas, el token se guarda en `sessionStorage` y se redirige a `/welcome`.

Credenciales de prueba:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

### `/welcome`

Página de bienvenida protegida. Muestra el nombre de usuario decodificado del token JWT y la hora de expiración. Si el usuario navega a esta ruta sin haber iniciado sesión, es redirigido automáticamente a `/login`. El botón **Cerrar sesión** elimina el token de `sessionStorage` y redirige al login.

## Variables de entorno

| Variable | Por defecto | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | URL base del backend |

Crea un archivo `.env.local` en `frontend/` para sobrescribir los valores:

```env
VITE_API_URL=http://mi-backend.example.com
```

## Construcción para producción

```bash
npm run build
```

Los archivos estáticos se generan en `frontend/dist/`.

## Despliegue con Docker Compose

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

| Servicio | Puerto | URL |
|---|---|---|
| Backend (FastAPI) | 8000 | http://localhost:8000 |
| Frontend (nginx) | 3000 | http://localhost:3000 |

Para detener los contenedores:

```bash
docker-compose down
```

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Redirige a /login si no hay sesión
│   ├── pages/
│   │   ├── Login.jsx            # Página de login
│   │   └── Welcome.jsx          # Página de bienvenida (protegida)
│   ├── services/
│   │   └── auth.js              # Lógica de autenticación y sessionStorage
│   ├── App.jsx                  # Enrutamiento principal
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Tokens de diseño globales
├── Dockerfile                   # Build multi-etapa (Vite → nginx)
├── nginx.conf                   # Configuración nginx para SPA
├── vite.config.js               # Configuración de Vite + proxy dev
└── package.json
```

## Licencia

MIT
