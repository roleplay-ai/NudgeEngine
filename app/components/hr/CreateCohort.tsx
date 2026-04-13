'use client';

import { useState } from 'react';
import { HRScreen } from '../../types';

interface Props {
  onNavigate: (screen: HRScreen) => void;
  onToast?: (msg: string, color: string) => void;
}

export default function CreateCohort({ onNavigate, onToast }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploads, setUploads] = useState<Record<string, string>>({});

  const simulateUpload = (id: string, name: string, size: string) => {
    setUploads(prev => ({ ...prev, [id]: `${name} (${size}) — uploaded ✓` }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="topbar"><div className="topbar-title">New Cohort</div></div>
      <div className="content">
        <button className="back-btn" onClick={() => onNavigate('hr-impact')}>← Back to L&D Impact</button>
        <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card-title" style={{ marginBottom: 24, fontSize: 18 }}>Create a New Programme</div>
          <div className="form-grid">
            <div className="form-group full">
              <div className="form-label">Programme Name</div>
              <input className="form-input" type="text" placeholder="e.g. People Leadership Programme — Batch 3" />
            </div>
            <div className="form-group full">
              <div className="form-label">Upload Training Content</div>
              {uploads['training'] ? (
                <div style={{ background: '#F0FFF7', border: '1.5px solid #23CE68', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#221D23' }}>✅ {uploads['training']}</div>
              ) : (
                <div className="upload-zone" onClick={() => simulateUpload('training', 'training_deck.pptx', '2.4 MB')}>
                  <div style={{ fontSize: 28, color: '#623CEA', marginBottom: 6 }}>↑</div>
                  <div style={{ fontSize: 13, color: '#6B6B6B' }}>Drag &amp; drop files here, or <span style={{ color: '#623CEA', fontWeight: 600 }}>browse</span></div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>PDF, PPTX, DOCX up to 25 MB</div>
                </div>
              )}
            </div>
            <div className="form-group">
              <div className="form-label">Training Date</div>
              <input className="form-input" type="text" placeholder="dd/mm/yyyy" defaultValue="28 Apr 2025" />
            </div>
            <div className="form-group">
              <div className="form-label">Duration</div>
              <select className="form-select">
                <option>Half day (4 hrs)</option>
                <option selected>Full day (8 hrs)</option>
                <option>2 days</option>
                <option>3 days</option>
              </select>
            </div>
            <div className="form-group full">
              <div className="form-label">Upload Pre-Reads (optional)</div>
              {uploads['prereads'] ? (
                <div style={{ background: '#F0FFF7', border: '1.5px solid #23CE68', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#221D23' }}>✅ {uploads['prereads']}</div>
              ) : (
                <div className="upload-zone" onClick={() => simulateUpload('prereads', 'prereading_guide.pdf', '1.1 MB')} style={{ padding: 20 }}>
                  <div style={{ fontSize: 22, color: '#F68A29', marginBottom: 4 }}>📚</div>
                  <div style={{ fontSize: 13, color: '#6B6B6B' }}>Drag &amp; drop pre-read materials, or <span style={{ color: '#623CEA', fontWeight: 600 }}>browse</span></div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>PDF, DOCX, links</div>
                </div>
              )}
            </div>
            <div className="form-group full">
              <div className="form-label">Upload Participant List</div>
              {uploads['participants'] ? (
                <div style={{ background: '#F0FFF7', border: '1.5px solid #23CE68', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#221D23' }}>✅ {uploads['participants']}</div>
              ) : (
                <div className="upload-zone" onClick={() => simulateUpload('participants', 'participants_batch3.csv', '24 KB')} style={{ padding: 20 }}>
                  <div style={{ fontSize: 22, color: '#23CE68', marginBottom: 4 }}>👥</div>
                  <div style={{ fontSize: 13, color: '#6B6B6B' }}>Drag &amp; drop CSV, or <span style={{ color: '#623CEA', fontWeight: 600 }}>browse</span></div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>Required columns: Name, Email, Manager Email</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 28, paddingTop: 20, borderTop: '1px solid #F0EDE6' }}>
            <button className="btn-outline" onClick={() => onNavigate('hr-impact')}>Cancel</button>
            <button className="btn-primary" onClick={() => setShowSuccess(true)}>Launch Programme</button>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(34,29,35,0.55)', zIndex: 999, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '40px 36px', maxWidth: 420, textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#23CE68', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ color: '#fff', fontSize: 32 }}>✓</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#221D23', marginBottom: 8 }}>Programme Launched!</div>
            <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 24 }}>All participants have been notified via email. They are now in the <strong style={{ color: '#623CEA' }}>Pre-Training Phase</strong> and can access their pre-reads and confirm attendance.</div>
            <button className="btn-primary" onClick={() => { setShowSuccess(false); onNavigate('hr-impact'); }} style={{ width: '100%' }}>Back to L&D Impact</button>
          </div>
        </div>
      )}
    </div>
  );
}
