'use client';

import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
}

export default function DetailLive({ onNavigate }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">High Performance Teams — Meridian Corp</div>
        <div className="topbar-right"><button className="btn-emerald" style={{ fontSize: 12 }}>Session is live ●</button></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('hr-impact')}>← Back to cohorts</button>
        <div className="detail-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#3696FC', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Training Day — Live Now</div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>High Performance Teams</h2>
            <p style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>Meridian Corp · 8 Apr 2025 · Trainer: Ankit K. · Session started 2 hrs ago</p>
          </div>
          <span className="tag tag-blue">Training day</span>
        </div>

        <div style={{ background: '#3696FC', borderRadius: 14, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Session is in progress. Commitment plans are being submitted live.</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Attendance: 28 / 30 present</div>
        </div>

        <div className="stat-grid-4">
          {[
            { val: 30, label: 'Total participants', color: '#3696FC' },
            { val: 28, label: 'Attended today', color: '#23CE68' },
            { val: 19, label: 'Plans submitted', color: '#FFCE00' },
            { val: '9 !', label: 'Yet to submit', color: '#ED4551' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Commitment submission — live</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#6B6B6B' }}>Submitted</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#23CE68' }}>19 of 28</span>
              </div>
              <div className="progress-bar-wrap" style={{ height: 10, borderRadius: 999 }}><div className="progress-bar-fill" style={{ height: 10, width: '68%', background: '#23CE68' }}></div></div>
            </div>
            <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 10 }}>Still waiting on:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[['VN','Vikram N.','#ED4551'],['SM','Sunita M.','#ED4551'],['RK','Rohan K.','#F68A29'],['NJ','Nisha J.','#F68A29']].map(([i,n,c],idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF3F3', border: '0.5px solid #F0C0C0', borderRadius: 10, padding: '7px 10px' }}>
                  <div className="avatar avatar-sm" style={{ background: c }}>{i}</div>
                  <span style={{ fontSize: 12 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Actions committed so far</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#623CEA', lineHeight: 1, marginBottom: 6 }}>142</div>
            <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16 }}>Total actions selected by 19 participants</div>
            <div style={{ background: '#F9F8F4', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 8 }}>Avg actions per participant</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#623CEA' }}>7.5</div>
              <div style={{ fontSize: 11, color: '#F68A29', marginTop: 4 }}>Below recommended 9 — consider encouraging more selections</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Top actions selected by the group</div>
          {[
            ['Have one SBI feedback conversation with each direct report', 16],
            ['Recognise one team member publicly for specific behaviour', 14],
            ['Use coaching questions instead of giving answers in 1:1s', 12],
          ].map(([action, count], i) => (
            <div key={i} className="exp-item">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13 }}>{action}</span>
                <span className="tag tag-purple" style={{ fontSize: 10, padding: '2px 8px' }}>{count} selected</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <button className="btn-outline" style={{ fontSize: 12, padding: '6px 16px' }}>Download full action summary</button>
          </div>
        </div>
      </div>
    </div>
  );
}
