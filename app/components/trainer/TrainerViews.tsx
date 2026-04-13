'use client';

import { useState } from 'react';
import { TrainerScreen } from '../../types';

interface Props {
  screen: TrainerScreen;
  onNavigate: (screen: TrainerScreen) => void;
  onToast: (msg: string, color: string) => void;
}

function PreTraining({ onNavigate }: { onNavigate: (s: TrainerScreen) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Pre-Training Overview</div>
        <div className="topbar-right"><span className="tag tag-amber">Conflict Resolution Masterclass · 22 Apr 2025</span></div>
      </div>
      <div className="content">
        {/* AI brief */}
        <div className="card" style={{ background: 'linear-gradient(135deg,#221D23 0%,#2E2433 100%)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,206,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🧠</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FFCE00', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Your AI-Generated Trainer Brief</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Ready to review — based on 11 participant responses</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[
              { color: '#F68A29', label: 'Top concern', text: 'Giving feedback without damaging trust' },
              { color: '#3699FC', label: 'Starting level', text: 'Avg 3.4 / 10 — mostly beginners, pitch at intro level' },
              { color: '#ED4551', label: 'Biggest fear', text: 'Fear of demotivating team members (7 people)' },
              { color: '#23CE68', label: 'Group energy', text: 'Nervous but motivated — high engagement expected' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,206,0,0.1)', border: '1px solid rgba(255,206,0,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>💡 <strong style={{ color: '#FFCE00' }}>Recommended:</strong> Open with a normalising story about feedback — 7 of your attendees are anxious about damaging their team's motivation. Start with roleplay early before theory to break the fear.</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-primary" style={{ fontSize: 12, padding: '7px 16px' }}>Download trainer brief</button>
            <button className="btn-outline" style={{ fontSize: 12, padding: '7px 16px', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>View all responses</button>
          </div>
        </div>

        <div className="detail-grid-3">
          <div className="stat-card">
            <div style={{ fontSize: 28, fontWeight: 900, color: '#FFCE00' }}>14<span style={{ fontSize: 16, color: '#6B6B6B', fontWeight: 500 }}>/20</span></div>
            <div className="stat-label">Attendance confirmed</div>
            <button className="btn-outline" style={{ fontSize: 11, padding: '5px 12px', marginTop: 10, width: '100%' }}>Chaser pending (5)</button>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 28, fontWeight: 900, color: '#623CEA' }}>11<span style={{ fontSize: 16, color: '#6B6B6B', fontWeight: 500 }}>/14</span></div>
            <div className="stat-label">Expectations filled</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 28, fontWeight: 900, color: '#F68A29' }}>3.4<span style={{ fontSize: 16, color: '#6B6B6B', fontWeight: 500 }}>/10</span></div>
            <div className="stat-label">Avg starting skill level</div>
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Who's confirmed</div>
            {[
              { i: 'PR', n: 'Priya Rao', r: 'People Manager', c: '#623CEA', s: 'Confirmed', sc: 'tag-green' },
              { i: 'SK', n: 'Sanjay Kumar', r: 'Operations Lead', c: '#23CE68', s: 'Confirmed', sc: 'tag-green' },
              { i: 'AT', n: 'Ananya Tiwari', r: 'Team Lead', c: '#F68A29', s: 'Confirmed', sc: 'tag-green' },
              { i: 'VN', n: 'Vikram Nair', r: 'Team Lead', c: '#ED4551', s: 'No response', sc: 'tag-red' },
            ].map((p, idx) => (
              <div key={idx} className="participant-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="avatar avatar-sm" style={{ background: p.c }}>{p.i}</div>
                  <div><div className="participant-name">{p.n}</div><div className="participant-dept">{p.r}</div></div>
                </div>
                <span className={`tag ${p.sc}`} style={{ fontSize: 10 }}>{p.s}</span>
              </div>
            ))}
            <div style={{ marginTop: 12 }}><button className="action-btn">View all 20 →</button></div>
          </div>
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Top expectations</div>
            {[
              ['Give feedback without damaging relationships', 8],
              ['Handle conflict without escalation', 6],
              ['Stay calm under pressure', 5],
              ['Set clear expectations without micromanaging', 4],
            ].map(([text, count], i) => (
              <div key={i} className="exp-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 12, flex: 1, paddingRight: 8 }}>{text}</span>
                  <span className="tag tag-amber" style={{ fontSize: 10, padding: '2px 8px', flexShrink: 0 }}>{count} people</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveDay({ onToast }: { onToast: (msg: string, color: string) => void }) {
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [nudgeName, setNudgeName] = useState('');

  const openNudge = (name: string) => { setNudgeName(name); setNudgeOpen(true); };
  const sendNudge = () => { setNudgeOpen(false); onToast(`Nudge sent to ${nudgeName}!`, '#23CE68'); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Training Day — Live</div>
        <div className="topbar-right"><button className="btn-emerald" style={{ fontSize: 12 }}>Session Live ●</button></div>
      </div>
      <div className="content">
        <div style={{ background: '#3696FC', borderRadius: 12, padding: '12px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>🔴 Conflict Resolution Masterclass — Session in progress</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Started 2h 15min ago</div>
        </div>

        {/* Task strip */}
        <div className="task-strip">
          {[
            { num: 1, label: 'Intro', done: true },
            { num: 2, label: 'Expectations', done: true },
            { num: 3, label: 'Action Plan', active: true },
            { num: 4, label: 'Wrap up', pending: true },
          ].map((step, i) => (
            <div key={i} className={`task-strip-step ${step.done ? 'ts-done' : step.active ? 'ts-active' : ''}`}>
              <div className="task-strip-num">{step.done ? '✓' : step.num}</div>
              {step.label}
            </div>
          ))}
        </div>

        <div className="stat-grid-4">
          {[
            { val: 18, label: 'Confirmed attendance', color: '#23CE68' },
            { val: 14, label: 'Action plans submitted', color: '#623CEA' },
            { val: '108', label: 'Actions selected so far', color: '#F68A29' },
            { val: 4, label: 'Yet to submit', color: '#ED4551' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Still need to submit plans</div>
            {[
              { i: 'VN', n: 'Vikram Nair', color: '#ED4551', note: 'Present but not started' },
              { i: 'SM', n: 'Sunita Mehta', color: '#ED4551', note: '2 actions selected so far' },
              { i: 'RK', n: 'Rohan Kapoor', color: '#F68A29', note: 'In progress' },
              { i: 'NJ', n: 'Nisha Joshi', color: '#F68A29', note: '1 action selected' },
            ].map((p, idx) => (
              <div key={idx} className="inactive-row">
                <div className="avatar avatar-sm" style={{ background: p.color }}>{p.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.n}</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B' }}>{p.note}</div>
                </div>
                <button className="btn-outline" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => openNudge(p.n)}>Nudge</button>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <button className="btn-dark" style={{ width: '100%', fontSize: 12, padding: 10, borderRadius: 999 }} onClick={() => openNudge('all 4 participants')}>Nudge all 4 at once</button>
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Top actions selected</div>
            {[
              ['Have one SBI feedback conversation with each direct report', 12],
              ['Recognise one team member publicly for specific behaviour', 10],
              ['Use coaching questions instead of giving answers in 1:1s', 9],
              ['Schedule a dedicated 1:1 for performance conversations', 8],
            ].map(([action, count], i) => (
              <div key={i} className="exp-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, flex: 1, paddingRight: 8 }}>{action}</span>
                  <span className="tag tag-purple" style={{ fontSize: 10, padding: '2px 8px', flexShrink: 0 }}>{count} selected</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, background: '#F9F8F4', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#6B6B6B' }}>
              Avg actions per participant: <strong style={{ color: '#623CEA' }}>7.7</strong> — encourage at least 9
            </div>
          </div>
        </div>
      </div>

      {/* Nudge modal */}
      {nudgeOpen && (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(34,29,35,0.6)', zIndex: 300, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }} onClick={() => setNudgeOpen(false)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 500, maxWidth: '90vw', animation: 'fadeUp 0.2s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="avatar" style={{ background: '#623CEA' }}>GP</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>Send a nudge</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>To: {nudgeName}</div>
              </div>
            </div>
            <div style={{ background: '#F9F8F4', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 13, color: '#221D23', lineHeight: 1.7 }}>
              Hi {nudgeName.split(' ')[0]},<br/><br/>
              I noticed you haven't had a chance to work on your action plan yet — completely understand how the day can get busy.<br/><br/>
              Even completing <strong>one small action</strong> right now keeps the momentum going. You've got this!<br/><br/>
              Gaurav
            </div>
            <textarea className="form-textarea" placeholder="Add a personal note (optional)..." style={{ minHeight: 60 }}></textarea>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn-outline" onClick={() => setNudgeOpen(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn-primary" onClick={sendNudge} style={{ flex: 2 }}>Send nudge ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PostTraining({ onToast }: { onToast: (msg: string, color: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Post-Training Overview</div>
        <div className="topbar-right">
          <button className="btn-outline" style={{ fontSize: 12 }}>Download report</button>
          <button className="btn-primary" style={{ fontSize: 12 }}>Send group nudge</button>
        </div>
      </div>
      <div className="content">
        <div className="stat-grid-4">
          {[
            { val: '18', label: 'Participants', color: '#623CEA' },
            { val: '142', label: 'Actions committed', color: '#23CE68' },
            { val: '86', label: 'Actions completed', color: '#FFCE00' },
            { val: '61%', label: 'Completion rate', color: '#F68A29' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="two-col">
          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Action completion trend</div>
            <svg viewBox="0 0 320 140" width="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="trainerAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#23CE68" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#23CE68" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[110,80,50,20].map((y,i) => <line key={i} x1="0" y1={y} x2="320" y2={y} stroke="#F2F0EA" strokeWidth="1"/>)}
              <path d="M20,110 L80,103 L140,92 L200,75 L260,52 L300,35 L300,110 Z" fill="url(#trainerAreaGrad)"/>
              <polyline points="20,110 80,103 140,92 200,75 260,52 300,35" fill="none" stroke="#23CE68" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {[[20,110],[80,103],[140,92],[200,75],[260,52],[300,35]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3.5" fill="#23CE68"/>)}
              {['Day 1','Day 3','Day 5','Day 7','Day 9'].map((t,i) => <text key={i} x={17+i*70} y="126" fontSize="9" fill="#B4B2A9">{t}</text>)}
            </svg>
          </div>

          <div className="card">
            <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 14 }}>Inactive participants <span className="badge-num" style={{ marginLeft: 4 }}>4</span></div>
            {[
              { i: 'VN', n: 'Vikram Nair', info: 'No activity in 6 days · 0 of 8 done', color: '#ED4551' },
              { i: 'SM', n: 'Sunita Mehta', info: 'No activity in 5 days · 1 of 7 done', color: '#ED4551' },
              { i: 'RK', n: 'Rohan Kapoor', info: 'No activity in 4 days · 2 of 8 done', color: '#F68A29' },
              { i: 'NJ', n: 'Nisha Joshi', info: 'No activity in 3 days · 1 of 6 done', color: '#F68A29' },
            ].map((p, idx) => (
              <div key={idx} className="alert-row">
                <div className="avatar avatar-sm" style={{ background: p.color }}>{p.i}</div>
                <div><div className="alert-name">{p.n}</div><div className="alert-info">{p.info}</div></div>
                <button className="btn-outline" style={{ fontSize: 11, padding: '4px 10px', marginLeft: 'auto' }} onClick={() => onToast(`Nudge sent to ${p.n}!`, '#23CE68')}>Nudge</button>
              </div>
            ))}
            <button className="btn-dark" style={{ width: '100%', fontSize: 12, padding: 10, borderRadius: 999, marginTop: 14 }} onClick={() => onToast('Nudges sent to all 4 inactive participants!', '#23CE68')}>Nudge all 4 at once</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainerCommunity({ onToast }: { onToast: (msg: string, color: string) => void }) {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([
    { i: 'PR', n: 'Priya Rao', color: '#623CEA', text: 'Used the SBI model today with my direct report. He was genuinely surprised by how specific I was — said it was the most useful feedback he\'d ever received! 🎉', likes: 14, phase: 'Post-training', phaseClass: 'phase-pill-post' },
    { i: 'SK', n: 'Sanjay Kumar', color: '#23CE68', text: 'Started using coaching questions in my 1:1s. It takes more patience but the quality of thinking from my team is genuinely better. Gaurav — thank you for that reminder!', likes: 8, phase: 'Post-training', phaseClass: 'phase-pill-post' },
    { i: 'AT', n: 'Ananya Tiwari', color: '#F68A29', text: 'Had a conflict situation this week. Actually used the de-escalation technique from the training. It worked. Still processing that it actually worked!', likes: 11, phase: 'Post-training', phaseClass: 'phase-pill-post' },
  ]);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const post = () => {
    if (!input.trim()) return;
    setPosts(prev => [{ i: 'GP', n: 'Gaurav Patel', color: '#F68A29', text: input.trim(), likes: 0, phase: 'Trainer', phaseClass: 'phase-pill-training' }, ...prev]);
    setInput('');
    onToast('Message posted to community!', '#F68A29');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Community Feed</div>
        <div className="topbar-right"><span className="tag tag-orange">Trainer view</span></div>
      </div>
      <div className="content">
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', marginBottom: 12 }}>Post to your group</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div className="avatar avatar-sm" style={{ background: '#F68A29', flexShrink: 0 }}>GP</div>
            <div style={{ flex: 1 }}>
              <textarea className="form-textarea" placeholder="Share a reflection, tip, or encouragement with your group..." style={{ minHeight: 80 }} value={input} onChange={e => setInput(e.target.value)}></textarea>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <button className="btn-primary" style={{ fontSize: 12, padding: '7px 18px' }} onClick={post}>Post to group</button>
              </div>
            </div>
          </div>
        </div>

        {posts.map((p, i) => (
          <div key={i} className="feed-post">
            <div className="feed-post-header">
              <div className="avatar avatar-sm" style={{ background: p.color }}>{p.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.n}</div>
              </div>
              <span className={`phase-pill ${p.phaseClass}`}>{p.phase}</span>
            </div>
            <div className="feed-post-body">{p.text}</div>
            <div className="feed-post-footer">
              <button className={`feed-like-btn ${liked.has(i) ? 'liked' : ''}`} onClick={() => setLiked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}>
                👏 <span>{p.likes + (liked.has(i) ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrainerViews({ screen, onNavigate, onToast }: Props) {
  if (screen === 't-overview') return <PreTraining onNavigate={onNavigate} />;
  if (screen === 't-liveday') return <LiveDay onToast={onToast} />;
  if (screen === 't-posttraining') return <PostTraining onToast={onToast} />;
  if (screen === 't-community') return <TrainerCommunity onToast={onToast} />;
  return null;
}
