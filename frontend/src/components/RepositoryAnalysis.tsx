import React from 'react';
import { mockAnalysis } from '../mockData.ts';

const RepositoryAnalysis: React.FC = () => {
  const { repoUrl, repoName, techStack } = mockAnalysis;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Repository Analysis</h1>
        <p style={styles.subtitle}>Detected tech stack and dependencies</p>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Repository Information</h3>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Repository Name</span>
            <span style={styles.infoValue}>{repoName}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Repository URL</span>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" style={styles.infoLink}>{repoUrl}</a>
          </div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔤 Language & Framework</h3>
          <div style={styles.featureBox}>
            <div style={styles.feature}>
              <span style={styles.featureLabel}>Primary Language</span>
              <span style={styles.featureValue}>{techStack.language}</span>
            </div>
            <div style={styles.featureDivider} />
            <div style={styles.feature}>
              <span style={styles.featureLabel}>Framework</span>
              <span style={styles.featureValue}>{techStack.framework}</span>
            </div>
            <div style={styles.featureDivider} />
            <div style={styles.feature}>
              <span style={styles.featureLabel}>Package Manager</span>
              <span style={styles.featureValue}>{techStack.packageManager}</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💾 Database & Services</h3>
          <div style={styles.featureBox}>
            <div style={styles.feature}>
              <span style={styles.featureLabel}>Database</span>
              <span style={styles.featureValue}>{techStack.database}</span>
            </div>
            <div style={styles.featureDivider} />
            <div style={styles.feature}>
              <span style={styles.featureLabel}>Node Version</span>
              <span style={styles.featureValue}>{techStack.nodeVersion}</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🚀 DevOps & Deployment</h3>
          <div style={styles.tagContainer}>
            {techStack.devops.map((tool, idx) => (
              <span key={idx} style={styles.tag}>{tool}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📋 Project Structure Analysis</h3>
        <div style={styles.structureList}>
          <div style={styles.structureItem}>
            <span style={styles.structureIcon}>📦</span>
            <div style={styles.structureContent}>
              <span style={styles.structureName}>package.json</span>
              <span style={styles.structureDesc}>Node.js project with npm dependencies</span>
            </div>
          </div>
          <div style={styles.structureItem}>
            <span style={styles.structureIcon}>🐳</span>
            <div style={styles.structureContent}>
              <span style={styles.structureName}>Docker Support</span>
              <span style={styles.structureDesc}>Containerized application using Docker Compose</span>
            </div>
          </div>
          <div style={styles.structureItem}>
            <span style={styles.structureIcon}>⚙️</span>
            <div style={styles.structureContent}>
              <span style={styles.structureName}>.env Configuration</span>
              <span style={styles.structureDesc}>Environment variables for local development</span>
            </div>
          </div>
          <div style={styles.structureItem}>
            <span style={styles.structureIcon}>🗄️</span>
            <div style={styles.structureContent}>
              <span style={styles.structureName}>Database Migrations</span>
              <span style={styles.structureDesc}>PostgreSQL with automatic migrations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1200, margin: '0 auto' },
  header: { marginBottom: 32 },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#8b949e' },
  card: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 24, marginBottom: 20 },
  cardTitle: { margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e6edf3' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 },
  infoItem: { display: 'flex', flexDirection: 'column', gap: 6 },
  infoLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 },
  infoValue: { fontSize: 14, color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace" },
  infoLink: { fontSize: 14, color: '#58a6ff', textDecoration: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20, marginBottom: 20 },
  featureBox: { display: 'flex', flexDirection: 'column', gap: 16 },
  feature: { display: 'flex', flexDirection: 'column', gap: 4 },
  featureLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' },
  featureValue: { fontSize: 15, fontWeight: 600, color: '#58a6ff' },
  featureDivider: { height: 1, background: '#30363d' },
  tagContainer: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tag: { display: 'inline-flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(35,134,54,0.15)', border: '1px solid rgba(35,134,54,0.3)', borderRadius: 16, color: '#238636', fontSize: 12, fontWeight: 600 },
  structureList: { display: 'flex', flexDirection: 'column', gap: 16 },
  structureItem: { display: 'flex', gap: 12, padding: 12, background: 'rgba(35,134,54,0.05)', borderRadius: 8, border: '1px solid rgba(35,134,54,0.2)' },
  structureIcon: { fontSize: 24, flexShrink: 0 },
  structureContent: { display: 'flex', flexDirection: 'column', gap: 4 },
  structureName: { fontSize: 13, fontWeight: 600, color: '#e6edf3' },
  structureDesc: { fontSize: 12, color: '#8b949e' },
};

export default RepositoryAnalysis;
