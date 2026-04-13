'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

const ACTIONS = [
  { id: 1, title: 'Identify 3 direct reports who need feedback', cat: 'Feedback', status: 'done' },
  { id: 2, title: 'Prepare SBI notes for the first conversation', cat: 'Feedback', status: 'done' },
  { id: 3, title: 'Conduct all 3 feedback conversations', cat: 'Feedback', status: 'active' },
  { id: 4, title: 'Recognise one team member publicly', cat: 'Coaching', status: 'pending' },
  { id: 5, title: 'Ask manager for feedback on one specific behaviour', cat: 'Self-leadership', status: 'pending' },
  { id: 6, title: 'Use coaching questions instead of giving answers in 1:1s', cat: 'Coaching', status: 'pending' },
  { id: 7, title: 'Block 30 min weekly for leadership reflection', cat: 'Self-leadership', status: 'done' },
  { id: 8, title: 'Give one team member a stretch assignment', cat: 'Coaching', status: 'pending' },
  { id: 9, title: 'Create a development plan for highest-potential team member', cat: 'Coaching', status: 'pending' },
];

export default function PostHome({ onNavigate, onToast }: Props) {
  const [actions, setActions] = useState(ACTIONS);

  const markDone = (id: number) => {
    setActions(prev => prev.map(a => a.id === id && a.status !== 'done' ? { ...a, status: 'done' } : a));
    onToast('Action marked as done! +10 XP 🎉', '#23CE68');
  };

  const doneCount = actions.filter(a => a.status === 'done').length;
  const pct = Math.round(doneCount / actions.length * 100);

  const catColors: Record<string, string> = {
    'Feedback': '#623CEA',
    'Coaching': '#3696FC',
    'Self-leadership': '#F68A29',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">My Actions &amp; Progress</div>
        <div className="topbar-right"><span className="tag tag-green">Post-training</span></div>
      </div>
      <div className="content">
        <div style={{ display: 'flex', gap: 16 }}>
          {/* LEFT 75% */}
          <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
            {/* Gamified Hero */}
            <div style={{ background: 'linear-gradient(135deg,#221D23 0%,#1A1035 50%,#2E1A3A 100%)', borderRadius: 22, padding: 24, marginBottom: 16, position: 'relative', overflow: 'hidden', animation: 'fadeUp 0.3s ease both' }}>
              <div style={{ position: 'absolute', top: -25, right: -25, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,206,0,0.12),transparent 70%)' }}></div>
              <div style={{ position: 'absolute', bottom: -20, left: 20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(98,60,234,0.15),transparent 70%)' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                  <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
                    <circle cx="36" cy="36" r="30" fill="none" stroke="url(#xpGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="188" strokeDashoffset={188 - (pct / 100 * 188)}/>
                    <defs><linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFCE00"/><stop offset="100%" stopColor="#F68A29"/></linearGradient></defs>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#FFCE00', lineHeight: 1 }}>{doneCount * 10}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>XP</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#FFCE00' }}>Level {doneCount >= 7 ? 3 : doneCount >= 4 ? 2 : 1}</span>
                    <span style={{ background: 'linear-gradient(135deg,#FFCE00,#F68A29)', color: '#221D23', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>RISING STAR ⭐</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Keep going — nudges arrive daily 🚀</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {[
                  { val: actions.length, label: 'Committed', color: '#623CEA' },
                  { val: doneCount, label: 'Done ✓', color: '#23CE68' },
                  { val: 10, label: 'Days left', color: '#F68A29' },
                  { val: '#8', label: 'Rank', color: '#FFCE00' },
                ].map((s, i) => (
                  <div key={i} style={{ background: `rgba(${s.color === '#623CEA' ? '98,60,234' : s.color === '#23CE68' ? '35,206,104' : s.color === '#F68A29' ? '246,138,41' : '255,206,0'},0.15)`, borderRadius: 12, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>🎯 Actions</div>
              <span style={{ fontSize: 12, color: '#6B6B6B' }}>{doneCount} of {actions.length} done</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className="progress-bar-wrap" style={{ marginBottom: 5 }}><div className="progress-bar-fill" style={{ width: `${pct}%`, background: '#623CEA' }}></div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 11, color: '#8A8090' }}>Progress</span><span style={{ fontSize: 11, fontWeight: 700, color: '#623CEA' }}>{pct}%</span></div>
            </div>

            {/* Actions list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
              {actions.map(action => {
                const catColor = catColors[action.cat] || '#623CEA';
                if (action.status === 'done') return (
                  <div key={action.id} style={{ background: '#F0FFF7', border: '2px solid #23CE68', borderRadius: 14, padding: 14, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, position: 'relative' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#221D23', lineHeight: 1.4, textDecoration: 'line-through' }}>{action.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <span style={{ background: '#23CE68', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{action.cat}</span>
                        <span style={{ fontSize: 10, color: '#23CE68', fontWeight: 600 }}>✓ Done</span>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" fill="#23CE68"/><path d="M7 11l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                );
                if (action.status === 'active') return (
                  <div key={action.id} style={{ background: '#FFFBEE', border: '2px solid #FFCE00', borderRadius: 14, padding: 14, cursor: 'pointer', transition: 'all 0.15s' }} onMouseOver={e => { e.currentTarget.style.borderColor = '#F68A29'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = '#FFCE00'; e.currentTarget.style.transform = ''; }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', lineHeight: 1.4, marginBottom: 8 }}>{action.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ background: '#FFCE00', color: '#221D23', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{action.cat}</span>
                      <span style={{ fontSize: 10, color: '#F68A29', fontWeight: 600 }}>In progress</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); markDone(action.id); }} style={{ background: '#FFCE00', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#221D23', fontFamily: 'Inter, sans-serif' }}>✓ Mark done</button>
                  </div>
                );
                return (
                  <div key={action.id} style={{ background: '#fff', border: '1.5px solid rgba(34,29,35,0.1)', borderRadius: 14, padding: 14, cursor: 'pointer', transition: 'all 0.15s' }} onMouseOver={e => { e.currentTarget.style.borderColor = '#FFCE00'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(34,29,35,0.1)'; e.currentTarget.style.transform = ''; }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', lineHeight: 1.4, marginBottom: 8 }}>{action.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ background: '#D4D4D8', color: '#6B6B6B', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{action.cat}</span>
                      <span style={{ fontSize: 10, color: '#6B6B6B', fontWeight: 600 }}>Pending</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); markDone(action.id); }} style={{ background: '#FFF6CF', border: '1.5px solid #FFCE00', borderRadius: 10, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#221D23', fontFamily: 'Inter, sans-serif' }}>✓ Mark done</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 25% */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto', paddingRight: 8 }}>
            {/* Achievements */}
            <div style={{ background: '#fff', borderRadius: 14, padding: 14, border: '1px solid rgba(34,29,35,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 18 }}>🏆</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23' }}>Achievements</div>
                <span style={{ fontSize: 10, color: '#6B6B6B', marginLeft: 'auto' }}>{doneCount >= 1 ? Math.min(doneCount, 3) : 0} of 8</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { emoji: '🚀', label: 'First', done: doneCount >= 1, bg: 'linear-gradient(135deg,#FFCE00,#F68A29)' },
                  { emoji: '🔥', label: 'Streak', done: doneCount >= 2, bg: 'linear-gradient(135deg,#23CE68,#45DD85)' },
                  { emoji: '💬', label: 'Feedback', done: doneCount >= 3, bg: 'linear-gradient(135deg,#623CEA,#7B5CEA)' },
                ].map((a, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: a.done ? a.bg : 'rgba(34,29,35,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, margin: '0 auto 4px', opacity: a.done ? 1 : 0.4 }}>{a.emoji}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: '#221D23', lineHeight: 1.1 }}>{a.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill glow-up */}
            <div style={{ background: '#fff', borderRadius: 14, padding: 14, border: '1px solid rgba(34,29,35,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#221D23', marginBottom: 10 }}>💪 Skill glow-up</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#ED4551' }}>4</span>
                <div style={{ fontSize: 11, color: '#6B6B6B' }}>→</div>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#23CE68' }}>7</span>
                <span style={{ fontSize: 11, color: '#23CE68', fontWeight: 600 }}>(+3)</span>
              </div>
              <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 6 }}>Leadership rating</div>
            </div>

            {/* Rank */}
            <div style={{ background: '#fff', borderRadius: 14, padding: 14, border: '1px solid rgba(34,29,35,0.07)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#221D23', marginBottom: 12 }}>📊 Leaderboard</div>
              {[
                { rank: 1, name: 'Sanjay K.', pct: 89, color: '#FFCE00', top: true },
                { rank: 2, name: 'Ananya T.', pct: 78, color: '#C0C0C0', top: true },
                { rank: 3, name: 'Rahul M.', pct: 67, color: '#CD7F32', top: true },
                { rank: 8, name: 'Priya R. (you)', pct: pct, color: '#623CEA', top: false },
              ].map((p, i) => (
                <div key={i} className="lb-row">
                  <div className={`lb-rank ${p.top ? 'top' : ''}`}>#{p.rank}</div>
                  <div className="avatar avatar-sm" style={{ background: p.color }}>{p.name.slice(0,2).toUpperCase()}</div>
                  <div style={{ flex: 1, fontSize: 12, fontWeight: p.name.includes('you') ? 700 : 500 }}>{p.name}</div>
                  <span style={{ fontSize: 11, color: '#6B6B6B' }}>{p.pct}%</span>
                </div>
              ))}
            </div>

            {/* Buddy */}
            <div style={{ background: '#F0FFF7', border: '1.5px solid #23CE68', borderRadius: 14, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar avatar-sm" style={{ background: '#23CE68' }}>SK</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#221D23' }}>Sanjay Kumar</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B' }}>Your accountability buddy</div>
                </div>
              </div>
              <button className="btn-outline" style={{ width: '100%', marginTop: 10, fontSize: 11, padding: '6px 0' }}>📩 Send check-in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
