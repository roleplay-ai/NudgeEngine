'use client';

import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
}

export default function CohortList({ onNavigate }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">All Cohorts</div>
        <div className="topbar-right">
          <button className="btn-primary" onClick={() => onNavigate('hr-create1')}>+ New Cohort</button>
        </div>
      </div>
      <div className="content">
        <div className="stat-grid-4">
          <div className="stat-card"><div className="stat-num" style={{ color: '#623CEA' }}>6</div><div className="stat-label">Active cohorts</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: '#FFCE00' }}>148</div><div className="stat-label">Total participants</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: '#23CE68' }}>72%</div><div className="stat-label">Avg action completion</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: '#ED4551' }}>11 <span className="badge-num">!</span></div><div className="stat-label">Inactive users</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>Training Cohorts</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="tab-btn active" style={{ fontSize: 11, padding: '5px 12px' }}>All</button>
            <button className="tab-btn" style={{ fontSize: 11, padding: '5px 12px' }}>Active</button>
            <button className="tab-btn" style={{ fontSize: 11, padding: '5px 12px' }}>Completed</button>
          </div>
        </div>
        <div className="cohort-grid">
          {/* Post-training cohort */}
          <div className="cohort-card" onClick={() => onNavigate('hr-detail-post')}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <span className="tag tag-green" style={{ fontSize: 10, padding: '3px 10px', marginBottom: 8, display: 'inline-block' }}>Post-training</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23', lineHeight: 1.35 }}>People Leadership Programme</div>
                <div style={{ fontSize: 11, color: '#8A8090', marginTop: 3 }}>14 Apr 2025 · Full day</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="avatar avatar-sm" style={{ background: '#F68A29', fontSize: 9 }}>GP</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>Gaurav Patel</div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: '#6B6B6B' }}>24 / 28 participants</div>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#6B6B6B' }}>Action completion</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#23CE68' }}>78%</span>
            </div>
            <div className="progress-bar-wrap prog-sm"><div className="progress-bar-fill prog-sm" style={{ width: '78%', background: '#23CE68' }}></div></div>
          </div>

          {/* Pre-training cohort */}
          <div className="cohort-card" onClick={() => onNavigate('hr-detail-pre')}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <span className="tag tag-amber" style={{ fontSize: 10, padding: '3px 10px', marginBottom: 8, display: 'inline-block' }}>Pre-training</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23', lineHeight: 1.35 }}>Conflict Resolution Masterclass</div>
                <div style={{ fontSize: 11, color: '#8A8090', marginTop: 3 }}>22 Apr 2025 · Half day</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="avatar avatar-sm" style={{ background: '#623CEA', fontSize: 9 }}>MR</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>Meera Rao</div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: '#6B6B6B' }}>18 / 20 confirmed</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFCE00', animation: 'pulse-slow 1.5s infinite' }}></div>
              <span style={{ fontSize: 11, color: '#8A8090' }}>Pre-reads: 12 of 18 completed</span>
            </div>
          </div>

          {/* Live training */}
          <div className="cohort-card" onClick={() => onNavigate('hr-detail-live')} style={{ borderColor: '#3696FC', background: 'linear-gradient(135deg,#fff 0%,#F0F7FF 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <span className="tag tag-blue" style={{ fontSize: 10, padding: '3px 10px', marginBottom: 8, display: 'inline-block' }}>🔴 Live now</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23', lineHeight: 1.35 }}>High Performance Teams</div>
                <div style={{ fontSize: 11, color: '#8A8090', marginTop: 3 }}>Today · Full day · In person</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="avatar avatar-sm" style={{ background: '#23CE68', fontSize: 9 }}>AK</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>Ankit Kumar</div>
              <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#3696FC' }}>30 / 30 present</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ED4551' }} className="ping"></div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#3696FC' }}>Session in progress · Task 2 of 4</span>
            </div>
          </div>

          {/* Completed */}
          <div className="cohort-card" onClick={() => onNavigate('hr-detail-post')} style={{ opacity: 0.85 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <span className="tag tag-grey" style={{ fontSize: 10, padding: '3px 10px', marginBottom: 8, display: 'inline-block' }}>Completed</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23', lineHeight: 1.35 }}>Coaching Skills for Leaders</div>
                <div style={{ fontSize: 11, color: '#8A8090', marginTop: 3 }}>1 Apr 2025 · Full day</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="avatar avatar-sm" style={{ background: '#F68A29', fontSize: 9 }}>GP</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>Gaurav Patel</div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: '#6B6B6B' }}>45 / 45 participants</div>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#6B6B6B' }}>Final completion rate</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#623CEA' }}>65%</span>
            </div>
            <div className="progress-bar-wrap prog-sm"><div className="progress-bar-fill prog-sm" style={{ width: '65%', background: '#623CEA' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
