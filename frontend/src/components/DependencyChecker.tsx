import React from 'react';
import { mockAnalysis } from '../mockData.ts';

const DependencyChecker: React.FC = () => {
  const { dependencies } = mockAnalysis;
  const installed = dependencies.filter(d => d.status === 'installed');
  const missing = dependencies.filter(d => d.status === 'missing');
  const outdated = dependencies.filter(d => d.status === 'outdated');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'installed':
        return { bg: 'rgba(35,134,54,0.1)', border: 'rgba(35,134,54,0.3)', text: '#238636', icon: '✓' };
      case 'missing':
        return { bg: 'rgba(248,81,73,0.1)', border: 'rgba(248,81,73,0.3)', text: '#f85149', icon: '✕' };
      case 'outdated':
        return { bg: 'rgba(201,167,22,0.1)', border: 'rgba(201,167,22,0.3)', text: '#d29922', icon: '⚠' };
      default:
        return { bg: '#30363d', border: '#30363d', text: '#8b949e', icon: '?' };
    }
  };

  const DependencyCard: React.FC<{ deps: typeof dependencies }> = ({ deps }) => (
    <>
      {deps.map(dep => {
        const colors = getStatusColor(dep.status);
        return (
          <div key={dep.name} style={{ ...styles.depCard, background: colors.bg, borderColor: colors.border }}>
            <div style={styles.depHeader}>
              <div style={styles.depTitle}>
                <span style={{ ...styles.depIcon, color: colors.text }}>{colors.icon}</span>
                <span style={styles.depName}>{dep.name}</span>
              </div>
              <span style={{ ...styles.depStatus, color: colors.text }}>{dep.status}</span>
            </div>

            <div style={styles.depDetails}>
              <div style={styles.depDetail}>
                <span style={styles.depLabel}>Required</span>
                <span style={styles.depValue}>{dep.required}</span>
              </div>
              <div style={styles.depDetail}>
                <span style={styles.depLabel}>Installed</span>
                <span style={styles.depValue}>{dep.installed || 'Not installed'}</span>
              </div>
            </div>

            {dep.status !== 'installed' && (
              <div style={styles.installBox}>
                <button style={styles.installBtn}>
                  📋 Copy Install Command
                </button>
                <code style={styles.installCode}>{dep.installCommand}</code>
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dependency Checker</h1>
        <p style={styles.subtitle}>Monitor and manage project dependencies</p>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{installed.length}</div>
          <div style={styles.summaryLabel}>Installed</div>
          <div style={styles.summaryBar}>
            <div style={{ ...styles.summaryFill, width: '100%', background: '#238636' }} />
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{outdated.length}</div>
          <div style={styles.summaryLabel}>Outdated</div>
          <div style={styles.summaryBar}>
            <div style={{ ...styles.summaryFill, width: outdated.length > 0 ? '100%' : '0%', background: '#d29922' }} />
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{missing.length}</div>
          <div style={styles.summaryLabel}>Missing</div>
          <div style={styles.summaryBar}>
            <div style={{ ...styles.summaryFill, width: missing.length > 0 ? '100%' : '0%', background: '#f85149' }} />
          </div>
        </div>
      </div>

      {installed.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>✓</span>
            Installed Dependencies ({installed.length})
          </h3>
          <div style={styles.depsGrid}>
            <DependencyCard deps={installed} />
          </div>
        </div>
      )}

      {outdated.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>⚠</span>
            Outdated Dependencies ({outdated.length})
          </h3>
          <div style={styles.depsGrid}>
            <DependencyCard deps={outdated} />
          </div>
        </div>
      )}

      {missing.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>✕</span>
            Missing Dependencies ({missing.length})
          </h3>
          <div style={styles.depsGrid}>
            <DependencyCard deps={missing} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1200, margin: '0 auto' },
  header: { marginBottom: 32 },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#8b949e' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
  summaryCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16 },
  summaryNumber: { fontSize: 24, fontWeight: 700, color: '#58a6ff', marginBottom: 4 },
  summaryLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 },
  summaryBar: { height: 4, background: '#30363d', borderRadius: 2, overflow: 'hidden' },
  summaryFill: { height: '100%', transition: 'width 0.3s' },
  section: { marginBottom: 32 },
  sectionTitle: { margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e6edf3', display: 'flex', alignItems: 'center', gap: 8 },
  sectionIcon: { fontSize: 18 },
  depsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  depCard: { border: '1px solid', borderRadius: 12, padding: 16, transition: 'all 0.2s' },
  depHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  depTitle: { display: 'flex', alignItems: 'center', gap: 8 },
  depIcon: { fontSize: 16, fontWeight: 700 },
  depName: { fontSize: 14, fontWeight: 600, color: '#e6edf3' },
  depStatus: { fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  depDetails: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(48,54,61,0.5)' },
  depDetail: { display: 'flex', flexDirection: 'column', gap: 4 },
  depLabel: { fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' },
  depValue: { fontSize: 13, fontWeight: 600, color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace" },
  installBox: { display: 'flex', flexDirection: 'column', gap: 8 },
  installBtn: { padding: '8px 12px', background: '#238636', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  installCode: { background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: '8px 10px', color: '#58a6ff', fontSize: 11, overflow: 'auto', fontFamily: "'JetBrains Mono', monospace", margin: 0 },
};

export default DependencyChecker;
