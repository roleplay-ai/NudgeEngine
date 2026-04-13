'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { SuperAdminScreen } from '../../types';
import type { Role } from '../../../lib/types/database';

interface Org {
  id: string;
  name: string;
  created_at: string;
}

interface UserRow {
  id: string;
  full_name: string | null;
  role: Role;
  avatar_initials: string | null;
  organisation_id: string | null;
  created_at: string;
}

interface SuperAdminViewsProps {
  screen: SuperAdminScreen;
  onNavigate: (s: SuperAdminScreen) => void;
  onToast: (msg: string, color?: string) => void;
}

export default function SuperAdminViews({ screen, onNavigate, onToast }: SuperAdminViewsProps) {
  if (screen === 'sa-orgs') return <OrgsView onNavigate={onNavigate} onToast={onToast} />;
  return <UsersView onNavigate={onNavigate} onToast={onToast} />;
}

/* ─────────────────────────────────────────────────────────────────
   ORGANISATIONS VIEW
───────────────────────────────────────────────────────────────── */
function OrgsView({ onNavigate, onToast }: Omit<SuperAdminViewsProps, 'screen'>) {
  const supabase = createClient();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('organisations').select('*').order('created_at', { ascending: false });
    setOrgs(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('organisations').insert({ name: newName.trim() });
    setSaving(false);
    if (error) { onToast('Failed to create organisation', '#ED4551'); return; }
    onToast('Organisation created', '#23CE6B');
    setNewName('');
    setShowAdd(false);
    load();
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;
    const { error } = await supabase.from('organisations').update({ name: editName.trim() }).eq('id', id);
    if (error) { onToast('Failed to update', '#ED4551'); return; }
    onToast('Organisation updated', '#23CE6B');
    setEditId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from('organisations').delete().eq('id', id);
    setDeletingId(null);
    if (error) { onToast('Failed to delete', '#ED4551'); return; }
    onToast('Organisation deleted');
    load();
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'linear-gradient(135deg,#623CEA,#9B72F8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="#fff" strokeWidth="1.5"/>
              <path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="topbar-title">Organisations</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{orgs.length} total</div>
          </div>
        </div>
        <div className="topbar-right">
          <button
            className="btn-dark"
            onClick={() => onNavigate('sa-users')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="4.5" cy="4" r="2" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="9" cy="4" r="2" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M1 11c0-1.9 1.6-3.5 3.5-3.5S8 9.1 8 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M9.5 8c1.4 0 2.5 1 2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Manage Users
          </button>
          <button
            className="btn-primary"
            onClick={() => { setShowAdd(true); setNewName(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M6.5 4v5M4 6.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Add Organisation
          </button>
        </div>
      </div>

      <div className="content">
        {/* Add organisation inline form */}
        {showAdd && (
          <div className="card animate-fade-up" style={{ marginBottom: 20, border: '1.5px solid rgba(98,60,234,0.25)', background: 'rgba(98,60,234,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg,#623CEA,#9B72F8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 4v5M4 6.5h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="card-title" style={{ margin: 0 }}>New Organisation</div>
            </div>
            <div className="form-group">
              <label className="form-label">Organisation Name</label>
              <input
                className="form-input"
                placeholder="e.g. Acme Corp"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setShowAdd(false); }}
                autoFocus
              />
            </div>
            <div className="form-actions">
              <button className="btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAdd} disabled={saving || !newName.trim()}>
                {saving ? 'Creating…' : 'Create Organisation'}
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <SkeletonRows />
        ) : orgs.length === 0 ? (
          <EmptyState
            icon="🏢"
            title="No organisations yet"
            sub="Create your first organisation to get started."
            action={<button className="btn-primary" onClick={() => setShowAdd(true)}>Add Organisation</button>}
          />
        ) : (
          <div className="data-table animate-fade-up">
            <div className="table-header" style={{ gridTemplateColumns: '2fr 1.5fr 80px' }}>
              <div className="th">Organisation</div>
              <div className="th">Created</div>
              <div className="th" style={{ textAlign: 'right' }}>Actions</div>
            </div>
            {orgs.map(org => (
              <div key={org.id} className="table-row" style={{ gridTemplateColumns: '2fr 1.5fr 80px', cursor: 'default' }}>
                {editId === org.id ? (
                  <>
                    <div className="td" style={{ gridColumn: '1 / span 2' }}>
                      <input
                        className="form-input"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleEdit(org.id); if (e.key === 'Escape') setEditId(null); }}
                        autoFocus
                        style={{ maxWidth: 340 }}
                      />
                    </div>
                    <div className="td" style={{ textAlign: 'right', display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="action-btn" style={{ color: '#23CE6B' }} onClick={() => handleEdit(org.id)}>Save</button>
                      <button className="action-btn" style={{ color: 'var(--color-text-muted)' }} onClick={() => setEditId(null)}>✕</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="td">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 9,
                          background: 'linear-gradient(135deg,rgba(98,60,234,0.15),rgba(98,60,234,0.08))',
                          border: '1px solid rgba(98,60,234,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, fontSize: 14,
                        }}>🏢</div>
                        <span className="col-name">{org.name}</span>
                      </div>
                    </div>
                    <div className="td td-muted">{fmtDate(org.created_at)}</div>
                    <div className="td" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                      <button className="action-btn" onClick={() => { setEditId(org.id); setEditName(org.name); }}>Edit</button>
                      <button
                        className="action-btn"
                        style={{ color: 'var(--color-danger)', opacity: deletingId === org.id ? 0.5 : 1 }}
                        onClick={() => handleDelete(org.id)}
                        disabled={deletingId === org.id}
                      >
                        {deletingId === org.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   USERS VIEW
───────────────────────────────────────────────────────────────── */
const ROLE_OPTIONS: Role[] = ['superadmin', 'hr', 'participant', 'trainer'];

const ROLE_META: Record<Role, { label: string; color: string; bg: string }> = {
  superadmin: { label: 'Super Admin', color: '#623CEA', bg: 'rgba(98,60,234,0.12)' },
  hr:          { label: 'HR',          color: '#3699FC', bg: 'rgba(54,153,252,0.12)' },
  participant: { label: 'Participant',  color: '#F68A29', bg: 'rgba(246,138,41,0.12)' },
  trainer:     { label: 'Trainer',     color: '#23CE6B', bg: 'rgba(35,206,107,0.12)' },
};

function UsersView({ onNavigate, onToast }: Omit<SuperAdminViewsProps, 'screen'>) {
  const supabase = createClient();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role>('participant');
  const [editOrgId, setEditOrgId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: profiles }, { data: orgList }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('organisations').select('*').order('name'),
    ]);
    setUsers(profiles ?? []);
    setOrgs(orgList ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (u: UserRow) => {
    setEditId(u.id);
    setEditRole(u.role);
    setEditOrgId(u.organisation_id);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ role: editRole, organisation_id: editOrgId })
      .eq('id', id);
    setSaving(false);
    if (error) { onToast('Failed to update user', '#ED4551'); return; }
    onToast('User updated', '#23CE6B');
    setEditId(null);
    load();
  };

  const orgName = (orgId: string | null) => orgs.find(o => o.id === orgId)?.name ?? '—';

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.full_name ?? '').toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      orgName(u.organisation_id).toLowerCase().includes(q)
    );
  });

  const roleCounts = ROLE_OPTIONS.reduce((acc, r) => {
    acc[r] = users.filter(u => u.role === r).length;
    return acc;
  }, {} as Record<Role, number>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'linear-gradient(135deg,#F68A29,#FFCE00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="5" cy="5" r="2.5" stroke="#fff" strokeWidth="1.4"/>
              <circle cx="11" cy="5" r="2.5" stroke="#fff" strokeWidth="1.4"/>
              <path d="M1 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M11 9c1.9 0 3.5 1.4 3.5 3.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="topbar-title">Users</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{users.length} total</div>
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn-outline" onClick={() => onNavigate('sa-orgs')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 7h5M4 4.5h5M4 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Organisations
          </button>
          <div style={{ position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }}>
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              className="form-input"
              placeholder="Search users…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 30, width: 200 }}
            />
          </div>
        </div>
      </div>

      <div className="content">
        {/* Role stat chips */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {ROLE_OPTIONS.map(r => {
            const m = ROLE_META[r];
            return (
              <div key={r} style={{
                background: m.bg, border: `1px solid ${m.color}33`,
                borderRadius: 'var(--radius-pill)', padding: '7px 14px',
                display: 'flex', alignItems: 'center', gap: 7,
              }} className="animate-fade-up">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.label}</span>
                <span style={{
                  background: m.color, color: '#fff', borderRadius: 'var(--radius-pill)',
                  fontSize: 11, fontWeight: 800, padding: '1px 8px',
                }}>{roleCounts[r]}</span>
              </div>
            );
          })}
        </div>

        {loading ? (
          <SkeletonRows />
        ) : filtered.length === 0 ? (
          <EmptyState icon="👤" title={search ? 'No users found' : 'No users yet'} sub={search ? 'Try a different search term.' : 'Users appear here once they sign up.'} />
        ) : (
          <div className="data-table animate-fade-up">
            <div className="table-header" style={{ gridTemplateColumns: '2fr 1.2fr 1.8fr 80px' }}>
              <div className="th">User</div>
              <div className="th">Role</div>
              <div className="th">Organisation</div>
              <div className="th" style={{ textAlign: 'right' }}>Action</div>
            </div>
            {filtered.map(u => {
              const initials = u.avatar_initials ?? u.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? '?';
              const m = ROLE_META[u.role];
              return (
                <div key={u.id} className="table-row" style={{ gridTemplateColumns: '2fr 1.2fr 1.8fr 80px', cursor: 'default' }}>
                  {editId === u.id ? (
                    <>
                      {/* User cell — read-only even during edit */}
                      <div className="td">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <div className="avatar avatar-sm" style={{ background: m.color }}>{initials}</div>
                          <span className="col-name">{u.full_name ?? 'Unnamed'}</span>
                        </div>
                      </div>
                      {/* Role selector */}
                      <div className="td">
                        <select
                          className="form-select"
                          value={editRole}
                          onChange={e => setEditRole(e.target.value as Role)}
                          style={{ fontSize: 12 }}
                        >
                          {ROLE_OPTIONS.map(r => (
                            <option key={r} value={r}>{ROLE_META[r].label}</option>
                          ))}
                        </select>
                      </div>
                      {/* Org selector */}
                      <div className="td">
                        <select
                          className="form-select"
                          value={editOrgId ?? ''}
                          onChange={e => setEditOrgId(e.target.value || null)}
                          style={{ fontSize: 12 }}
                        >
                          <option value="">— No organisation —</option>
                          {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                        </select>
                      </div>
                      {/* Save / cancel */}
                      <div className="td" style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button className="action-btn" style={{ color: '#23CE6B' }} onClick={() => saveEdit(u.id)} disabled={saving}>
                          {saving ? '…' : 'Save'}
                        </button>
                        <button className="action-btn" style={{ color: 'var(--color-text-muted)' }} onClick={() => setEditId(null)}>✕</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="td">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                          <div className="avatar avatar-sm" style={{ background: m.color }}>{initials}</div>
                          <span className="col-name">{u.full_name ?? 'Unnamed'}</span>
                        </div>
                      </div>
                      <div className="td">
                        <span style={{
                          background: m.bg, color: m.color,
                          borderRadius: 'var(--radius-pill)', padding: '3px 10px',
                          fontSize: 11, fontWeight: 700,
                        }}>{m.label}</span>
                      </div>
                      <div className="td td-muted">{orgName(u.organisation_id)}</div>
                      <div className="td" style={{ textAlign: 'right' }}>
                        <button className="action-btn" onClick={() => startEdit(u)}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────────────────────────── */
function SkeletonRows() {
  return (
    <div className="data-table">
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ padding: '14px 20px', borderBottom: '0.5px solid var(--color-border)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(34,29,35,0.07)', animation: 'shimmer 1.4s infinite linear', backgroundSize: '400px 100%', backgroundImage: 'linear-gradient(90deg,rgba(34,29,35,0.07) 25%,rgba(34,29,35,0.13) 50%,rgba(34,29,35,0.07) 75%)' }} />
          <div style={{ flex: 1, height: 13, borderRadius: 6, background: 'rgba(34,29,35,0.07)', backgroundImage: 'linear-gradient(90deg,rgba(34,29,35,0.07) 25%,rgba(34,29,35,0.13) 50%,rgba(34,29,35,0.07) 75%)', backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear' }} />
          <div style={{ width: 80, height: 13, borderRadius: 6, background: 'rgba(34,29,35,0.07)', backgroundImage: 'linear-gradient(90deg,rgba(34,29,35,0.07) 25%,rgba(34,29,35,0.13) 50%,rgba(34,29,35,0.07) 75%)', backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear' }} />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ icon, title, sub, action }: { icon: string; title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 24px' }} className="animate-fade-up">
      <div className="icon-badge" style={{ margin: '0 auto 16px' }}>{icon}</div>
      <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 20 }}>{sub}</div>
      {action}
    </div>
  );
}
