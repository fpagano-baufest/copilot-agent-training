import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const EXPIRES_AT_KEY = 'auth_expires_at'
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(EXPIRES_AT_KEY)
}

function getSessionExpiration() {
  const expiresAt = Number(sessionStorage.getItem(EXPIRES_AT_KEY))
  return Number.isFinite(expiresAt) ? expiresAt : null
}

function hasValidSession() {
  const token = sessionStorage.getItem(TOKEN_KEY)
  const expiresAt = getSessionExpiration()

  return Boolean(token) && expiresAt !== null && expiresAt > Date.now()
}

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasValidSession()) {
      navigate('/welcome', { replace: true })
      return
    }

    clearSession()
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos')
      }

      const data = await response.json()
      const expiresAt = Date.now() + Number(data.expires_in) * 1000

      if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        throw new Error('No se pudo iniciar la sesión')
      }

      sessionStorage.setItem(TOKEN_KEY, data.access_token)
      sessionStorage.setItem(USER_KEY, username)
      sessionStorage.setItem(EXPIRES_AT_KEY, String(expiresAt))
      navigate('/welcome', { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        <p>Accede con tus credenciales para ingresar al sistema.</p>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="error">{error}</p> : null}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  )
}

function WelcomePage() {
  const navigate = useNavigate()
  const username = sessionStorage.getItem(USER_KEY) ?? 'usuario'
  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <main className="page">
      <section className="welcome-card">
        <h1>Bienvenido</h1>
        <p>Hola, {username}. Tu sesión está activa.</p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  )
}

function ProtectedRoute({ children }) {
  const [expiresAt] = useState(() => getSessionExpiration())
  const [isAuthorized, setIsAuthorized] = useState(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    return Boolean(token) && expiresAt !== null && expiresAt > Date.now()
  })

  useEffect(() => {
    if (!isAuthorized || expiresAt === null) {
      clearSession()
      return
    }

    const timeoutId = window.setTimeout(() => {
      clearSession()
      setIsAuthorized(false)
    }, expiresAt - Date.now())

    return () => window.clearTimeout(timeoutId)
  }, [expiresAt, isAuthorized])

  if (!isAuthorized) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/welcome"
          element={(
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
