# FastAPI JWT Authentication Backend

Backend API desarrollado con FastAPI que implementa autenticación JWT (JSON Web Tokens).

## Características

- 🔐 Autenticación JWT con tokens de 300 segundos de expiración
- 🔄 Endpoint para refrescar tokens
- 🐳 Dockerizado con Docker y Docker Compose
- 📦 Gestión de dependencias con Poetry
- 🚀 API RESTful con FastAPI
- 📝 Documentación automática con Swagger UI

## Requisitos

- Python 3.10+
- Poetry
- Docker y Docker Compose (para despliegue con contenedores)

## Instalación

### Opción 1: Instalación Local con Poetry

1. Instalar dependencias:
```bash
cd backend
poetry install
```

2. Ejecutar la aplicación:
```bash
poetry run uvicorn main:app --reload
```

La aplicación estará disponible en: `http://localhost:8000`

### Opción 2: Despliegue con Docker

1. Desde la raíz del proyecto, ejecutar:
```bash
docker-compose up -d
```

La aplicación estará disponible en: `http://localhost:8000`

2. Para detener los contenedores:
```bash
docker-compose down
```

## Endpoints

### 1. Root Endpoint
- **URL**: `/`
- **Método**: GET
- **Descripción**: Información general de la API

**Ejemplo:**
```bash
curl http://localhost:8000/
```

### 2. Login (Obtener Token)
- **URL**: `/token`
- **Método**: POST
- **Descripción**: Autentica un usuario y devuelve un JWT token
- **Credenciales**:
  - Usuario: `admin`
  - Contraseña: `admin123`

**Ejemplo con curl:**
```bash
curl -X POST "http://localhost:8000/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 3. Refresh Token
- **URL**: `/refresh`
- **Método**: POST
- **Descripción**: Refresca un token válido y devuelve uno nuevo
- **Autenticación**: Bearer Token requerido

**Ejemplo con curl:**
```bash
TOKEN="your-token-here"
curl -X POST "http://localhost:8000/refresh" \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 4. Verify Token
- **URL**: `/verify`
- **Método**: GET
- **Descripción**: Verifica si un token es válido
- **Autenticación**: Bearer Token requerido

**Ejemplo con curl:**
```bash
TOKEN="your-token-here"
curl -X GET "http://localhost:8000/verify" \
  -H "Authorization: Bearer $TOKEN"
```

**Respuesta:**
```json
{
  "message": "Token is valid",
  "user": "admin"
}
```

## Documentación Interactiva

FastAPI proporciona documentación interactiva automática:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Puedes probar todos los endpoints directamente desde estas interfaces.

## Flujo de Autenticación

1. **Login**: Enviar credenciales a `/token` para obtener un JWT token
2. **Uso del Token**: Incluir el token en el header `Authorization: Bearer <token>` en las peticiones protegidas
3. **Refresh**: Antes de que expire el token (300 segundos), usar `/refresh` para obtener un nuevo token
4. **Verificación**: Usar `/verify` para validar que el token es válido

## Estructura del Proyecto

```
backend/
├── main.py              # Aplicación FastAPI principal
├── pyproject.toml       # Configuración de Poetry y dependencias
├── Dockerfile           # Archivo Docker para construir la imagen
└── README.md            # Este archivo
```

## Seguridad

⚠️ **Importante**: Este es un proyecto de demostración. Para producción:

1. **Configurar SECRET_KEY**: Establecer la variable de entorno `SECRET_KEY` con una clave segura y aleatoria
   ```bash
   export SECRET_KEY="tu-clave-secreta-muy-larga-y-aleatoria"
   ```
   O en docker-compose.yml actualizar el valor de `SECRET_KEY`
2. Implementar una base de datos real en lugar del diccionario mock
3. Añadir rate limiting para prevenir ataques de fuerza bruta
4. Usar HTTPS en producción
5. Implementar refresh tokens con almacenamiento persistente
6. Considerar usar tokens de acceso de corta duración y refresh tokens de larga duración

## Tecnologías Utilizadas

- **FastAPI**: Framework web moderno y rápido para construir APIs
- **Python-JOSE**: Implementación de JWT en Python
- **Passlib**: Biblioteca para hashing de contraseñas
- **Uvicorn**: Servidor ASGI para ejecutar la aplicación
- **Poetry**: Gestor de dependencias y empaquetado
- **Docker**: Containerización de la aplicación

## Desarrollo

### Ejecutar en modo desarrollo:
```bash
poetry run uvicorn main:app --reload
```

### Ejecutar tests:
```bash
poetry run pytest
```

## Licencia

MIT
