import React, { useState } from 'react';
import { mockAnalysis } from '../mockData.ts';

const EnvironmentVariables: React.FC = () => {
  const { envVariables } = mockAnalysis;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const required = envVariables.filter(v => v.required);
  const optional = envVariables.filter(v => !v.required);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const EnvCard: React.FC<{ vars: typeof envVariables }> = ({ vars }) => (
    <>
      {vars.map(env => (
        <div key={env.key} style={styles.envCard}>
          <div style={styles.envHeader}>
            <div>
              <div style={styles.envKey}>{env.key}</div>
              <div style={styles.envDesc}>{env.description}</div>
            </div>
            <span style={{ ...styles.envBadge, background: env.required ? 'rgba(248,81,73,0.2)' : 'rgba(88,166,255,0.2)', color: env.required ? '#f85149' : '#58a6ff' }}>
              {env.required ? 'REQUIRED' : 'OPTIONAL'}
            </span>
          </div>

          <div style={styles.envRow}>
            <div style={styles.envField}>
              <label style={styles.fieldLabel}>Current Value</label>
              <input
                type="password"
                value={env.value}
                placeholder="Not set"
                style={styles.input}
                readOnly
              />
            </div>
            <button
              style={styles.copyBtn}
              onClick={() => copyToClipboard(`${env.key}=${env.value}`, env.key)}
              title="Copy to clipboard"
            >
              {copiedId === env.key ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>

          <div style={styles.exampleBox}>
            <span style={styles.exampleLabel}>Example:</span>
            <code style={styles.exampleCode}>{env.example}</code>
            <button
              style={styles.copyIconBtn}
              onClick={() => copyToClipboard(env.example, `${env.key}-example`)}
              title="Copy example"
            >
              📋
            </button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Environment Variables</h1>
        <p style={styles.subtitle}>Configure your .env file for local development</p>
      </div>

      <div style={styles.infoBox}>
        <span style={styles.infoIcon}>ℹ️</span>
        <div>
          <span style={styles.infoTitle}>Environment Configuration Guide</span>
          <p style={styles.infoText}>These environment variables are required for your application to run properly. Create a <code style={styles.inlineCode}>.env</code> file in your project root and add these values.</p>
        </div>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{required.length}</div>
          <div style={styles.summaryLabel}>Required Variables</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{optional.length}</div>
          <div style={styles.summaryLabel}>Optional Variables</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryNumber}>{envVariables.filter(v => v.value).length}/{envVariables.length}</div>
          <div style={styles.summaryLabel}>Configured</div>
        </div>
      </div>

      {required.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.requiredIcon}>*</span>
            Required Variables ({required.length})
          </h3>
          <div style={styles.envGrid}>
            <EnvCard vars={required} />
          </div>
        </div>
      )}

      {optional.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.optionalIcon}>○</span>
            Optional Variables ({optional.length})
          </h3>
          <div style={styles.envGrid}>
            <EnvCard vars={optional} />
          </div>
        </div>
      )}

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          <span>📝</span>
          Sample .env File
        </h3>
        <div style={styles.envFileBox}>
          <pre style={styles.envFilePre}>
{envVariables.map(env => `${env.key}=${env.example}`).join('\n')}
          </pre>
          <button
            style={styles.downloadBtn}
            onClick={() => {
              const content = envVariables.map(env => `${env.key}=${env.example}`).join('\n');
              const blob = new Blob([content], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = '.env.example';
              a.click();
            }}
          >
            ⬇️ Download .env.example
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1000, margin: '0 auto' },
  header: { marginBottom: 32 },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#8b949e' },
  infoBox: { display: 'flex', gap: 12, background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 12, padding: 16, marginBottom: 24 },
  infoIcon: { fontSize: 20, flexShrink: 0 },
  infoTitle: { fontSize: 14, fontWeight: 600, color: '#58a6ff', display: 'block', marginBottom: 4 },
  infoText: { margin: 0, fontSize: 13, color: '#8b949e' },
  inlineCode: { background: '#0d1117', padding: '2px 6px', borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", color: '#58a6ff' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
  summaryCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16, textAlign: 'center' },
  summaryNumber: { fontSize: 24, fontWeight: 700, color: '#58a6ff', marginBottom: 4 },
  summaryLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' },
  section: { marginBottom: 32 },
  sectionTitle: { margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e6edf3', display: 'flex', alignItems: 'center', gap: 8 },
  requiredIcon: { color: '#f85149', fontWeight: 700, fontSize: 14 },
  optionalIcon: { color: '#58a6ff', fontSize: 14 },
  envGrid: { display: 'flex', flexDirection: 'column', gap: 16 },
  envCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16 },
  envHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #30363d' },
  envKey: { fontSize: 14, fontWeight: 700, color: '#58a6ff', fontFamily: "'JetBrains Mono', monospace" },
  envDesc: { fontSize: 12, color: '#8b949e', marginTop: 4 },
  envBadge: { padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' },
  envRow: { display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-end' },
  envField: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  fieldLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: '8px 12px', color: '#e6edf3', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", outline: 'none' },
  copyBtn: { padding: '8px 12px', background: '#238636', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  exampleBox: { position: 'relative', background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: 10, display: 'flex', alignItems: 'center', gap: 8 },
  exampleLabel: { fontSize: 11, color: '#8b949e', fontWeight: 600, flexShrink: 0 },
  exampleCode: { flex: 1, background: 'transparent', color: '#8b949e', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0, border: 'none', outline: 'none', overflow: 'auto' },
  copyIconBtn: { background: 'transparent', border: 'none', fontSize: 14, cursor: 'pointer', padding: 0, flexShrink: 0 },
  envFileBox: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16, position: 'relative' },
  envFilePre: { background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: 12, color: '#8b949e', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", overflow: 'auto', margin: '0 0 12px' },
  downloadBtn: { width: '100%', padding: '10px', background: 'linear-gradient(135deg, #238636, #2ea043)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
};

export default EnvironmentVariables;
