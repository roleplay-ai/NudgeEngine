'use client';

import { useState } from 'react';
import { Screen, SuperAdminScreen, HRScreen, ParticipantScreen, TrainerScreen } from './types';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';

// HR
import LDImpact from './components/hr/LDImpact';
import CohortList from './components/hr/CohortList';
import CreateCohort from './components/hr/CreateCohort';
import DetailPost from './components/hr/DetailPost';
import DetailPre from './components/hr/DetailPre';
import DetailLive from './components/hr/DetailLive';

// Participant
import PreHome from './components/participant/PreHome';
import Expectations from './components/participant/Expectations';
import SkillRating from './components/participant/SkillRating';
import Intro from './components/participant/Intro';
import AllSet from './components/participant/AllSet';
import PreReads from './components/participant/PreReads';
import Community from './components/participant/Community';
import TrainingDay from './components/participant/TrainingDay';
import PostHome from './components/participant/PostHome';
import Social from './components/participant/Social';

// Trainer
import TrainerViews from './components/trainer/TrainerViews';

// Super Admin
import SuperAdminViews from './components/superadmin/SuperAdminViews';

interface Toast {
  id: number;
  msg: string;
  color: string;
}

export default function App() {
  const { role, loading } = useAuth();
  const [screen, setScreen] = useState<Screen | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (msg: string, color = '#221D23') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  };

  const handleNavigate = (s: Screen) => setScreen(s);

  // Loading state
  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--lemon-chiffon)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: 'var(--bright-amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', animation: 'pulse-slow 1.5s infinite',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#221D23" strokeWidth="1.5"/>
              <path d="M7 13l2.5-3.5 2.5 2 3-4.5" stroke="#221D23" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>Loading…</div>
        </div>
      </div>
    );
  }

  // Determine current screen (use explicit state or role default)
  const defaultScreens: Record<string, Screen> = {
    superadmin: 'sa-orgs',
    hr: 'hr-impact',
    participant: 'p-pre-home',
    trainer: 't-overview',
  };
  const currentScreen: Screen = screen ?? (role ? defaultScreens[role] : 'hr-impact');

  const renderView = () => {
    if (role === 'superadmin') {
      const saNav = (s: SuperAdminScreen) => handleNavigate(s);
      return <SuperAdminViews screen={currentScreen as SuperAdminScreen} onNavigate={saNav} onToast={showToast} />;
    }

    if (role === 'hr') {
      const hrNav = (s: HRScreen) => handleNavigate(s);
      switch (currentScreen) {
        case 'hr-impact':      return <LDImpact onNavigate={hrNav} />;
        case 'hr-dashboard':   return <CohortList onNavigate={hrNav} />;
        case 'hr-create1':     return <CreateCohort onNavigate={hrNav} onToast={showToast} />;
        case 'hr-detail-post': return <DetailPost onNavigate={hrNav} onToast={showToast} />;
        case 'hr-detail-pre':  return <DetailPre onNavigate={hrNav} onToast={showToast} />;
        case 'hr-detail-live': return <DetailLive onNavigate={hrNav} />;
        default:               return <LDImpact onNavigate={hrNav} />;
      }
    }

    if (role === 'participant') {
      const pNav = (s: ParticipantScreen) => handleNavigate(s);
      switch (currentScreen) {
        case 'p-pre-home':     return <PreHome onNavigate={pNav} />;
        case 'p-expectations': return <Expectations onNavigate={pNav} onToast={showToast} />;
        case 'p-skillrating':  return <SkillRating onNavigate={pNav} onToast={showToast} />;
        case 'p-intro':        return <Intro onNavigate={pNav} onToast={showToast} />;
        case 'p-allset':       return <AllSet onNavigate={pNav} />;
        case 'p-prereads':     return <PreReads onNavigate={pNav} onToast={showToast} />;
        case 'p-community':    return <Community onNavigate={pNav} onToast={showToast} />;
        case 'p-training':     return <TrainingDay onNavigate={pNav} onToast={showToast} />;
        case 'p-post-home':    return <PostHome onNavigate={pNav} onToast={showToast} />;
        case 'p-social':       return <Social onNavigate={pNav} onToast={showToast} />;
        default:               return <PreHome onNavigate={pNav} />;
      }
    }

    if (role === 'trainer') {
      const tNav = (s: TrainerScreen) => handleNavigate(s);
      return <TrainerViews screen={currentScreen as TrainerScreen} onNavigate={tNav} onToast={showToast} />;
    }

    return null;
  };

  return (
    <div className="app">
      <Sidebar screen={currentScreen} onNavigate={handleNavigate} />

      <div className="main">
        <div style={{
          position: 'absolute', width: 260, height: 260,
          background: 'radial-gradient(circle, #FFF3C2 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(50px)', opacity: 0.4,
          top: '40%', left: '45%', pointerEvents: 'none', zIndex: 0,
        }} />
        {renderView()}
      </div>

      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8,
        alignItems: 'center', pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div key={t.id} className="toast" style={{
            background: t.color, position: 'relative',
            transform: 'none', left: 'auto', bottom: 'auto',
          }}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
