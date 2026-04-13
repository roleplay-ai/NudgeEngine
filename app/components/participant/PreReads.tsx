'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

export default function PreReads({ onNavigate, onToast }: Props) {
  const [opened, setOpened] = useState<Record<number, boolean>>({});
  const [confirmed, setConfirmed] = useState<Record<number, boolean>>({});

  const markOpened = (id: number) => setOpened(prev => ({ ...prev, [id]: true }));

  const confirmRead = (id: number) => {
    setConfirmed(prev => ({ ...prev, [id]: true }));
    onToast(`Document marked as read ✓`, '#23CE68');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Pre-session Reading</div>
        <div className="topbar-right"><span className="tag tag-blue">Before training day</span></div>
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('p-pre-home')}>← Back</button>
        <div style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 20, lineHeight: 1.6 }}>Read both documents before training day. Tap a document to open it, then confirm you've read it below.</div>

        {[
          { id: 1, title: 'SBI Feedback Framework', size: 'PDF · 2.4 MB · 15 min read', url: 'https://www.mindtools.com/pages/article/feedback-sbis.htm', color: '#3696FC', bg: 'linear-gradient(135deg,#3696FC,#56AAFF)', summary: 'The SBI model helps you give clear, specific feedback: Situation (when/where), Behaviour (what they did), Impact (the effect). Core framework for today\'s session.' },
          { id: 2, title: 'Growth Mindset in Leadership', size: 'PDF · 1.1 MB · 10 min read', url: 'https://hbr.org/2016/01/what-having-a-growth-mindset-actually-means', color: '#623CEA', bg: 'linear-gradient(135deg,#623CEA,#7B5CEA)', summary: 'Carol Dweck\'s research shows that leaders with a growth mindset outperform peers by coaching instead of directing. Sets the context for our coaching module.' },
        ].map(doc => (
          <div key={doc.id} className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 44, height: 52, background: doc.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>📄</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23', marginBottom: 3 }}>{doc.title}</div>
                <div style={{ fontSize: 11, color: '#6B6B6B' }}>{doc.size}</div>
                <div style={{ fontSize: 11, color: confirmed[doc.id] ? '#23CE68' : '#6B6B6B', marginTop: 3, fontWeight: confirmed[doc.id] ? 600 : 400 }}>
                  {confirmed[doc.id] ? '✓ Read' : opened[doc.id] ? 'Opened — mark as read below' : 'Not yet read'}
                </div>
              </div>
              <a href={doc.url} target="_blank" rel="noopener noreferrer"
                style={{ background: doc.color, color: '#fff', border: 'none', borderRadius: 999, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onClick={() => markOpened(doc.id)}>Open →</a>
            </div>
            <div style={{ background: '#F9F8F4', borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 12, color: '#6B6B6B', lineHeight: 1.6 }}>{doc.summary}</div>
            {confirmed[doc.id] ? (
              <div style={{ width: '100%', background: '#F0FFF7', color: '#23CE68', border: 'none', borderRadius: 12, padding: 10, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>✓ Marked as read</div>
            ) : (
              <button onClick={() => confirmRead(doc.id)} disabled={!opened[doc.id]}
                style={{ width: '100%', background: opened[doc.id] ? '#FFCE00' : '#F2F0EA', color: opened[doc.id] ? '#221D23' : '#8A8090', border: 'none', borderRadius: 12, padding: 10, fontSize: 12, fontWeight: 600, cursor: opened[doc.id] ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}>
                Mark as read ✓
              </button>
            )}
          </div>
        ))}
        <button className="btn-dark" onClick={() => onNavigate('p-pre-home')} style={{ width: '100%', fontSize: 13, padding: 12, borderRadius: 999 }}>← Back to checklist</button>
      </div>
    </div>
  );
}
