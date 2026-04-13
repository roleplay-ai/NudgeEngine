export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--lemon-chiffon)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, #FFE566 0%, transparent 68%)',
        borderRadius: '50%', filter: 'blur(64px)', opacity: 0.45,
        top: -120, right: -80, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 380, height: 380,
        background: 'radial-gradient(circle, #FFD700 0%, transparent 68%)',
        borderRadius: '50%', filter: 'blur(64px)', opacity: 0.4,
        bottom: -80, left: -60, pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460, padding: '0 20px' }}>
        {children}
      </div>
    </div>
  );
}
