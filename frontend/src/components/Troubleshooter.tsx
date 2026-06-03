import React, { useState } from 'react';
import { mockAnalysis } from '../mockData.ts';

const Troubleshooter: React.FC = () => {
  const { issues } = mockAnalysis;
  const [selectedIssue, setSelectedIssue] = useState(issues[0]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hi! I\'m your AI Troubleshooter. I can help diagnose setup issues and provide solutions. Select an issue on the left or describe your problem.' },
  ]);
  const [input, setInput] = useState('');

  const handleSelectIssue = (issue: typeof issues[0]) => {
    setSelectedIssue(issue);
    setMessages([
      { role: 'assistant', content: `I found this issue: "${issue.error}". Let me analyze it for you.` },
      { role: 'assistant', content: `**Root Cause:** ${issue.cause}` },
      { role: 'assistant', content: `**Solution:** ${issue.fix}` },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm analyzing your issue: "${userMessage}". Based on the repository analysis, I recommend checking the setup steps and validating your dependencies. Would you like me to suggest specific commands?`,
        },
      ]);
    }, 500);
  };

  const openIssues = issues.filter(i => i.status === 'open');
  const resolvedIssues = issues.filter(i => i.status === 'resolved');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Troubleshooter</h1>
        <p style={styles.subtitle}>Get instant help with setup issues and errors</p>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.sidebar}>
          <div style={styles.issueSection}>
            <h3 style={styles.issueTitle}>
              <span style={styles.openBadge}>●</span>
              Open Issues ({openIssues.length})
            </h3>
            <div style={styles.issueList}>
              {openIssues.map(issue => (
                <button
                  key={issue.id}
                  style={{
                    ...styles.issueItem,
                    ...(selectedIssue.id === issue.id ? styles.issueItemActive : {}),
                  }}
                  onClick={() => handleSelectIssue(issue)}
                >
                  <div style={styles.issueItemIcon}>⚠️</div>
                  <div style={styles.issueItemContent}>
                    <div style={styles.issueItemError}>{issue.error}</div>
                    <div style={styles.issueItemTime}>{issue.timestamp}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {resolvedIssues.length > 0 && (
            <div style={styles.issueSection}>
              <h3 style={styles.issueTitle}>
                <span style={styles.resolvedBadge}>✓</span>
                Resolved ({resolvedIssues.length})
              </h3>
              <div style={styles.issueList}>
                {resolvedIssues.map(issue => (
                  <button
                    key={issue.id}
                    style={{
                      ...styles.issueItem,
                      opacity: 0.6,
                      ...(selectedIssue.id === issue.id ? styles.issueItemActive : {}),
                    }}
                    onClick={() => handleSelectIssue(issue)}
                  >
                    <div style={styles.issueItemIcon}>✓</div>
                    <div style={styles.issueItemContent}>
                      <div style={styles.issueItemError}>{issue.error}</div>
                      <div style={styles.issueItemTime}>{issue.timestamp}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div>
              <h2 style={styles.chatTitle}>Troubleshooting Assistant</h2>
              <p style={styles.chatSubtitle}>{selectedIssue.error}</p>
            </div>
            <div style={styles.statusBadge}>
              {selectedIssue.status === 'open' ? '🔴 Open' : '✓ Resolved'}
            </div>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage),
                }}
              >
                <div style={styles.messageBubble}>
                  {msg.role === 'assistant' && <span style={styles.assistantIcon}>🤖</span>}
                  <div style={styles.messageContent}>{msg.content}</div>
                </div>
              </div>
            ))}
          </div>

          <form style={styles.inputForm} onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything about this issue..."
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn}>
              Send
            </button>
          </form>
        </div>
      </div>

      <div style={styles.suggestionsGrid}>
        <div style={styles.suggestionCard}>
          <h3 style={styles.suggestionTitle}>💡 Quick Tips</h3>
          <ul style={styles.suggestionList}>
            <li>Check the error logs in your terminal</li>
            <li>Verify all dependencies are installed</li>
            <li>Ensure environment variables are set</li>
            <li>Run validation checks regularly</li>
          </ul>
        </div>

        <div style={styles.suggestionCard}>
          <h3 style={styles.suggestionTitle}>🔗 Useful Resources</h3>
          <ul style={styles.suggestionList}>
            <li>
              <a href="#" style={styles.link}>View Official Documentation</a>
            </li>
            <li>
              <a href="#" style={styles.link}>Check GitHub Issues</a>
            </li>
            <li>
              <a href="#" style={styles.link}>Browse Setup Guide</a>
            </li>
            <li>
              <a href="#" style={styles.link}>Community Forum</a>
            </li>
          </ul>
        </div>

        <div style={styles.suggestionCard}>
          <h3 style={styles.suggestionTitle}>🎯 Common Solutions</h3>
          <ul style={styles.suggestionList}>
            <li>Port already in use → Kill process or change port</li>
            <li>Connection refused → Start service/database</li>
            <li>Module not found → Run npm install</li>
            <li>Permission denied → Check file permissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1400, margin: '0 auto' },
  header: { marginBottom: 24 },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  subtitle: { margin: '8px 0 0', fontSize: 14, color: '#8b949e' },
  mainGrid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, marginBottom: 24, height: 500 },
  sidebar: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 16, overflow: 'auto' },
  issueSection: { marginBottom: 20 },
  issueTitle: { margin: '0 0 12px', fontSize: 12, fontWeight: 700, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 6 },
  openBadge: { color: '#f85149', fontSize: 10 },
  resolvedBadge: { color: '#238636', fontSize: 10 },
  issueList: { display: 'flex', flexDirection: 'column', gap: 8 },
  issueItem: { display: 'flex', gap: 8, padding: 10, background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: 'inherit' },
  issueItemActive: { borderColor: '#58a6ff', background: 'rgba(88,166,255,0.1)' },
  issueItemIcon: { fontSize: 16, flexShrink: 0 },
  issueItemContent: { flex: 1, minWidth: 0 },
  issueItemError: { fontSize: 11, fontWeight: 600, color: '#e6edf3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  issueItemTime: { fontSize: 10, color: '#8b949e', marginTop: 2 },
  chatContainer: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 16, borderBottom: '1px solid #30363d' },
  chatTitle: { margin: 0, fontSize: 16, fontWeight: 600, color: '#e6edf3' },
  chatSubtitle: { margin: '4px 0 0', fontSize: 12, color: '#8b949e' },
  statusBadge: { padding: '4px 10px', background: 'rgba(248,81,73,0.2)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 4, fontSize: 11, fontWeight: 600, color: '#f85149' },
  messages: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: 16 },
  message: { display: 'flex', marginBottom: 8 },
  userMessage: { justifyContent: 'flex-end' },
  assistantMessage: { justifyContent: 'flex-start' },
  messageBubble: { display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: '80%', padding: 12, background: '#0d1117', border: '1px solid #30363d', borderRadius: 8 },
  assistantIcon: { fontSize: 18, flexShrink: 0, marginTop: 2 },
  messageContent: { fontSize: 13, color: '#e6edf3', lineHeight: 1.4 },
  inputForm: { display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #30363d' },
  input: { flex: 1, background: '#0d1117', border: '1px solid #30363d', borderRadius: 6, padding: '8px 12px', color: '#e6edf3', fontSize: 13, fontFamily: 'inherit', outline: 'none' },
  sendBtn: { padding: '8px 16px', background: '#238636', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  suggestionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 },
  suggestionCard: { background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: 20 },
  suggestionTitle: { margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#e6edf3' },
  suggestionList: { margin: 0, paddingLeft: 20, listStyle: 'none' },
  link: { color: '#58a6ff', textDecoration: 'none', cursor: 'pointer' },
};

export default Troubleshooter;
