import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth.ts';
import type { User } from './types/index.ts';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

const roles: { value: User['role']; label: string; icon: string }[] = [
  { value: 'developer', label: 'Software Engineer', icon: '💻' },
  { value: 'devops', label: 'DevOps Engineer', icon: '⚙️' },
  { value: 'student', label: 'Student', icon: '🎓' },
  { value: 'contributor', label: 'Open Source Contributor', icon: '🌍' },
];

const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('developer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (!name || !email) { setError('Name and email are required'); return; }
    setError(''); setStep(2);
  };

  const handleSubmit = async () => {
    if (!password) { setError('Password is required'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true); setError('');
    await signup(name, email, password, role);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgGrid} />
      <div style={styles.glowTop} />

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

        <div style={styles.stepIndicator}>
          {[1, 2].map(s => (
            <React.Fragment key={s}>
              <div style={{ ...styles.stepDot, background: s <= step ? '#238636' : '#30363d', border: s === step ? '2px solid #2ea043' : '2px solid transparent' }}>
                {s < step ? '✓' : s}
              </div>
              {s < 2 && <div style={{ ...styles.stepLine, background: s < step ? '#238636' : '#30363d' }} />}
            </React.Fragment>
          ))}
        </div>

        <h1 style={styles.title}>{step === 1 ? 'Create account' : 'Choose your role'}</h1>
        <p style={styles.subtitle}>{step === 1 ? 'Join thousands of developers using DevAssist' : 'Help us personalize your experience'}</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        {step === 1 ? (
          <>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full name</label>
              <input style={styles.input} placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email address</label>
              <input style={styles.input} type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button style={styles.btn} onClick={handleNext}>Continue →</button>
          </>
        ) : (
          <>
            <div style={styles.roleGrid}>
              {roles.map(r => (
                <div key={r.value} style={{ ...styles.roleCard, ...(role === r.value ? styles.roleCardActive : {}) }}
                  onClick={() => setRole(r.value)}>
                  <span style={styles.roleIcon}>{r.icon}</span>
                  <span style={styles.roleLabel}>{r.label}</span>
                </div>
              ))}
            </div>
            <button style={{ ...styles.btn, marginTop: 8, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <button style={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        <p style={styles.switchText}>
          Already have an account?{' '}
          <span style={styles.switchLink} onClick={onSwitchToLogin}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
  bgGrid: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(88,166,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' },
  glowTop: { position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' },
  card: { position: 'relative', zIndex: 1, background: '#161b22', border: '1px solid #30363d', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 440, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' },
  logoRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 },
  logoIcon: { flexShrink: 0 },
  logoText: { fontSize: 20, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  stepIndicator: { display: 'flex', alignItems: 'center', marginBottom: 24 },
  stepDot: { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', transition: 'all 0.3s' },
  stepLine: { flex: 1, height: 2, margin: '0 8px', transition: 'background 0.3s' },
  title: { margin: '0 0 6px', fontSize: 24, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '0 0 24px', fontSize: 14, color: '#8b949e' },
  errorBox: { background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 8, padding: '10px 14px', color: '#f85149', fontSize: 13, marginBottom: 18 },
  fieldGroup: { marginBottom: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#8b949e', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '11px 14px', color: '#e6edf3', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
  btn: { width: '100%', background: 'linear-gradient(135deg, #238636, #2ea043)', border: 'none', borderRadius: 8, padding: '13px', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' },
  backBtn: { width: '100%', background: 'transparent', border: '1px solid #30363d', borderRadius: 8, padding: '11px', color: '#8b949e', fontSize: 14, cursor: 'pointer', marginTop: 10, fontFamily: 'inherit' },
  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 },
  roleCard: { background: '#0d1117', border: '1px solid #30363d', borderRadius: 10, padding: '16px 12px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' },
  roleCardActive: { border: '1px solid #238636', background: 'rgba(35,134,54,0.08)' },
  roleIcon: { fontSize: 24, display: 'block', marginBottom: 8 },
  roleLabel: { fontSize: 13, color: '#e6edf3', fontWeight: 600 },
  switchText: { textAlign: 'center', color: '#8b949e', fontSize: 14, marginTop: 22 },
  switchLink: { color: '#58a6ff', cursor: 'pointer', fontWeight: 600 },
};

export default SignupPage;