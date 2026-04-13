'use client';

import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
  onToast?: (msg: string, color: string) => void;
}

export default function DetailPost({ onNavigate, onToast }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">People Leadership Programme — Meridian Corp</div>
        <div className="topbar-right">
          <button className="btn-outline" style={{ fontSize: 12 }}>Download report</button>
          <button className="btn-dark" style={{ fontSize: 12 }}>Send Manager FYI</button>
        </div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('hr-impact')}>← Back to cohorts</button>
        <div className="detail-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#23CE68', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Post-Training Phase</div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>People Leadership Programme</h2>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>Meridian Corp · 14 Apr 2025 · Trainer: Gaurav Patel · 10 days remaining</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className="tag tag-green">Post-training</span>
            <button className="btn-primary" style={{ fontSize: 12 }}>Send group nudge</button>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 14, marginBottom: 24 }}>
          {[
            { val: 24, label: 'Participants', color: '#623CEA' },
            { val: 186, label: 'Actions committed', color: '#23CE68' },
            { val: 145, label: 'Actions completed', color: '#FFCE00' },
            { val: '78%', label: 'Completion rate', color: '#F68A29' },
            { val: 4, label: 'Inactive users', color: '#ED4551' },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ padding: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="two-col" style={{ marginBottom: 20 }}>
          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px' }}>Action completion trend</div>
                <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>Cumulative actions done per day</div>
              </div>
              <span className="tag tag-green" style={{ fontSize: 10 }}>+145 total</span>
            </div>
            <svg viewBox="0 0 320 140" width="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#623CEA" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#623CEA" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[110,80,50,20].map((y,i) => <line key={i} x1="0" y1={y} x2="320" y2={y} stroke="#F2F0EA" strokeWidth="1"/>)}
              <path d="M20,110 L60,105 L100,98 L140,88 L180,72 L220,55 L260,38 L300,20 L300,110 Z" fill="url(#areaGrad)"/>
              <polyline points="20,110 60,105 100,98 140,88 180,72 220,55 260,38 300,20" fill="none" stroke="#623CEA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {[[20,110],[60,105],[100,98],[140,88],[180,72],[220,55],[260,38]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3.5" fill="#623CEA"/>)}
              <circle cx="300" cy="20" r="5" fill="#623CEA" stroke="#fff" strokeWidth="2"/>
              {['Day 1','Day 3','Day 5','Day 7'].map((t,i) => <text key={i} x={17+i*80} y="126" fontSize="9" fill="#B4B2A9">{t}</text>)}
            </svg>
          </div>

          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 16 }}>Completion distribution</div>
            {[
              { label: '90–100% done', val: '6 people', pct: 25, color: '#23CE68' },
              { label: '60–89% done', val: '9 people', pct: 37, color: '#623CEA' },
              { label: '30–59% done', val: '5 people', pct: 21, color: '#FFCE00' },
              { label: '0–29% done', val: '4 people', pct: 17, color: '#ED4551' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>{item.val}</span>
                </div>
                <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color }}></div></div>
              </div>
            ))}
            <div style={{ marginTop: 14, background: '#F0FFF7', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#221D23' }}>
              <strong>15 of 24</strong> participants are at 60%+ completion — well above the platform average of 58%.
            </div>
          </div>
        </div>

        {/* Participant table + Inactive alerts */}
        <div className="two-col">
          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Participant progress</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 0, marginBottom: 8, paddingBottom: 8, borderBottom: '0.5px solid #E8E6DC' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B' }}>Name</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textAlign: 'center', padding: '0 12px' }}>Actions</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textAlign: 'center' }}>Confidence</span>
            </div>
            {[
              { initials: 'PR', name: 'Priya Rao', color: '#623CEA', actions: '9/9', pct: 90, conf: '7/10', confColor: 'tag-green' },
              { initials: 'SK', name: 'Sanjay Kumar', color: '#23CE68', actions: '7/9', pct: 78, conf: '6/10', confColor: 'tag-green' },
              { initials: 'AT', name: 'Ananya Tiwari', color: '#F68A29', actions: '5/9', pct: 55, conf: '5/10', confColor: 'tag-amber' },
              { initials: 'VN', name: 'Vikram Nair', color: '#ED4551', actions: '0/9', pct: 0, conf: '4/10', confColor: 'tag-red' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 0, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '0.5px solid #F2F0EA' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div className="avatar avatar-sm" style={{ background: p.color }}>{p.initials}</div><span style={{ fontSize: 13 }}>{p.name}</span></div>
                <div style={{ padding: '0 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="progress-bar-wrap prog-sm" style={{ width: 60 }}><div className="progress-bar-fill prog-sm" style={{ width: `${p.pct}%`, background: p.pct === 0 ? '#ED4551' : p.pct >= 78 ? '#23CE68' : '#FFCE00' }}></div></div>
                    <span style={{ fontSize: 11, color: p.pct === 0 ? '#ED4551' : '#6B6B6B' }}>{p.actions}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}><span className={`tag ${p.confColor}`} style={{ fontSize: 10, padding: '2px 8px' }}>{p.conf}</span></div>
              </div>
            ))}
            <div style={{ marginTop: 10 }}><button className="action-btn" style={{ fontSize: 12 }}>View all 24 participants →</button></div>
          </div>

          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Inactive participants <span className="badge-num" style={{ marginLeft: 4 }}>4</span></div>
            {[
              { i: 'VN', name: 'Vikram Nair', info: 'No activity in 6 days · 0 of 9 done', color: '#ED4551' },
              { i: 'SM', name: 'Sunita Mehta', info: 'No activity in 5 days · 1 of 7 done', color: '#ED4551' },
              { i: 'RK', name: 'Rohan Kapoor', info: 'No activity in 4 days · 2 of 8 done', color: '#F68A29' },
              { i: 'NJ', name: 'Nisha Joshi', info: 'No activity in 3 days · 1 of 6 done', color: '#F68A29' },
            ].map((p, idx) => (
              <div key={idx} className="alert-row">
                <div className="avatar avatar-sm" style={{ background: p.color }}>{p.i}</div>
                <div><div className="alert-name">{p.name}</div><div className="alert-info">{p.info}</div></div>
                <button className="btn-outline" style={{ fontSize: 11, padding: '4px 10px', marginLeft: 'auto' }}>Notify</button>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <button className="btn-dark" style={{ width: '100%', fontSize: 12, padding: 10, borderRadius: 999 }}>Notify all 4 managers at once</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
