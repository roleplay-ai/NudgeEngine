'use client';

import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
  onToast?: (msg: string, color: string) => void;
}

export default function DetailPre({ onNavigate, onToast }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Conflict Resolution Masterclass — Meridian Corp</div>
        <div className="topbar-right"><button className="btn-primary" style={{ fontSize: 12 }}>Send login credentials</button></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('hr-impact')}>← Back to cohorts</button>
        <div className="detail-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#F68A29', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Pre-Training Phase</div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Conflict Resolution Masterclass</h2>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>Meridian Corp · 22 Apr 2025 · Trainer: Meera R. · Starts in 8 days</p>
          </div>
          <span className="tag tag-amber">Pre-training</span>
        </div>

        {/* AI Insights */}
        <div className="card" style={{ background: 'linear-gradient(135deg,#221D23 0%,#2E2433 100%)', border: 'none', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,206,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🧠</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FFCE00', textTransform: 'uppercase', letterSpacing: '1.5px' }}>AI Insights</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Based on expectations submitted by 11 of 14 confirmed participants</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[
              { color: '#F68A29', label: 'Top theme', text: 'Giving feedback without damaging relationships', sub: '8 of 11 participants' },
              { color: '#3699FC', label: 'Starting level', text: 'Average 3.4 / 10 — mostly beginners', sub: 'Pitch content at introductory level' },
              { color: '#ED4551', label: 'Common blocker', text: 'Fear of demotivating team members', sub: '7 participants flagged this' },
              { color: '#23CE68', label: 'Group energy', text: 'Mostly nervous but motivated', sub: 'Based on tone analysis' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,206,0,0.1)', border: '1px solid rgba(255,206,0,0.2)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ fontSize: 14, flexShrink: 0 }}>💡</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}><strong style={{ color: '#FFCE00' }}>Recommended for trainer:</strong> Open with a normalising story about giving feedback — 7 people are anxious about demotivating their team. Use roleplay early to reduce fear before theory.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button className="btn-primary" style={{ fontSize: 12, padding: '7px 16px' }}>Share brief with trainer</button>
            <button className="btn-outline" style={{ fontSize: 12, padding: '7px 16px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>View all responses</button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="detail-grid-3" style={{ marginBottom: 20 }}>
          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Confirmation status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#E8E6DC" strokeWidth="8"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#FFCE00" strokeWidth="8" strokeDasharray="101 100" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900 }}>14</div>
                  <div style={{ fontSize: 10, color: '#6B6B6B' }}>of 20</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {[['Confirmed','14','tag-amber'],['No response','5','tag-red'],['Declined','1','tag-grey']].map(([l,v,c],i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12 }}>{l}</span><span className={`tag ${c}`} style={{ fontSize: 10, padding: '2px 8px' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 14 }}><button className="btn-outline" style={{ fontSize: 11, padding: '5px 14px', width: '100%' }}>Send chaser to 5 non-responders</button></div>
          </div>

          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Expectations filled</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#FFCE00', lineHeight: 1 }}>11 <span style={{ fontSize: 16, fontWeight: 500, color: '#6B6B6B' }}>of 14</span></div>
            <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 4, marginBottom: 12 }}>3 confirmed participants haven't shared yet</div>
            <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: '79%', background: '#FFCE00' }}></div></div>
            <div style={{ marginTop: 14 }}>
              <div className="exp-item"><div style={{ fontSize: 13 }}>Handle conflict without escalation</div><div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>7 participants</div></div>
              <div className="exp-item"><div style={{ fontSize: 13 }}>Stay calm under pressure</div><div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>4 participants</div></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Skill self-assessment</div>
            {[
              { label: 'Level 1–2 (Low)', val: '5 people', pct: 45, color: '#ED4551' },
              { label: 'Level 3–4 (Mid)', val: '6 people', pct: 55, color: '#FFCE00' },
              { label: 'Level 5+ (High)', val: '3 people', pct: 27, color: '#23CE68' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#6B6B6B' }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.val}</span>
                </div>
                <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color }}></div></div>
              </div>
            ))}
            <div style={{ marginTop: 12, background: '#FFFBEE', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#221D23' }}>Avg starting level: <strong>3.1 / 7</strong> — pitch content at intermediate level</div>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Who has confirmed</div>
            {[
              { i: 'PR', name: 'Priya Rao', dept: 'People Manager', color: '#623CEA', status: 'Confirmed', s: 'tag-green' },
              { i: 'SK', name: 'Sanjay Kumar', dept: 'Operations Lead', color: '#23CE68', status: 'Confirmed', s: 'tag-green' },
              { i: 'VN', name: 'Vikram Nair', dept: 'Team Lead', color: '#ED4551', status: 'No response', s: 'tag-red' },
              { i: 'SM', name: 'Sunita Mehta', dept: 'HR Analyst', color: '#ED4551', status: 'No response', s: 'tag-red' },
            ].map((p, idx) => (
              <div key={idx} className="participant-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="avatar avatar-sm" style={{ background: p.color }}>{p.i}</div>
                  <div><div className="participant-name">{p.name}</div><div className="participant-dept">{p.dept}</div></div>
                </div>
                <span className={`tag ${p.s}`} style={{ fontSize: 10 }}>{p.status}</span>
              </div>
            ))}
            <div style={{ marginTop: 12 }}><button className="action-btn" style={{ fontSize: 12 }}>View all 20 participants →</button></div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Trainer summary ready</div>
            <div style={{ background: '#F0FFF7', border: '0.5px solid #23CE68', borderRadius: 12, padding: 16, marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#221D23', marginBottom: 6 }}>AI-generated trainer brief</div>
              <p style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.6 }}>14 of 20 participants confirmed. Top expectation: handling conflict without escalation (7 people). Average skill level is 3.1/7 — pitch at intermediate. 3 people already have strong conflict resolution skills and may benefit from advanced scenarios.</p>
            </div>
            <button className="btn-primary" style={{ width: '100%', fontSize: 12 }}>Send brief to Meera R.</button>
          </div>
        </div>
      </div>
    </div>
  );
}
