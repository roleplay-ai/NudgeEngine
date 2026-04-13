'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

export default function Expectations({ onNavigate, onToast }: Props) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');

  const submit = () => {
    onToast('Expectations submitted! Gaurav will use these to tailor the session.', '#23CE68');
    onNavigate('p-skillrating');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Your Expectations</div>
        <div className="topbar-right"><span className="tag tag-amber">Step 1 of 4</span></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('p-pre-home')}>← Back</button>
        <div className="card">
          <div className="section-label">Step 1 of 4</div>
          <div className="section-title" style={{ marginBottom: 4 }}>What do you want from this session?</div>
          <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 20 }}>Your answers help the trainer tailor the content. Be as specific as you like.</p>
          <div className="form-group">
            <div className="form-label">What is your biggest leadership challenge right now?</div>
            <textarea className="form-textarea" id="exp-q1" placeholder="e.g. I struggle to give feedback without sounding harsh..." style={{ minHeight: 90 }} value={q1} onChange={e => setQ1(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <div className="form-label">What specific skill do you most want to improve?</div>
            <textarea className="form-textarea" placeholder="e.g. Having difficult conversations calmly and constructively..." style={{ minHeight: 90 }} value={q2} onChange={e => setQ2(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <div className="form-label">What would make this training a success for you?</div>
            <textarea className="form-textarea" placeholder="e.g. Walking away with a concrete approach I can use next week..." style={{ minHeight: 90 }} value={q3} onChange={e => setQ3(e.target.value)}></textarea>
          </div>
          <button className="btn-primary" onClick={submit} style={{ width: '100%', fontSize: 14, padding: 12, marginTop: 8 }}>Submit my expectations</button>
        </div>
      </div>
    </div>
  );
}
