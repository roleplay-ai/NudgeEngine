'use client';

import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

export default function Intro({ onNavigate, onToast }: Props) {
  const submit = () => {
    onToast('Intro shared with your group! 👋 They\'re excited to meet you.', '#23CE68');
    onNavigate('p-allset');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Quick Intro</div>
        <div className="topbar-right"><span className="tag tag-amber">Step 3 of 4</span></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('p-pre-home')}>← Back</button>
        <div className="card">
          <div className="section-label">Step 3 of 4</div>
          <div className="section-title" style={{ marginBottom: 4 }}>Introduce yourself</div>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 20 }}>Your fellow participants will see this before training day. It makes the room feel less like strangers.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, background: '#FAFAF7', borderRadius: 12, padding: 14 }}>
            <div className="avatar avatar-lg" style={{ background: '#623CEA', fontSize: 16 }}>PR</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Priya Rao</div>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>People Manager · Meridian Corp</div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-label">What do you do at Meridian Corp?</div>
            <input className="form-input" type="text" placeholder="e.g. People Manager, Operations team, 4 years at Meridian" />
          </div>
          <div className="form-group">
            <div className="form-label">One thing you are hoping to work on as a leader</div>
            <textarea className="form-textarea" placeholder="e.g. I want to get better at giving honest feedback without worrying about how it will be received..." style={{ minHeight: 80 }}></textarea>
          </div>
          <div className="form-group">
            <div className="form-label">One fun fact about you (optional)</div>
            <input className="form-input" type="text" placeholder="e.g. I used to teach yoga before joining corporate!" />
          </div>
          <button className="btn-primary" onClick={submit} style={{ width: '100%', fontSize: 14, padding: 12, marginTop: 8 }}>Submit and finish ✓</button>
        </div>
      </div>
    </div>
  );
}
