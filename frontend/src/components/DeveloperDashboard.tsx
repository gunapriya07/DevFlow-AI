import React from 'react';
import { mockAnalysis } from '../mockData.ts';

const DeveloperDashboard: React.FC = () => {
  const { repoName, setupProgress, dependencies, validationChecks, issues } = mockAnalysis;
  const installedDeps = dependencies.filter(d => d.status === 'installed').length;
  const failedChecks = validationChecks.filter(v => v.status === 'fail').length;
  const openIssues = issues.filter(i => i.status === 'open').length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Developer Dashboard</h1>
        <p style={styles.subtitle}>Project: <span style={styles.projectName}>{repoName}</span></p>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <h3 style={styles.cardTitle}>Setup Progress</h3>
            <span style={styles.progressPercent}>{setupProgress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${setupProgress}%` }} />
          </div>
          <p style={styles.progressText}>Getting your environment ready...</p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{installedDeps}/{dependencies.length}</div>
          <div style={styles.statLabel}>Dependencies Installed</div>
          <div style={styles.statBar}>
            <div style={{ ...styles.statBarFill, width: `${(installedDeps / dependencies.length) * 100}%`, background: '#238636' }} />
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statNumber}>{validationChecks.filter(v => v.status === 'pass').length}/{validationChecks.length}</div>
          <div style={styles.statLabel}>Validation Checks Passed</div>
          <div style={styles.statBar}>
            <div style={{ ...styles.statBarFill, width: `${(validationChecks.filter(v => v.status === 'pass').length / validationChecks.length) * 100}%`, background: '#238636' }} />
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statNumber}>{openIssues}</div>
          <div style={styles.statLabel}>Active Issues</div>
          <div style={{ ...styles.statBar, background: 'rgba(248,81,73,0.2)' }}>
            <div style={{ ...styles.statBarFill, width: `${(openIssues > 0 ? 100 : 0)}%`, background: '#f85149' }} />
          </div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Tech Stack</h3>
          <div style={styles.stackGrid}>
            <div style={styles.stackItem}>
              <span style={styles.stackLabel}>Language</span>
              <span style={styles.stackValue}>{mockAnalysis.techStack.language}</span>
            </div>
            <div style={styles.stackItem}>
              <span style={styles.stackLabel}>Framework</span>
              <span style={styles.stackValue}>{mockAnalysis.techStack.framework}</span>
            </div>
            <div style={styles.stackItem}>
              <span style={styles.stackLabel}>Database</span>
              <span style={styles.stackValue}>{mockAnalysis.techStack.database}</span>
            </div>
            <div style={styles.stackItem}>
              <span style={styles.stackLabel}>Node Version</span>
              <span style={styles.stackValue}>{mockAnalysis.techStack.nodeVersion}</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>DevOps Tools</h3>
          <div style={styles.toolsList}>
            {mockAnalysis.techStack.devops.map((tool, idx) => (
              <div key={idx} style={styles.toolItem}>
                <span style={styles.toolDot}>●</span>
                <span style={styles.toolName}>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.issuesSection}>
        <h3 style={styles.cardTitle}>Recent Issues</h3>
        {issues.slice(0, 3).map(issue => (
          <div key={issue.id} style={styles.issueItem}>
            <div style={styles.issueHeader}>
              <span style={{ ...styles.issueBadge, background: issue.status === 'open' ? 'rgba(248,81,73,0.2)' : 'rgba(35,134,54,0.2)', color: issue.status === 'open' ? '#f85149' : '#238636' }}>
                {issue.status === 'open' ? '🔴' : '✓'} {issue.status}
              </span>
              <span style={styles.issueTime}>{issue.timestamp}</span>
            </div>
            <p style={styles.issueError}>{issue.error}</p>
            <p style={styles.issueCause}>{issue.cause}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1400, margin: '0 auto' },
  header: { marginBottom: 32 },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#8b949e' },
  projectName: { color: '#58a6ff', fontWeight: 600 },
  progressSection: { marginBottom: 32 },
  progressCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 20 },
  progressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { margin: 0, fontSize: 15, fontWeight: 600, color: '#e6edf3' },
  progressPercent: { fontSize: 20, fontWeight: 700, color: '#238636' },
  progressBar: { height: 8, background: '#30363d', borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #238636, #2ea043)', transition: 'width 0.3s' },
  progressText: { margin: 0, fontSize: 12, color: '#8b949e' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 },
  statCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 20 },
  statNumber: { fontSize: 24, fontWeight: 700, color: '#58a6ff', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#8b949e', marginBottom: 12 },
  statBar: { height: 4, background: '#30363d', borderRadius: 2, overflow: 'hidden' },
  statBarFill: { height: '100%', transition: 'width 0.3s' },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 32 },
  card: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 20 },
  stackGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 },
  stackItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  stackLabel: { fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' },
  stackValue: { fontSize: 14, fontWeight: 600, color: '#58a6ff' },
  toolsList: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 },
  toolItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#e6edf3' },
  toolDot: { color: '#238636', fontSize: 10 },
  toolName: { fontWeight: 500 },
  issuesSection: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 20 },
  issueItem: { padding: '12px 0', borderBottom: '1px solid #30363d', lastChild: { borderBottom: 'none' } },
  issueHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  issueBadge: { padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 },
  issueTime: { fontSize: 12, color: '#8b949e' },
  issueError: { margin: '4px 0', fontSize: 13, fontWeight: 600, color: '#f85149' },
  issueCause: { margin: '4px 0 0', fontSize: 12, color: '#8b949e' },
};

export default DeveloperDashboard;
