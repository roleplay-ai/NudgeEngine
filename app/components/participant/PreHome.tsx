'use client';

import { useState, useEffect } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
}

export default function PreHome({ onNavigate }: Props) {
  const [countdown, setCountdown] = useState({ days: '08', hours: '14', mins: '32', secs: '00' });
  const [attended, setAttended] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 8);
    target.setHours(target.getHours() + 14);
    target.setMinutes(target.getMinutes() + 32);

    const pad = (n: number) => n < 10 ? '0' + n : '' + n;
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setCountdown({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins: pad(Math.floor((diff % 3600000) / 60000)),
        secs: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">People Leadership Programme</div>
        <div className="topbar-right"><span className="tag tag-amber">Phase 1: Pre-Training</span></div>
      </div>
      <div className="content">
        {/* Countdown */}
        <div className="card" style={{ background: '#221D23', border: 'none', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>People Leadership Programme</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#FFCE00', marginBottom: 14 }}>Training starts in</div>
          <div className="countdown-box">
            {[['days','Days'],['hours','Hours'],['mins','Mins'],['secs','Secs']].map(([k,l]) => (
              <div key={k} className="count-unit">
                <div className="count-num">{countdown[k as keyof typeof countdown]}</div>
                <div className="count-label">{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Trainer: Gaurav Patel · Full day · In-person · 14 Apr 2025</div>
        </div>

        {/* Attendance banner */}
        {!attended && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF6CF', borderRadius: 14, padding: '12px 16px', marginBottom: 18, border: '1.5px solid #FFCE00' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 22 }}>✋</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23' }}>Are you coming?</div>
                <div style={{ fontSize: 11, color: '#6B6B6B' }}>Let the group know you'll be there</div>
              </div>
            </div>
            <button className="btn-primary" style={{ fontSize: 12, padding: '7px 18px', flexShrink: 0 }} onClick={() => setAttended(true)}>Confirm ✓</button>
          </div>
        )}
        {attended && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F0FFF7', borderRadius: 14, padding: '12px 16px', marginBottom: 18, border: '1.5px solid #23CE68' }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" fill="#23CE68"/><path d="M7 11l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#221D23' }}>Attendance confirmed! See you on 14 Apr 🎉</span>
          </div>
        )}

        <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', marginBottom: 12 }}>Before training day</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { screen: 'p-expectations' as ParticipantScreen, emoji: '💬', title: 'Share expectations', sub: 'Tell the trainer what you want to learn', time: '5 min', bg: 'linear-gradient(135deg,#623CEA 0%,#7B5CEA 100%)' },
            { screen: 'p-skillrating' as ParticipantScreen, emoji: '⭐', title: 'Rate your skills', sub: 'Baseline check before the session', time: '3 min', bg: 'linear-gradient(135deg,#F68A29 0%,#FFAA50 100%)' },
            { screen: 'p-prereads' as ParticipantScreen, emoji: '📖', title: 'Read pre-session docs', sub: '2 documents · 15 min', time: 'Open →', bg: 'linear-gradient(135deg,#3696FC 0%,#56AAFF 100%)' },
            { screen: 'p-intro' as ParticipantScreen, emoji: '👋', title: 'Write your intro', sub: 'Help your group get to know you', time: '2 min', bg: 'linear-gradient(135deg,#23CE68 0%,#45DD85 100%)' },
          ].map((item) => (
            <div
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              style={{ background: item.bg, borderRadius: 16, padding: 18, cursor: 'pointer', transition: 'all 0.2s', animation: 'fadeUp 0.4s ease both' }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={e => (e.currentTarget.style.transform = '')}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, marginBottom: 12 }}>{item.sub}</div>
              <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#fff' }}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* Pack your bag */}
        <div className="card" onClick={() => setShowChecklist(true)} style={{ marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>🎒</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#221D23' }}>Pack your bag for 14 Apr</div>
            <div style={{ fontSize: 11, color: '#6B6B6B' }}>4 items on your trainer's checklist</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ background: '#23CE68', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>3/4 ready</span>
            <span style={{ color: '#6B6B6B', fontSize: 16 }}>›</span>
          </div>
        </div>

        <button className="btn-dark" onClick={() => onNavigate('p-community')} style={{ width: '100%', fontSize: 13, padding: 12, borderRadius: 999 }}>👥 See who's attending →</button>
      </div>

      {/* Checklist Popup */}
      {showChecklist && (
        <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(34,29,35,0.5)', zIndex: 999, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, maxWidth: 440, width: '90%', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', position: 'relative' }}>
            <button onClick={() => setShowChecklist(false)} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', fontSize: 18, color: '#6B6B6B', cursor: 'pointer' }}>✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 24 }}>🎒</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#221D23' }}>Pack your bag for 14 Apr</div>
                <div style={{ fontSize: 11, color: '#6B6B6B' }}>Trainer's checklist - come ready</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { done: true, title: 'Notebook and pen', sub: 'Physical notes help retention more than typing' },
                { done: true, title: 'A real team challenge to discuss', sub: 'Real examples make the learning stick' },
                { done: true, title: 'A feedback situation you\'ve been avoiding', sub: 'We\'ll use real scenarios in the roleplay' },
                { done: false, title: 'An open mind', sub: 'Most growth happens when we\'re a little uncomfortable', bg: '#FFF6CF', iconBg: '#FFCE00', icon: '🧠' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 10, background: item.bg || '#F9F8F4', borderRadius: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: item.done ? '#23CE68' : (item.iconBg || '#23CE68'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.done ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg> : <span style={{ fontSize: 14 }}>{item.icon}</span>}
                  </div>
                  <div><div style={{ fontSize: 13, fontWeight: 600, color: '#221D23' }}>{item.title}</div><div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>{item.sub}</div></div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowChecklist(false)} className="btn-primary" style={{ width: '100%', marginTop: 16, fontSize: 13 }}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
}
