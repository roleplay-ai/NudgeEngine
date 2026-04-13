'use client';

import { Screen } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ screen, onNavigate }: SidebarProps) {
  const { profile, role, signOut } = useAuth();

  const avatarColor = role === 'superadmin' ? '#623CEA' : role === 'hr' ? '#3699FC' : role === 'trainer' ? '#F68A29' : '#23CE68';
  const initials = profile?.avatar_initials ?? profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '??';
  const displayName = profile?.full_name ?? 'User';
  const roleLabel = role === 'superadmin' ? 'Super Admin' : role === 'hr' ? 'HR Manager' : role === 'trainer' ? 'Trainer' : 'Participant';

  const navItem = (s: Screen, icon: React.ReactNode, label: string, color: string) => {
    const isActive = screen === s;
    return (
      <div
        key={s}
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => onNavigate(s)}
      >
        <div className="nav-icon-pill" style={{ background: color }}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">Nudgeable.ai</div>
        <div className="role-sub">
          {role === 'superadmin' ? 'Super Admin Console'
            : role === 'hr' ? 'HR Dashboard'
            : role === 'participant' ? 'Participant Portal'
            : 'Trainer View'}
        </div>
      </div>

      {/* Super Admin Nav */}
      {role === 'superadmin' && (
        <div className="nav-section">
          <div style={{ padding: '10px 18px 4px', fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Platform Admin</div>
          {navItem('sa-orgs',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2.5" stroke="#9B72F8" strokeWidth="1.4"/><path d="M4 8.5h6M4 5.5h6" stroke="#9B72F8" strokeWidth="1.2" strokeLinecap="round"/></svg>,
            'Organisations', 'rgba(155,114,248,0.18)'
          )}
          {navItem('sa-users',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="4.5" r="2" stroke="#F68A29" strokeWidth="1.4"/><circle cx="9.5" cy="4.5" r="2" stroke="#F68A29" strokeWidth="1.4"/><path d="M1 11.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5" stroke="#F68A29" strokeWidth="1.4" strokeLinecap="round"/><path d="M10.5 8.5c1.4 0 2.5 1.1 2.5 2.5" stroke="#F68A29" strokeWidth="1.4" strokeLinecap="round"/></svg>,
            'Users', 'rgba(246,138,41,0.18)'
          )}
        </div>
      )}

      {/* HR Nav */}
      {role === 'hr' && (
        <div className="nav-section">
          <div style={{ padding: '10px 18px 4px', fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>HR Dashboard</div>
          {navItem('hr-impact',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#FFCE00" strokeWidth="1.5"/><path d="M4 9l2-2.5 2 1.5 2-3.5" stroke="#FFCE00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            'L&D Impact', 'rgba(255,206,0,0.2)'
          )}
          {navItem('hr-dashboard',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2.5" stroke="#3699FC" strokeWidth="1.4"/><path d="M4 8.5h2M4 6h6M4 3.5h6" stroke="#3699FC" strokeWidth="1.2" strokeLinecap="round"/></svg>,
            'Cohorts', 'rgba(54,153,252,0.15)'
          )}
          {navItem('hr-create1',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#23CE68" strokeWidth="1.5"/><path d="M7 4v6M4 7h6" stroke="#23CE68" strokeWidth="1.5" strokeLinecap="round"/></svg>,
            'New Cohort', 'rgba(35,206,104,0.15)'
          )}
        </div>
      )}

      {/* Participant Nav */}
      {role === 'participant' && (
        <div className="nav-section">
          <div className="nav-phase-header">
            <div className="nav-phase-dot" style={{ background: '#FFCE00' }}></div>
            <span>Phase 1 — Before Training</span>
          </div>
          {navItem('p-pre-home',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2.5" stroke="#FFCE00" strokeWidth="1.5"/><path d="M4 7h6M7 4v6" stroke="#FFCE00" strokeWidth="1.5" strokeLinecap="round"/></svg>,
            'Checklist', 'rgba(255,206,0,0.15)'
          )}
          <div className="nav-phase-header" style={{ marginTop: 6 }}>
            <div className="nav-phase-dot" style={{ background: '#3696FC' }}></div>
            <span>Phase 2 — Training Day</span>
          </div>
          {navItem('p-training',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#3696FC" strokeWidth="1.5"/><path d="M5.5 4.5l4 2.5-4 2.5V4.5Z" fill="#3696FC"/></svg>,
            'My Commitment', 'rgba(54,150,252,0.15)'
          )}
          <div className="nav-phase-header" style={{ marginTop: 6 }}>
            <div className="nav-phase-dot" style={{ background: '#23CE68' }}></div>
            <span>Phase 3 — Post-Training</span>
          </div>
          {navItem('p-post-home',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#23CE68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            'My Actions & Progress', 'rgba(35,206,104,0.15)'
          )}
          <div style={{ margin: '10px 16px', height: '0.5px', background: 'rgba(255,255,255,0.1)' }} />
          <div className="nav-phase-header">
            <div className="nav-phase-dot" style={{ background: '#F68A29' }}></div>
            <span>Community</span>
          </div>
          {navItem('p-social',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="4.5" r="2" stroke="#F68A29" strokeWidth="1.4"/><circle cx="9.5" cy="4.5" r="2" stroke="#F68A29" strokeWidth="1.4"/><path d="M1 11.5c0-1.933 1.567-3 3.5-3s3.5 1.067 3.5 3" stroke="#F68A29" strokeWidth="1.4" strokeLinecap="round"/></svg>,
            'Community Feed', 'rgba(246,138,41,0.15)'
          )}
        </div>
      )}

      {/* Trainer Nav */}
      {role === 'trainer' && (
        <div className="nav-section">
          <div style={{ padding: '10px 18px 4px', fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Trainer View</div>
          {navItem('t-overview',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="1.5" rx="0.75" fill="#FFCE00"/><rect x="1" y="6" width="8" height="1.5" rx="0.75" fill="#FFCE00" opacity=".6"/><rect x="1" y="9.5" width="10" height="1.5" rx="0.75" fill="#FFCE00" opacity=".4"/></svg>,
            'Pre-Training', 'rgba(255,206,0,0.15)'
          )}
          {navItem('t-liveday',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#3699FC" strokeWidth="1.4"/><path d="M5.5 4.5l4 2.5-4 2.5V4.5Z" fill="#3699FC"/></svg>,
            'Training Day', 'rgba(54,153,252,0.15)'
          )}
          {navItem('t-posttraining',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-6" stroke="#23CE68" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            'Post-Training', 'rgba(35,206,104,0.15)'
          )}
          {navItem('t-community',
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5" cy="5" r="2.5" stroke="#F68A29" strokeWidth="1.4"/><circle cx="9.5" cy="5" r="2" stroke="#F68A29" strokeWidth="1.4"/><path d="M1 12c0-2.2 1.8-4 4-4c2.2 0 4 1.8 4 4" stroke="#F68A29" strokeWidth="1.4" strokeLinecap="round"/></svg>,
            'Community Feed', 'rgba(246,138,41,0.15)'
          )}
        </div>
      )}

      {/* Bottom — user profile + sign out */}
      <div className="nav-bottom">
        <div style={{ padding: '10px 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="user-avatar" style={{ background: avatarColor }}>{initials}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{roleLabel}</div>
          </div>
          <button
            title="Sign out"
            onClick={signOut}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              borderRadius: 8, color: 'rgba(255,255,255,0.4)',
              transition: 'color 0.15s, background 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#ED4551'; (e.target as HTMLElement).style.background = 'rgba(237,69,81,0.12)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; (e.target as HTMLElement).style.background = 'none'; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
