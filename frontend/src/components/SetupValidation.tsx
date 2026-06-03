import React from 'react';
import { mockAnalysis } from '../mockData.ts';

const SetupValidation: React.FC = () => {
  const { validationChecks, setupSteps } = mockAnalysis;
  const passed = validationChecks.filter(c => c.status === 'pass').length;
  const failed = validationChecks.filter(c => c.status === 'fail').length;
  const warnings = validationChecks.filter(c => c.status === 'warning').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return { icon: '✓', color: '#238636', bg: 'rgba(35,134,54,0.1)' };
      case 'fail':
        return { icon: '✕', color: '#f85149', bg: 'rgba(248,81,73,0.1)' };
      case 'warning':
        return { icon: '⚠', color: '#d29922', bg: 'rgba(201,167,22,0.1)' };
      default:
        return { icon: '?', color: '#8b949e', bg: '#30363d' };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Setup Validation</h1>
        <p style={styles.subtitle}>Verify all required services and configurations</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✓</div>
          <div style={styles.statNumber}>{passed}</div>
          <div style={styles.statLabel}>Passed</div>
          <div style={styles.statBar}>
            <div style={{ ...styles.statBarFill, width: `${(passed / validationChecks.length) * 100}%`, background: '#238636' }} />
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, color: '#d29922' }}>⚠</div>
          <div style={styles.statNumber}>{warnings}</div>
          <div style={styles.statLabel}>Warnings</div>
          <div style={styles.statBar}>
            <div style={{ ...styles.statBarFill, width: warnings > 0 ? '100%' : '0%', background: '#d29922' }} />
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, color: '#f85149' }}>✕</div>
          <div style={styles.statNumber}>{failed}</div>
          <div style={styles.statLabel}>Failed</div>
          <div style={styles.statBar}>
            <div style={{ ...styles.statBarFill, width: failed > 0 ? '100%' : '0%', background: '#f85149' }} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Validation Checks</h3>
        <div style={styles.checksList}>
          {validationChecks.map(check => {
            const { icon, color, bg } = getStatusIcon(check.status);
            return (
              <div key={check.id} style={{ ...styles.checkItem, background: bg, borderLeftColor: color }}>
                <div style={styles.checkHeader}>
                  <div style={styles.checkTitleGroup}>
                    <span style={{ ...styles.checkIcon, color }}>
                      {icon}
                    </span>
                    <div>
                      <div style={styles.checkName}>{check.name}</div>
                      <div style={styles.checkType}>{check.type}</div>
                    </div>
                  </div>
                  <span style={{ ...styles.checkBadge, color, borderColor: color, background: 'transparent' }}>
                    {check.status}
                  </span>
                </div>

                <div style={styles.checkMessage}>{check.message}</div>
                <div style={styles.checkDetail}>{check.detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Setup Steps Progress</h3>
        <div style={styles.stepsList}>
          {setupSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';
            const isPending = step.status === 'pending';

            return (
              <div key={step.id} style={styles.stepItem}>
                <div style={styles.stepContent}>
                  <div style={styles.stepHeader}>
                    <div style={styles.stepNumber}>
                      <span
                        style={{
                          ...styles.stepNumberText,
                          background: isCompleted ? '#238636' : isInProgress ? '#58a6ff' : '#30363d',
                          color: '#fff',
                        }}
                      >
                        {isCompleted ? '✓' : isInProgress ? '◐' : idx + 1}
                      </span>
                      <div>
                        <div style={styles.stepTitle}>{step.title}</div>
                        <div style={styles.stepDesc}>{step.description}</div>
                      </div>
                    </div>
                    <div style={styles.stepMeta}>
                      <span style={styles.stepStatus}>{step.status}</span>
                      <span style={styles.stepTime}>{step.estimatedTime}</span>
                    </div>
                  </div>

                  <div style={styles.stepCommand}>
                    <span style={styles.commandLabel}>Command:</span>
                    <code style={styles.commandCode}>{step.commands.windows}</code>
                  </div>
                </div>

                {idx < setupSteps.length - 1 && <div style={styles.stepConnector} />}
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.actionBox}>
        <h3 style={styles.actionTitle}>Next Steps</h3>
        <div style={styles.actionItems}>
          <div style={styles.actionItem}>
            <span style={styles.actionNumber}>1</span>
            <div>
              <div style={styles.actionLabel}>Install Missing Dependencies</div>
              <div style={styles.actionDesc}>Use the dependency checker to install required tools</div>
            </div>
          </div>
          <div style={styles.actionItem}>
            <span style={styles.actionNumber}>2</span>
            <div>
              <div style={styles.actionLabel}>Configure Environment Variables</div>
              <div style={styles.actionDesc}>Set up your .env file with the required variables</div>
            </div>
          </div>
          <div style={styles.actionItem}>
            <span style={styles.actionNumber}>3</span>
            <div>
              <div style={styles.actionLabel}>Run Setup Steps</div>
              <div style={styles.actionDesc}>Execute the setup commands in order</div>
            </div>
          </div>
          <div style={styles.actionItem}>
            <span style={styles.actionNumber}>4</span>
            <div>
              <div style={styles.actionLabel}>Validate All Services</div>
              <div style={styles.actionDesc}>Verify all connections and services are working</div>
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
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
  statCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16, textAlign: 'center' },
  statIcon: { fontSize: 24, marginBottom: 8, color: '#238636' },
  statNumber: { fontSize: 24, fontWeight: 700, color: '#58a6ff', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#8b949e', marginBottom: 8 },
  statBar: { height: 4, background: '#30363d', borderRadius: 2, overflow: 'hidden' },
  statBarFill: { height: '100%', transition: 'width 0.3s' },
  section: { marginBottom: 32 },
  sectionTitle: { margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#e6edf3' },
  checksList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 },
  checkItem: { border: '1px solid #30363d', borderLeft: '4px solid', borderRadius: 12, padding: 16 },
  checkHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  checkTitleGroup: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  checkIcon: { fontSize: 18, fontWeight: 700, marginTop: 2 },
  checkName: { fontSize: 14, fontWeight: 600, color: '#e6edf3' },
  checkType: { fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 },
  checkBadge: { padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, border: '1px solid' },
  checkMessage: { fontSize: 13, fontWeight: 600, color: '#e6edf3', marginBottom: 4 },
  checkDetail: { fontSize: 12, color: '#8b949e' },
  stepsList: { display: 'flex', flexDirection: 'column' },
  stepItem: { position: 'relative', marginBottom: 24 },
  stepContent: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16 },
  stepHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  stepNumber: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  stepNumberText: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 },
  stepTitle: { fontSize: 14, fontWeight: 600, color: '#e6edf3' },
  stepDesc: { fontSize: 12, color: '#8b949e', marginTop: 2 },
  stepMeta: { display: 'flex', gap: 12, fontSize: 12 },
  stepStatus: { padding: '4px 10px', background: 'rgba(88,166,255,0.2)', borderRadius: 4, color: '#58a6ff', fontWeight: 600, textTransform: 'capitalize' },
  stepTime: { color: '#8b949e', fontWeight: 600 },
  stepCommand: { background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 },
  commandLabel: { color: '#8b949e', fontWeight: 600, flexShrink: 0 },
  commandCode: { flex: 1, color: '#58a6ff', fontFamily: "'JetBrains Mono', monospace", background: 'transparent', border: 'none', overflow: 'auto', margin: 0 },
  stepConnector: { position: 'absolute', left: '15px', top: '48px', width: 2, height: 'calc(100% + 24px)', background: '#30363d' },
  actionBox: { background: 'rgba(35,134,54,0.1)', border: '1px solid rgba(35,134,54,0.2)', borderRadius: 12, padding: 24 },
  actionTitle: { margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#238636' },
  actionItems: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 },
  actionItem: { display: 'flex', gap: 12 },
  actionNumber: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: '#238636', color: '#fff', borderRadius: '50%', fontWeight: 700, flexShrink: 0 },
  actionLabel: { fontSize: 13, fontWeight: 600, color: '#238636' },
  actionDesc: { fontSize: 12, color: '#8b949e', marginTop: 2 },
};

export default SetupValidation;
