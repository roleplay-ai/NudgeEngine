'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

interface Post { initials: string; name: string; role: string; color: string; body: string; likes: number; liked: boolean; time: string; phase: string; phaseClass: string; }

const initialPosts: Post[] = [
  { initials: 'SK', name: 'Sanjay Kumar', role: 'Operations Lead', color: '#23CE68', body: 'Really looking forward to this. Managing a team of 8 and feedback conversations are my biggest challenge right now. Hope to leave with something concrete I can use.', likes: 5, liked: false, time: '2h ago', phase: 'Pre-training', phaseClass: 'phase-pill-pre' },
  { initials: 'AT', name: 'Ananya Tiwari', role: 'Team Lead', color: '#F68A29', body: 'Bit nervous honestly. I know I avoid conflict and I\'m hoping this session helps me get over that. Excited to meet everyone!', likes: 3, liked: false, time: '3h ago', phase: 'Pre-training', phaseClass: 'phase-pill-pre' },
  { initials: 'RM', name: 'Rahul Mehta', role: 'People Manager', color: '#3696FC', body: 'I\'ve been a manager for 2 years and still feel like I\'m winging it sometimes. Looking forward to a structured approach finally!', likes: 7, liked: false, time: '5h ago', phase: 'Pre-training', phaseClass: 'phase-pill-pre' },
];

export default function Community({ onNavigate, onToast }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [input, setInput] = useState('');

  const toggleLike = (i: number) => {
    setPosts(prev => prev.map((p, idx) => idx === i ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const post = () => {
    if (!input.trim()) return;
    setPosts(prev => [{
      initials: 'PR', name: 'Priya Rao', role: 'People Manager', color: '#623CEA',
      body: input.trim(), likes: 0, liked: false, time: 'Just now', phase: 'Pre-training', phaseClass: 'phase-pill-pre'
    }, ...prev]);
    setInput('');
    onToast('Posted to the community feed!', '#623CEA');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Community Feed</div>
        <div className="topbar-right"><span className="tag tag-amber">Pre-training</span></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('p-pre-home')}>← Back</button>

        {/* Trainer card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div className="avatar avatar-lg" style={{ background: '#F68A29' }}>GP</div>
            <div>
              <div style={{ fontSize: 11, color: '#F68A29', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Your Trainer</div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Gaurav Patel</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>Leadership &amp; OD Consultant, Nudgeable.ai</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.7 }}>"Looking forward to a powerful day together. Come ready with a real leadership challenge you're currently facing — that's where the learning sticks."</p>
        </div>

        {/* AI Insights */}
        <div className="card" style={{ background: 'linear-gradient(135deg,#221D23 0%,#2E2433 100%)', border: 'none', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,206,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🧠</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FFCE00', textTransform: 'uppercase', letterSpacing: '1.5px' }}>What your group is hoping for</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Based on expectations shared so far — you are not alone</div>
            </div>
          </div>
          {[
            { emoji: '💬', text: 'Give feedback without damaging relationships', pct: 73, color: '#FFCE00', count: '8 / 11' },
            { emoji: '🔗', text: 'Handle conflict without escalation', pct: 55, color: '#3699FC', count: '6 / 11' },
            { emoji: '🌞', text: 'Stay calm and structured under pressure', pct: 36, color: '#23CE68', count: '4 / 11' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,206,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{item.text}</div>
                <div style={{ marginTop: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 999, height: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: 4, background: item.color, borderRadius: 999 }}></div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{item.count}</div>
            </div>
          ))}
          <div style={{ background: 'rgba(255,206,0,0.1)', border: '1px solid rgba(255,206,0,0.15)', borderRadius: 10, padding: '11px 14px', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginTop: 8 }}>
            💡 <strong style={{ color: '#FFCE00' }}>7 of your peers</strong> share the same worry — giving honest feedback without it backfiring. The trainer knows this and has designed the session around it.
          </div>
        </div>

        {/* Who's coming */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="card-title">Who's coming</div>
            <span className="tag tag-green">24 confirmed</span>
          </div>
          <div className="attendees-grid">
            {[
              { i: 'PR', n: "Priya Rao", sub: "That's you!", color: '#623CEA', highlight: true },
              { i: 'SK', n: "Sanjay Kumar", sub: "Operations Lead", color: '#23CE68', highlight: false },
              { i: 'AT', n: "Ananya Tiwari", sub: "Team Lead", color: '#F68A29', highlight: false },
              { i: 'RM', n: "Rahul Mehta", sub: "People Manager", color: '#3696FC', highlight: false },
            ].map((p, idx) => (
              <div key={idx} className="attendee-card" style={p.highlight ? { borderColor: '#23CE68', background: '#F0FFF7' } : {}}>
                <div className="avatar" style={{ background: p.color }}>{p.i}</div>
                <div style={{ fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{p.n}</div>
                <div style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center' }}>{p.sub}</div>
                <span className="tag tag-green" style={{ fontSize: 10 }}>Confirmed</span>
              </div>
            ))}
            <div className="attendee-card" style={{ background: '#FAFAF7' }}>
              <div className="avatar" style={{ background: '#E8E6DC', color: '#6B6B6B' }}>+20</div>
              <div style={{ fontSize: 12, fontWeight: 600, textAlign: 'center', color: '#6B6B6B' }}>More</div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="card" style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div className="card-title">Community Feed</div>
            <span style={{ fontSize: 11, color: '#6B6B6B' }}>Updates across all phases</span>
          </div>
          <p style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16 }}>Share what you're thinking before the session.</p>
          <div style={{ background: '#F9F8F4', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div className="avatar avatar-sm" style={{ background: '#623CEA', flexShrink: 0 }}>PR</div>
              <div style={{ flex: 1 }}>
                <textarea className="form-textarea" placeholder="Share what you're looking forward to..." style={{ minHeight: 60, marginBottom: 10, background: '#fff' }} value={input} onChange={e => setInput(e.target.value)}></textarea>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['👏 Looking forward to it', '💬 Difficult conversations', '⚡ Nervous & excited'].map((prompt, i) => (
                    <button key={i} className="buzz-prompt-btn" onClick={() => setInput(prompt.split(' ').slice(1).join(' '))}>{prompt}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button className="btn-primary" style={{ fontSize: 12, padding: '7px 18px' }} onClick={post}>Post to feed</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {posts.map((p, i) => (
              <div key={i} className="feed-post">
                <div className="feed-post-header">
                  <div className="avatar avatar-sm" style={{ background: p.color }}>{p.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name} {p.name === 'Priya Rao' && <span style={{ color: '#623CEA', fontSize: 11 }}>(you)</span>}</div>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>{p.role}</div>
                  </div>
                  <span className={`phase-pill ${p.phaseClass}`}>{p.phase}</span>
                  <span style={{ fontSize: 11, color: '#B4B2A9', marginLeft: 8 }}>{p.time}</span>
                </div>
                <div className="feed-post-body">{p.body}</div>
                <div className="feed-post-footer">
                  <button className={`feed-like-btn ${p.liked ? 'liked' : ''}`} onClick={() => toggleLike(i)}>👏 <span>{p.likes}</span></button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 0', borderTop: '0.5px dashed #E8E6DC', margin: '0 -24px', paddingLeft: 24, paddingRight: 24, background: '#FAFAF7', borderRadius: '0 0 16px 16px' }}>
            <div style={{ fontSize: 11, color: '#B4B2A9', textAlign: 'center' }}>🔒 Post-training wins will appear here after the session on 14 Apr</div>
          </div>
        </div>
      </div>
    </div>
  );
}
