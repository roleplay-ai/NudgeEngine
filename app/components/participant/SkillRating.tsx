'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

const descs: Record<number, [string, string]> = {
  1: ['Just starting out', 'You\'re new to people leadership and are building your foundations.'],
  2: ['Early stages', 'You\'ve had some experience but are still developing your approach.'],
  3: ['Building confidence', 'You\'re finding your style but have areas you want to strengthen.'],
  4: ['Developing well', 'You have solid basics and are ready to go deeper.'],
  5: ['Good awareness', 'You have some experience and are looking to develop further.'],
  6: ['Competent leader', 'You lead effectively most of the time with room to grow.'],
  7: ['Strong leader', 'You consistently lead well and are ready for advanced techniques.'],
  8: ['Advanced', 'You are an experienced leader who wants to sharpen specific skills.'],
  9: ['Expert level', 'You lead at a high level and are here to stay sharp and inspired.'],
  10: ['Mastery', 'You\'re at the top of your game — here to give back and learn from peers.'],
};

export default function SkillRating({ onNavigate, onToast }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const submit = () => {
    if (!selected) return;
    onToast(`Skill level ${selected}/10 saved! Thanks for being honest.`, '#23CE68');
    onNavigate('p-intro');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Skill Self-Assessment</div>
        <div className="topbar-right"><span className="tag tag-amber">Step 2 of 4</span></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('p-pre-home')}>← Back</button>
        <div className="card">
          <div className="section-label">Step 2 of 4</div>
          <div className="section-title" style={{ marginBottom: 4 }}>Rate your current skill level</div>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 24 }}>On a scale of 1 to 10, how would you rate your people leadership skills right now? Be honest — this helps us tailor the session.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <button key={n} className={`skill-btn ${selected === n ? 'selected' : ''}`} onClick={() => setSelected(n)}>{n}</button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: '#6B6B6B' }}>Beginner</span>
            <span style={{ fontSize: 12, color: '#6B6B6B' }}>Expert</span>
          </div>
          {selected && (
            <div style={{ background: '#FFF6CF', borderRadius: 12, padding: 16, marginBottom: 20, animation: 'fadeUp 0.3s ease' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#221D23', marginBottom: 4 }}>{descs[selected]?.[0]}</div>
              <div style={{ fontSize: 13, color: '#6B6B6B' }}>{descs[selected]?.[1]}</div>
            </div>
          )}
          {selected && (
            <button className="btn-primary" onClick={submit} style={{ width: '100%', fontSize: 14, padding: 12 }}>Confirm my rating →</button>
          )}
        </div>
      </div>
    </div>
  );
}
