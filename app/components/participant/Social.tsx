'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

export default function Social({ onNavigate, onToast }: Props) {
  const [tab, setTab] = useState<'lb' | 'wins'>('lb');
  const [winInput, setWinInput] = useState('');
  const [wins, setWins] = useState([
    { initials: 'SK', name: 'Sanjay Kumar', color: '#23CE68', text: 'Had my first SBI feedback conversation with Ravi today. He actually thanked me for being specific! Huge win.', likes: 8 },
    { initials: 'RM', name: 'Rahul Mehta', color: '#3696FC', text: 'Finally used coaching questions instead of just telling my team member what to do. Took longer but he came up with a better solution than I would have!', likes: 12 },
  ]);
  const [likedWins, setLikedWins] = useState<Set<number>>(new Set());

  const postWin = () => {
    if (!winInput.trim()) return;
    setWins(prev => [{ initials: 'PR', name: 'Priya Rao', color: '#623CEA', text: winInput.trim(), likes: 0 }, ...prev]);
    setWinInput('');
    onToast('Win posted! Your group can see it now.', '#23CE68');
  };

  const toggleWinLike = (i: number) => setLikedWins(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Community Feed</div>
        <div className="topbar-right"><span className="tag tag-green">Post-training</span></div>
      </div>
      <div className="content">
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: '#F2F0EA', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          <button className={`social-tab ${tab === 'lb' ? 'active' : ''}`} onClick={() => setTab('lb')}>🏆 Leaderboard</button>
          <button className={`social-tab ${tab === 'wins' ? 'active' : ''}`} onClick={() => setTab('wins')}>🎉 Wins Feed</button>
        </div>

        {tab === 'lb' && (
          <div>
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', marginBottom: 4 }}>People Leadership Programme</div>
              <div style={{ fontSize: 11, color: '#6B6B6B', marginBottom: 16 }}>14 days post-training · 24 participants</div>
              {[
                { rank: 1, initials: 'SK', name: 'Sanjay Kumar', pct: 89, done: '8/9', color: '#23CE68', medal: '🥇' },
                { rank: 2, initials: 'AT', name: 'Ananya Tiwari', pct: 78, done: '7/9', color: '#F68A29', medal: '🥈' },
                { rank: 3, initials: 'RM', name: 'Rahul Mehta', pct: 67, done: '6/9', color: '#3696FC', medal: '🥉' },
                { rank: 4, initials: 'VG', name: 'Vinay Gupta', pct: 56, done: '5/9', color: '#623CEA', medal: '' },
                { rank: 5, initials: 'NP', name: 'Neha Patil', pct: 44, done: '4/9', color: '#FFCE00', medal: '' },
                { rank: 8, initials: 'PR', name: 'Priya Rao (you)', pct: 33, done: '3/9', color: '#623CEA', medal: '' },
              ].map((p, i) => (
                <div key={i} className="lb-row">
                  <div className={`lb-rank ${p.rank <= 3 ? 'top' : ''}`}>{p.medal || `#${p.rank}`}</div>
                  <div className="avatar avatar-sm" style={{ background: p.color }}>{p.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: p.name.includes('you') ? 700 : 500 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>{p.done} actions</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: p.rank <= 3 ? '#FFCE00' : '#221D23' }}>{p.pct}%</div>
                    <div className="progress-bar-wrap prog-sm" style={{ width: 60, marginTop: 4 }}>
                      <div className="progress-bar-fill prog-sm" style={{ width: `${p.pct}%`, background: p.rank <= 3 ? '#FFCE00' : '#623CEA' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#FFF6CF', border: '1.5px solid #FFCE00', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>💪</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23' }}>You're at #8 — keep going!</div>
                <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>Complete 2 more actions to move to #5</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'wins' && (
          <div>
            {/* Post win */}
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', marginBottom: 12 }}>🎉 Share a win</div>
              <textarea className="form-textarea" placeholder="What did you do differently this week? Share it with your group..." style={{ minHeight: 80 }} value={winInput} onChange={e => setWinInput(e.target.value)}></textarea>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button className="btn-primary" style={{ fontSize: 12, padding: '7px 18px' }} onClick={postWin}>Post win 🎉</button>
              </div>
            </div>

            {wins.map((w, i) => (
              <div key={i} className="win-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div className="avatar avatar-sm" style={{ background: w.color }}>{w.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{w.name}</div>
                    <span className="phase-pill phase-pill-post">Post-training</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#221D23', lineHeight: 1.7 }}>{w.text}</div>
                <button className={`like-btn ${likedWins.has(i) ? 'liked' : ''}`} onClick={() => toggleWinLike(i)}
                  style={{ background: likedWins.has(i) ? '#FFF6CF' : 'none', borderColor: likedWins.has(i) ? '#FFCE00' : '' }}>
                  👏 {w.likes + (likedWins.has(i) ? 1 : 0)}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
