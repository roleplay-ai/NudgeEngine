'use client';

import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
  onToggleImpactView?: (view: 'training' | 'pillar') => void;
}

export default function LDImpact({ onNavigate }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">L&amp;D Impact</div>
        <div className="topbar-right">
          <button className="btn-primary" style={{ fontSize: 12, padding: '7px 16px' }}>📄 Export PDF</button>
        </div>
      </div>
      <div className="content">
        {/* Hero Summary */}
        <div style={{ background: 'linear-gradient(135deg,#221D23 0%,#2E1A3A 100%)', borderRadius: 20, padding: 22, marginBottom: 20, animation: 'fadeUp 0.3s ease both' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,206,0,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>FY 2025 · Meridian Corp · L&D Impact Dashboard</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, background: 'rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
            {[
              { val: '4', label: 'Programmes', color: '#FFCE00' },
              { val: '168', label: 'Participants', color: '#23CE68' },
              { val: '1,142', label: 'Actions driven', color: '#F68A29' },
              { val: '156', label: 'Commitments', color: '#3696FC' },
              { val: '+2.1', label: 'Avg skill gain', color: '#623CEA' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 10px', textAlign: 'center', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.val}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Impact Factors */}
        <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23', marginBottom: 14 }}>📊 Key impact factors</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 20 }}>
          <div style={{ background: 'linear-gradient(160deg,#F0FFF7,#D6F5E5)', borderRadius: 16, padding: 16, border: '1.5px solid rgba(35,206,104,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>💪</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#23CE68' }}>93%</div>
            <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 4, lineHeight: 1.3 }}>Retention rate<br/><span style={{ color: '#23CE68', fontWeight: 600 }}>7% dropped out</span></div>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#FFF6CF,#FFEFB0)', borderRadius: 16, padding: 16, border: '1.5px solid rgba(255,206,0,0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>⭐</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#B87E00' }}>4.6<span style={{ fontSize: 13, fontWeight: 500 }}>/5</span></div>
            <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 4, lineHeight: 1.3 }}>Avg programme<br/>rating</div>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#F3EEFF,#E0D5FF)', borderRadius: 16, padding: 16, border: '1.5px solid rgba(98,60,234,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🎯</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#623CEA' }}>156</div>
            <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 4, lineHeight: 1.3 }}>Commitment<br/>plans created</div>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#FFF3EB,#FFE4CC)', borderRadius: 16, padding: 16, border: '1.5px solid rgba(246,138,41,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>⚡</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#F68A29' }}>1,142</div>
            <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 4, lineHeight: 1.3 }}>Real-world<br/>actions completed</div>
          </div>
          <div style={{ background: 'linear-gradient(160deg,#EFF6FF,#D5E8FF)', borderRadius: 16, padding: 16, border: '1.5px solid rgba(54,150,252,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📈</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#3696FC' }}>+34%</div>
            <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 4, lineHeight: 1.3 }}>Self-assessed<br/>confidence lift</div>
          </div>
        </div>

        {/* All Cohorts Table */}
        <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23', marginBottom: 14 }}>📋 Detailed impact — All Cohorts</div>
        <div className="data-table" style={{ marginBottom: 20 }}>
          <div className="table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr' }}>
            <div className="th">Cohort</div>
            <div className="th">Nominated</div>
            <div className="th">Attended</div>
            <div className="th">Status</div>
            <div className="th">Completion</div>
            <div className="th">Avg actions</div>
          </div>
          {[
            { name: 'People Leadership Programme', date: '14 Apr 2025', nominated: 28, attended: '24 (86%)', status: 'Post-training', statusClass: 'tag-green', completion: '78%', avg: '7.8', screen: 'hr-detail-post' as HRScreen },
            { name: 'Conflict Resolution Masterclass', date: '22 Apr 2025', nominated: 20, attended: '—', status: 'Pre-training', statusClass: 'tag-amber', completion: '—', avg: '—', screen: 'hr-detail-pre' as HRScreen },
            { name: 'High Performance Teams', date: '8 Apr 2025', nominated: 30, attended: '28 (93%)', status: 'Training day', statusClass: 'tag-blue', completion: '—', avg: '—', screen: 'hr-detail-live' as HRScreen },
            { name: 'Coaching Skills for Leaders', date: '1 Apr 2025', nominated: 45, attended: '45 (100%)', status: 'Completed', statusClass: 'tag-grey', completion: '65%', avg: '8.2', screen: 'hr-detail-post' as HRScreen },
          ].map((row, i) => (
            <div key={i} className="table-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr' }} onClick={() => onNavigate(row.screen)}>
              <div className="td"><div className="col-name">{row.name}</div><div className="td-muted">{row.date}</div></div>
              <div className="td">{row.nominated}</div>
              <div className="td">{row.attended}</div>
              <div className="td"><span className={`tag ${row.statusClass}`} style={{ fontSize: 11 }}>{row.status}</span></div>
              <div className="td">{row.completion}</div>
              <div className="td">{row.avg}</div>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 16 }}>Training funnel — all cohorts</div>
          {[
            { label: 'Nominated', count: 168, pct: 100, color: '#221D23' },
            { label: 'Attended training', count: 143, pct: 85, color: '#623CEA' },
            { label: 'Committed to actions', count: 138, pct: 82, color: '#F68A29' },
            { label: 'Followed through on actions', count: 99, pct: 59, color: '#23CE68' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 12, color: '#6B6B6B' }}>{item.count} ({item.pct}%)</span>
              </div>
              <div className="progress-bar-wrap" style={{ height: 14, borderRadius: 6 }}>
                <div className="progress-bar-fill" style={{ width: `${item.pct}%`, background: item.color, height: 14, borderRadius: 6 }}></div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, background: '#FFF6CF', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#221D23' }}>
            💡 <strong>41% of nominated employees did not follow through.</strong> Closing this gap is the highest-leverage opportunity for L&D ROI.
          </div>
        </div>
      </div>
    </div>
  );
}
