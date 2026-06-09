import { useNavigate } from 'react-router-dom';
import { logout, getToken, decodeToken } from '../services/auth';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '64px',
    backgroundColor: 'var(--color-canvas)',
    borderBottom: '1px solid var(--color-hairline)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-xxl)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navLogo: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    letterSpacing: '-0.3px',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  },
  navUser: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    fontWeight: 500,
  },
  logoutButton: {
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-md)',
    padding: '8px 16px',
    height: '36px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-section) var(--spacing-xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '500px',
    background: 'radial-gradient(ellipse at top, var(--color-accent-orange-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-body)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-full)',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 400,
    marginBottom: 'var(--spacing-xl)',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: 'var(--rounded-full)',
    backgroundColor: 'var(--color-accent-green)',
    flexShrink: 0,
  },
  heading: {
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-1.5px',
    color: 'var(--color-ink)',
    marginBottom: 'var(--spacing-xl)',
  },
  headingSpan: {
    color: 'var(--color-primary)',
  },
  description: {
    fontSize: '18px',
    fontWeight: 400,
    color: 'var(--color-body)',
    lineHeight: 1.5,
    marginBottom: 'var(--spacing-xxxl)',
  },
  card: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-charcoal)',
    marginBottom: 'var(--spacing-md)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardValue: {
    fontSize: '14px',
    color: 'var(--color-body)',
    fontFamily: '"Geist Mono", "Fira Code", monospace',
    wordBreak: 'break-all',
    lineHeight: 1.6,
  },
};

export default function Welcome() {
  const navigate = useNavigate();

  const token = getToken();
  const payload = token ? decodeToken(token) : null;
  const username = payload?.sub || 'usuario';
  const expiresAt = payload?.exp
    ? new Date(payload.exp * 1000).toLocaleTimeString()
    : '—';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navLogo}>JWT Auth App</span>
        <div style={styles.navActions}>
          <span style={styles.navUser}>{username}</span>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.glow} aria-hidden="true" />
        <div style={styles.content}>
          <div style={styles.badge}>
            <span style={styles.statusDot} aria-hidden="true" />
            Sesión activa
          </div>

          <h1 style={styles.heading}>
            ¡Bienvenido,{' '}
            <span style={styles.headingSpan}>{username}</span>!
          </h1>

          <p style={styles.description}>
            Has iniciado sesión correctamente. Tu token JWT está almacenado en la sesión del navegador.
          </p>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Token expira a las</p>
            <p style={styles.cardValue}>{expiresAt}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
