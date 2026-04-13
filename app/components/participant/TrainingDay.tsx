'use client';

import { useState } from 'react';
import { ParticipantScreen } from '../../types';

interface Props {
  onNavigate: (screen: ParticipantScreen) => void;
  onToast: (msg: string, color: string) => void;
}

const TABS = ['Feedback', 'Coaching', 'Motivation', 'Self', 'My Own'];

const TAB_ACTIONS: Record<number, { title: string; sub: string }[]> = {
  0: [
    { title: 'Have one SBI feedback conversation with each direct report', sub: 'Use the Situation-Behaviour-Impact model from today' },
    { title: 'Schedule a dedicated 1:1 for performance conversations', sub: "Don't squeeze feedback into a busy team meeting" },
    { title: "Address one piece of feedback you've been avoiding", sub: 'Write your SBI notes before the conversation' },
  ],
  1: [
    { title: "Use coaching questions instead of giving answers in your next 1:1", sub: 'Try asking "What do you think you should do?" first' },
    { title: "Create a development plan for your highest-potential team member", sub: 'One stretch goal, one skill, one person to connect them with' },
    { title: 'Give one team member a stretch assignment this week', sub: 'Discomfort plus support is the recipe for growth' },
  ],
  2: [
    { title: 'Recognise one team member publicly for specific behaviour', sub: 'Name what they did and why it mattered' },
    { title: 'Run a 15-minute team check-in focused only on how people are feeling', sub: 'No agenda. Just listening.' },
    { title: 'Ask each team member what energises them most about their work', sub: 'Use answers to make small changes in how you allocate work' },
  ],
  3: [
    { title: 'Block 30 minutes weekly for leadership reflection', sub: "Ask: what worked, what didn't, what would I do differently?" },
    { title: 'Ask your manager for feedback on one specific behaviour', sub: 'Model the behaviour you want to see in your team' },
    { title: 'Identify one leadership habit to break and write what you\'ll do instead', sub: 'Awareness without an alternative rarely creates change' },
  ],
};

export default function TrainingDay({ onNavigate, onToast }: Props) {
  const [attended, setAttended] = useState(false);
  const [buddy, setBuddy] = useState<string | null>('sk');
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customActions, setCustomActions] = useState<{ title: string; sub: string; selected: boolean }[]>([]);
  const [showCommitment, setShowCommitment] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [commitmentText, setCommitmentText] = useState('');
  const [whyText, setWhyText] = useState('');
  const [blockerText, setBlockerText] = useState('');
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [done, setDone] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSub, setCustomSub] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  const totalSelected = selected.size + customActions.filter(a => a.selected).length;

  const toggleAction = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const generate = () => {
    if (!commitmentText.trim()) { onToast('Please write your commitment first', '#ED4551'); return; }
    setGenerating(true);
    setGenStep(0);
    const steps = [
      'Reading your commitment...',
      'Aligning with company strategy...',
      'Aligning with leadership frameworks...',
      'Personalising your action plan...',
      '🤖 Action plan ready!',
    ];
    let i = 0;
    const run = () => {
      if (i >= steps.length) {
        setGenerating(false);
        setShowActionPlan(true);
        setShowCommitment(false);
        // Pre-select first 3 actions
        setSelected(new Set(['0-0','0-1','0-2']));
        onToast('Action plan generated! Review and select your actions.', '#623CEA');
        return;
      }
      setGenStep(i);
      i++;
      setTimeout(run, 950);
    };
    run();
  };

  const genSteps = ['Reading your commitment...', 'Aligning with company strategy...', 'Aligning with leadership frameworks...', 'Personalising your action plan...', '🤖 Action plan ready!'];

  const finalize = (share: boolean) => {
    setShowSummary(false);
    setDone(true);
    onToast(share ? '🌟 Commitment shared! Your group is cheering you on.' : 'Commitment saved privately! Your nudges start tomorrow.', share ? '#F68A29' : '#23CE68');
    setTimeout(() => onNavigate('p-post-home'), 1500);
  };

  const buddies = [
    { id: 'sk', name: 'Sanjay K.', color: '#23CE68' },
    { id: 'at', name: 'Ananya T.', color: '#F68A29' },
    { id: 'rm', name: 'Rahul M.', color: '#3696FC' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar">
        <div className="topbar-title">Training Day</div>
        <div className="topbar-right">
          <span className="tag tag-blue" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} className="ping"></span>
            Session live
          </span>
        </div>
      </div>
      <div className="content">
        {/* Live banner */}
        <div style={{ background: '#3696FC', borderRadius: 12, padding: '10px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.3s ease both' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'inline-block', flexShrink: 0 }} className="ping"></span>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>Session is live. Complete your commitment plan.</div>
        </div>

        {done ? (
          <div style={{ background: '#221D23', borderRadius: 16, padding: 28, textAlign: 'center', animation: 'fadeUp 0.4s ease both' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFCE00', marginBottom: 8 }}>Training day complete!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Your nudges start tomorrow. Keep an eye on your actions dashboard.</div>
            <button className="btn-primary" onClick={() => onNavigate('p-post-home')}>Go to my dashboard →</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '75% 25%', gap: 16, marginBottom: 16 }}>
            {/* LEFT: Commitment + Actions */}
            <div>
              {!showActionPlan && !generating && (
                <>
                  <div style={{ background: 'linear-gradient(160deg,#F3EEFF 0%,#E0D5FF 100%)', borderRadius: 18, padding: 20, border: '2px solid rgba(98,60,234,0.3)', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: '#623CEA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, color: '#fff' }}>🎯</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#623CEA', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 2 }}>⭐ Most important step</div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: '#221D23' }}>Create your commitment plan</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#444', lineHeight: 1.5, marginBottom: 14 }}>Set what you commit to, your <strong>why</strong>, and any <strong>blockers</strong>. This drives your entire post-training journey.</p>
                  </div>

                  <div className="card" style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFF6CF', border: '1.5px solid #FFCE00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎯</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>What I commit to</div>
                        <div style={{ fontSize: 11, color: '#6B6B6B' }}>What will you do differently in the next 30 days?</div>
                      </div>
                    </div>
                    <textarea className="form-textarea" placeholder="e.g. I will have one honest feedback conversation with each of my direct reports every two weeks..." style={{ minHeight: 110 }} value={commitmentText} onChange={e => setCommitmentText(e.target.value)}></textarea>
                  </div>

                  <div className="card" style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3EEFF', border: '1.5px solid #623CEA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✨</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>My why</div>
                        <div style={{ fontSize: 11, color: '#6B6B6B' }}>Picture your future self — what changes if you follow through?</div>
                      </div>
                    </div>
                    <textarea className="form-textarea" placeholder="e.g. I want to be the kind of leader my team feels safe being honest with..." style={{ minHeight: 90 }} value={whyText} onChange={e => setWhyText(e.target.value)}></textarea>
                  </div>

                  <div className="card" style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFF0F1', border: '1.5px solid #ED4551', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🚧</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23' }}>Blockers that might get in my way</div>
                        <div style={{ fontSize: 11, color: '#6B6B6B' }}>Name your blockers so you can plan around them</div>
                      </div>
                    </div>
                    <textarea className="form-textarea" placeholder="e.g. I tend to avoid difficult conversations when I'm busy..." style={{ minHeight: 80 }} value={blockerText} onChange={e => setBlockerText(e.target.value)}></textarea>
                  </div>

                  <div style={{ background: '#FAFAF7', borderRadius: 14, padding: 16, marginBottom: 20, border: '1.5px solid rgba(34,29,35,0.08)' }}>
                    <div style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 12, lineHeight: 1.5 }}>Once you've written your commitment, generate a personalised action plan — AI will align it with your company's strategy and leadership frameworks.</div>
                    <button className="btn-primary" onClick={generate} style={{ fontSize: 13, padding: '10px 20px', width: '100%' }}>🤖 Generate my action plan</button>
                  </div>
                </>
              )}

              {generating && (
                <div style={{ background: '#fff', border: '1.5px solid rgba(98,60,234,0.2)', borderRadius: 14, padding: 28, marginBottom: 16, textAlign: 'center', animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }} className="pulse-anim">🤖</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#221D23', marginBottom: 6 }}>{genSteps[genStep]}</div>
                  <div style={{ fontSize: 12, color: '#8A8090', marginBottom: 18 }}>This will take just a moment</div>
                  <div style={{ background: '#F2F0EA', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                    <div style={{ height: 7, borderRadius: 999, background: 'linear-gradient(90deg,#623CEA,#FFCE00)', width: `${(genStep + 1) / genSteps.length * 100}%`, transition: 'width 0.8s ease' }}></div>
                  </div>
                </div>
              )}

              {showActionPlan && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#623CEA', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Your AI-generated actions — select the ones you commit to</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontSize: 13, color: '#6B6B6B' }}>Selected:</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#623CEA' }}>{totalSelected}</div>
                      <div style={{ fontSize: 13, color: '#6B6B6B' }}>/ {Object.values(TAB_ACTIONS).flat().length + customActions.length}</div>
                    </div>
                    {totalSelected >= 9 && <span className="tag tag-green" style={{ fontSize: 11 }}>{totalSelected} selected — excellent!</span>}
                    {totalSelected > 0 && totalSelected < 9 && <span style={{ fontSize: 11, color: '#F68A29', fontWeight: 600 }}>{9 - totalSelected} more for recommended</span>}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div className="progress-bar-wrap" style={{ height: 6 }}>
                      <div className="progress-bar-fill" style={{ width: `${Math.min(100, totalSelected / 12 * 100)}%`, background: totalSelected >= 9 ? '#23CE68' : '#623CEA', height: 6, transition: 'width 0.3s' }}></div>
                    </div>
                    <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 5 }}>
                      {totalSelected < 9 ? `Select at least 9 actions to reach the recommended level` : "You're on track with the top performers!"}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                    {TABS.map((tab, i) => (
                      <button key={i} className={`tab-btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{tab}</button>
                    ))}
                  </div>
                  {activeTab < 4 && TAB_ACTIONS[activeTab]?.map((action, i) => {
                    const key = `${activeTab}-${i}`;
                    const isSel = selected.has(key);
                    return (
                      <div key={key} className={`action-select-item ${isSel ? 'selected' : ''}`} onClick={() => toggleAction(key)}>
                        <div className={`asi-checkbox ${isSel ? 'checked' : ''}`}>
                          {isSel && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                        </div>
                        <div className="asi-content">
                          <div className="asi-title">{action.title}</div>
                          <div className="asi-sub">{action.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                  {activeTab === 4 && (
                    <>
                      {customActions.map((a, i) => (
                        <div key={i} className={`action-select-item ${a.selected ? 'selected' : ''}`} onClick={() => setCustomActions(prev => prev.map((ca, ci) => ci === i ? { ...ca, selected: !ca.selected } : ca))}>
                          <div className={`asi-checkbox ${a.selected ? 'checked' : ''}`}>
                            {a.selected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                          </div>
                          <div className="asi-content"><div className="asi-title">{a.title}</div><div className="asi-sub">{a.sub || 'Custom action'}</div></div>
                        </div>
                      ))}
                      {showCustomForm ? (
                        <div style={{ background: '#F9F8F4', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                          <div className="form-group"><div className="form-label">Action title</div><input className="form-input" value={customTitle} onChange={e => setCustomTitle(e.target.value)} placeholder="e.g. Meet with each direct report weekly" /></div>
                          <div className="form-group no-mb"><div className="form-label">Why it matters (optional)</div><input className="form-input" value={customSub} onChange={e => setCustomSub(e.target.value)} placeholder="e.g. Builds trust and keeps me informed" /></div>
                          <div className="form-actions">
                            <button className="btn-outline" onClick={() => setShowCustomForm(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => { if (customTitle.trim()) { setCustomActions(prev => [...prev, { title: customTitle, sub: customSub, selected: true }]); setCustomTitle(''); setCustomSub(''); setShowCustomForm(false); }  }}>Add action</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: '#FAFAF7', border: '1.5px dashed #E8E6DC', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                          <div style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 12 }}>Add an action specific to your situation</div>
                          <button className="btn-primary" onClick={() => setShowCustomForm(true)} style={{ fontSize: 12, padding: '7px 18px' }}>+ Add custom action</button>
                        </div>
                      )}
                    </>
                  )}
                  <div style={{ marginTop: 20, padding: 16, background: '#FAFAF7', borderRadius: 14, border: '1.5px solid rgba(34,29,35,0.08)' }}>
                    <button className="btn-primary" onClick={() => { if (totalSelected < 3) { onToast('Please select at least 3 actions first.', '#ED4551'); } else { setShowSummary(true); } }} style={{ fontSize: 13, padding: '10px 24px', width: '100%' }}>Save my commitment plan ✓</button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Attendance */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1.5px solid rgba(34,29,35,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: attended ? '#F0FFF7' : '#F2F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{attended ? '✅' : '📍'}</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8A8090', textTransform: 'uppercase', letterSpacing: 1 }}>Step 1</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#221D23' }}>Attendance</div>
                  </div>
                </div>
                {attended ? (
                  <div style={{ background: '#F0FFF7', border: '1.5px solid #23CE68', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" fill="#23CE68"/><path d="M7 11l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#221D23' }}>Present ✓</div>
                  </div>
                ) : (
                  <button className="btn-emerald" onClick={() => { setAttended(true); onToast("You're marked present for today's session!", '#23CE68'); }} style={{ fontSize: 13, width: '100%', padding: 10, borderRadius: 12 }}>👋 I'm here!</button>
                )}
              </div>

              {/* Buddy */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1.5px solid rgba(246,138,41,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#F68A29,#FFCE00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🤝</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8A8090', textTransform: 'uppercase', letterSpacing: 1 }}>Step 2</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#221D23' }}>Pick buddy</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {buddies.map(b => (
                    <div key={b.id} onClick={() => { setBuddy(b.id); onToast(`${b.name.split('.')[0]} is your accountability buddy! 🤝`, b.color); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 10, border: buddy === b.id ? `1.5px solid ${b.color}` : '0.5px solid #E8E6DC', background: buddy === b.id ? `${b.color}18` : '', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div className="avatar" style={{ background: b.color, width: 28, height: 28, fontSize: 10 }}>{b.id.toUpperCase()}</div>
                      <div style={{ flex: 1, fontSize: 11, fontWeight: 600, color: '#221D23' }}>{b.name}</div>
                      {buddy === b.id && <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill={b.color}/><path d="M5 9l3 3 5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Session info */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 16, border: '1.5px solid rgba(54,150,252,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🚀</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8A8090', textTransform: 'uppercase', letterSpacing: 1 }}>Session Info</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#221D23' }}>Today's Trainer</div>
                  </div>
                </div>
                <div style={{ background: '#F9F8F4', borderRadius: 12, padding: 12, border: '1px solid rgba(34,29,35,0.08)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#221D23', marginBottom: 4 }}>Gaurav Patel</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B', marginBottom: 6 }}>14 Apr 2025</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#23CE68', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#23CE68' }}></span>Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Commitment Summary Popup */}
        {showSummary && (
          <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(34,29,35,0.65)', zIndex: 250, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }} onClick={() => setShowSummary(false)}>
            <div style={{ background: '#fff', borderRadius: 22, padding: 28, width: 520, maxWidth: '92vw', maxHeight: '88vh', overflowY: 'auto', animation: 'fadeUp 0.35s ease' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#F0FFF7', border: '1.5px solid #23CE68', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🌟</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#221D23' }}>Your commitment is set!</div>
                  <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>Sharing it makes you 3x more likely to follow through</div>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg,#221D23,#2E2433)', borderRadius: 16, padding: 18, marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#FFCE00', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>✨ Your Why</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, fontStyle: 'italic' }}>"{whyText || 'I want to grow as a leader and make a real impact on my team.'}"</div>
              </div>
              <div style={{ background: '#F9F8F4', borderRadius: 16, padding: 18, marginBottom: 14, border: '1px solid rgba(34,29,35,0.08)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#623CEA', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>My Commitment</div>
                <div style={{ fontSize: 13, color: '#221D23', lineHeight: 1.75 }}>{commitmentText || 'I will apply what I learned today consistently.'}</div>
              </div>
              <div style={{ background: '#F0F4FF', borderRadius: 14, padding: 14, marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#623CEA' }}>{totalSelected}</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B' }}>actions selected</div>
                </div>
                <div style={{ width: 1, height: 36, background: 'rgba(34,29,35,0.1)', flexShrink: 0 }}></div>
                <div style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.6 }}>Your AI-generated actions will be delivered as daily nudges over the next 14 days.</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#221D23', marginBottom: 6 }}>Share your commitment with the group?</div>
              <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 18 }}>Your cohort is on this journey together. Sharing publicly builds accountability and inspires others.</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-outline" onClick={() => finalize(false)} style={{ flex: 1 }}>Keep private</button>
                <button className="btn-primary" onClick={() => finalize(true)} style={{ flex: 2 }}>🌟 Share to community</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
