import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth.ts';

interface LoginPageProps {
  onSwitchToSignup: () => void;
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup, onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) { setError('All fields required'); return; }
    setLoading(true); setError('');
    const ok = await login(email, password);
    if (ok) {
      onLoginSuccess?.();
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgGrid} />
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#238636" />
              <path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={styles.logoText}>DevAssist AI</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to your developer workspace</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email address</label>
          <input style={styles.input} type="email" placeholder="dev@company.com" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        <div style={styles.forgotRow}>
          <span style={styles.forgotLink}>Forgot password?</span>
        </div>

        <button style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <span style={styles.spinnerRow}><span style={styles.spinner} /> Signing in...</span>
          ) : 'Sign in'}
        </button>

        <div style={styles.divider}><span style={styles.dividerLine} /><span style={styles.dividerText}>or</span><span style={styles.dividerLine} /></div>

        <button style={styles.githubBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        <p style={styles.switchText}>
          Don't have an account?{' '}
          <span style={styles.switchLink} onClick={onSwitchToSignup}>Create one</span>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
  bgGrid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(35,134,54,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(35,134,54,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' },
  glowLeft: { position: 'absolute', top: '20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(35,134,54,0.12) 0%, transparent 70%)', pointerEvents: 'none' },
  glowRight: { position: 'absolute', bottom: '10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' },
  card: { position: 'relative', zIndex: 1, background: '#161b22', border: '1px solid #30363d', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' },
  logoRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 },
  logoIcon: { flexShrink: 0 },
  logoText: { fontSize: 20, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  title: { margin: '0 0 6px', fontSize: 26, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '0 0 28px', fontSize: 14, color: '#8b949e' },
  errorBox: { background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 8, padding: '10px 14px', color: '#f85149', fontSize: 13, marginBottom: 20 },
  fieldGroup: { marginBottom: 18 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#8b949e', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '11px 14px', color: '#e6edf3', fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'inherit' },
  forgotRow: { display: 'flex', justifyContent: 'flex-end', marginBottom: 22, marginTop: -10 },
  forgotLink: { color: '#58a6ff', fontSize: 13, cursor: 'pointer' },
  btn: { width: '100%', background: 'linear-gradient(135deg, #238636, #2ea043)', border: 'none', borderRadius: 8, padding: '13px', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.3px', transition: 'opacity 0.2s', fontFamily: 'inherit' },
  spinnerRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  spinner: { width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' },
  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' },
  dividerLine: { flex: 1, height: 1, background: '#30363d' },
  dividerText: { color: '#8b949e', fontSize: 13 },
  githubBtn: { width: '100%', background: '#21262d', border: '1px solid #30363d', borderRadius: 8, padding: '12px', color: '#e6edf3', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'inherit', transition: 'background 0.2s' },
  switchText: { textAlign: 'center', color: '#8b949e', fontSize: 14, marginTop: 22 },
  switchLink: { color: '#58a6ff', cursor: 'pointer', fontWeight: 600 },
};

export default LoginPage;