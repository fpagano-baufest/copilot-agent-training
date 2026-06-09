# AI in Development - Copilot Agent Training

## Session 01

Repositorio de laboratorio sobre GitHub Copilot y Cloud Agent.

## Estructura del proyecto

```
.
├── backend/          # API FastAPI con autenticación JWT
├── frontend/         # Aplicación React (login + bienvenida)
├── testing/          # Pruebas adicionales
├── docker-compose.yml
└── DESIGN.md         # Estándar de diseño
```

## Inicio rápido con Docker Compose

```bash
docker-compose up -d
```

| Servicio | Puerto | URL |
|---|---|---|
| Backend (FastAPI) | 8000 | http://localhost:8000 |
| Frontend (React/nginx) | 3000 | http://localhost:3000 |

Credenciales de prueba: usuario `admin` / contraseña `admin123`.

Consulta los READMEs específicos de cada componente para más detalles:

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## Licencia

MIT
