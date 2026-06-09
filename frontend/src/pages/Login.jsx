import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '400px',
    background: 'radial-gradient(ellipse at top, var(--color-accent-blue-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    marginBottom: 'var(--spacing-xxl)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '-0.4px',
    color: 'var(--color-ink)',
    lineHeight: 1.5,
    marginBottom: 'var(--spacing-sm)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-mute)',
    lineHeight: 1.43,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-body)',
    lineHeight: 1.43,
  },
  input: {
    backgroundColor: 'var(--color-surface-card)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-md)',
    padding: '10px 14px',
    height: '40px',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s',
    width: '100%',
  },
  inputFocus: {
    borderColor: 'var(--color-ink)',
  },
  errorBox: {
    backgroundColor: 'rgba(255, 32, 71, 0.08)',
    border: '1px solid rgba(255, 32, 71, 0.3)',
    borderRadius: 'var(--rounded-md)',
    padding: '10px 14px',
    fontSize: '14px',
    color: 'var(--color-accent-red)',
    lineHeight: 1.43,
  },
  button: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-on)',
    border: 'none',
    borderRadius: 'var(--rounded-md)',
    padding: '8px 16px',
    height: '36px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    width: '100%',
    marginTop: 'var(--spacing-sm)',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/welcome');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.glow} aria-hidden="true" />
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Iniciar sesión</h1>
          <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div style={styles.fieldGroup}>
            <label htmlFor="username" style={styles.label}>
              Usuario
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                ...(focusedField === 'username' ? styles.inputFocus : {}),
              }}
              placeholder="admin"
              disabled={loading}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {}),
              }}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && <div role="alert" style={styles.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
