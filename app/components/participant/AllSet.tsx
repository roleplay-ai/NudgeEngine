'use client';

import { ParticipantScreen } from '../../types';

interface Props { onNavigate: (screen: ParticipantScreen) => void; }

export default function AllSet({ onNavigate }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar"><div className="topbar-title">People Leadership Programme</div></div>
      <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16, animation: 'popIn 0.5s ease' }}>🎉</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#221D23', marginBottom: 8 }}>You are all set!</div>
        <div style={{ fontSize: 15, color: '#6B6B6B', maxWidth: 380, lineHeight: 1.7, marginBottom: 32 }}>Your pre-training steps are complete. The trainer has your expectations and your group will see your intro before training day.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 420 }}>
          <button onClick={() => onNavigate('p-prereads')} style={{ background: '#fff', border: '1.5px solid #E8E6DC', borderRadius: 16, padding: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#FFCE00'} onMouseOut={e => e.currentTarget.style.borderColor = '#E8E6DC'}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Pre-reads</div>
            <div style={{ fontSize: 12, color: '#6B6B6B' }}>Read the 2 documents before training day</div>
          </button>
          <button onClick={() => onNavigate('p-community')} style={{ background: '#221D23', border: 'none', borderRadius: 16, padding: 20, cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>👥</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFCE00', marginBottom: 4 }}>Community page</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>See who else is attending with you</div>
          </button>
        </div>
      </div>
    </div>
  );
}
