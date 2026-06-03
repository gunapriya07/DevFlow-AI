import React from 'react';
import type { DashboardTab } from '../Dashboard.ts';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'overview' as DashboardTab, label: 'Overview', icon: '📊' },
    { id: 'repo' as DashboardTab, label: 'Repository', icon: '📦' },
    { id: 'dependencies' as DashboardTab, label: 'Dependencies', icon: '🔧' },
    { id: 'env' as DashboardTab, label: 'Environment', icon: '⚙️' },
    { id: 'validation' as DashboardTab, label: 'Validation', icon: '✓' },
    { id: 'troubleshoot' as DashboardTab, label: 'AI Troubleshooter', icon: '🤖' },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#238636" />
            <path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={styles.logoText}>DevAssist</span>
      </div>

      <nav style={styles.nav}>
        {menuItems.map(item => (
          <button
            key={item.id}
            style={{
              ...styles.navItem,
              ...(activeTab === item.id ? styles.navItemActive : {}),
            }}
            onClick={() => onTabChange(item.id)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={styles.footer}>
        <button style={styles.logoutBtn} onClick={onLogout}>
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 260,
    background: '#161b22',
    borderRight: '1px solid #30363d',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    paddingBottom: 16,
    borderBottom: '1px solid #30363d',
  },
  logo: { flexShrink: 0 },
  logoText: { fontSize: 18, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.5px' },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', gap: 8 },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 14px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 8,
    color: '#8b949e',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'rgba(35,134,54,0.15)',
    borderColor: '#238636',
    color: '#58a6ff',
  },
  navIcon: { fontSize: 16 },
  navLabel: { flex: 1 },
  footer: { paddingTop: 16, borderTop: '1px solid #30363d' },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 12px',
    background: 'rgba(248,81,73,0.1)',
    border: '1px solid rgba(248,81,73,0.3)',
    borderRadius: 8,
    color: '#f85149',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
};

export default Sidebar;
