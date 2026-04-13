'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.75)',
      borderRadius: 'var(--radius-xl)',
      padding: '40px 36px',
      boxShadow: 'var(--shadow-lg)',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: 'var(--bright-amber)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
          boxShadow: 'var(--shadow-yellow)',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="#221D23" strokeWidth="2"/>
            <path d="M9 16l3-4 3 3 4-6" stroke="#221D23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '3px', color: 'var(--shadow-grey)', textTransform: 'uppercase', marginBottom: 4 }}>
          NUDGEABLE.AI
        </div>
        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', marginBottom: 6 }}>
          Welcome back
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          Sign in to continue to your dashboard
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div style={{
            background: 'var(--color-tag-red-bg)',
            border: '1px solid rgba(237,69,81,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 'var(--text-sm)',
            color: 'var(--hot-fuchsia)',
            fontWeight: 'var(--weight-medium)',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', fontSize: 'var(--text-base)', padding: '12px 24px', marginTop: 4 }}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in →'}
        </button>
      </form>

      {/* Role hint */}
      <div style={{
        marginTop: 28,
        padding: '14px 16px',
        background: 'rgba(255,253,245,0.8)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--princeton-orange)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Demo accounts
        </div>
        {[
          { role: 'HR Manager', email: 'hr@demo.com', color: 'var(--majorelle-blue)' },
          { role: 'Participant', email: 'participant@demo.com', color: 'var(--emerald)' },
          { role: 'Trainer', email: 'trainer@demo.com', color: 'var(--princeton-orange)' },
        ].map(({ role, email: demoEmail, color }) => (
          <button
            key={demoEmail}
            type="button"
            onClick={() => { setEmail(demoEmail); setPassword('demo1234'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', background: 'none', border: 'none',
              padding: '5px 0', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'var(--font-body)',
            }}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: color, flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)' }}>{role}</span>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{demoEmail}</span>
          </button>
        ))}
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 8 }}>
          Password for all demo accounts: <strong>demo1234</strong>
        </div>
      </div>
    </div>
  );
}
