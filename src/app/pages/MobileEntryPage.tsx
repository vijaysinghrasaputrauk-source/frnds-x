export function MobileEntryPage() {
  // FORCE RENDER - Set background immediately
  if (typeof document !== 'undefined') {
    document.body.style.background = 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #ef4444 100%)';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';
    console.log('MobileEntryPage: Body styled');
  }

  // Log immediately when this component renders
  console.log('=== FRNDS.X MOBILE ENTRY PAGE ===');
  console.log('Page loaded at:', new Date().toISOString());
  console.log('URL:', window.location.href);
  console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
  console.log('User agent:', navigator.userAgent);
  console.log('Is mobile:', /mobile/i.test(navigator.userAgent));

  const screenInfo = `${window.innerWidth}x${window.innerHeight}`;
  const isMobile = /mobile/i.test(navigator.userAgent);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #ef4444 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px 30px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        textAlign: 'center' as const
      }}>
        <div style={{ fontSize: '60px', marginBottom: '15px' }}>❤️</div>
        <h1 style={{ fontSize: '36px', color: '#1f2937', marginBottom: '8px' }}>
          Frnds.x
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
          UK Student Friendship App
        </p>

        <a
          href="/signup"
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            marginBottom: '12px',
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            color: 'white'
          }}
        >
          Sign Up
        </a>

        <a
          href="/login"
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            marginBottom: '12px',
            background: 'white',
            color: '#6b7280'
          }}
        >
          Login
        </a>

        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px', lineHeight: '1.6' }}>
          🇬🇧 UK Universities Only<br />
          Connect • Call • Chat
        </div>

        <div style={{
          display: 'inline-block',
          background: '#f3f4f6',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#059669',
          marginTop: '15px',
          fontWeight: '600'
        }}>
          ✓ Mobile App Loaded Successfully
        </div>

        <div style={{
          fontSize: '10px',
          color: '#9ca3af',
          marginTop: '20px',
          padding: '10px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'left' as const,
          fontFamily: 'monospace'
        }}>
          <strong>Debug Info:</strong><br />
          Screen: {screenInfo}<br />
          Device: {isMobile ? 'Mobile ✓' : 'Desktop'}<br />
          Time: {new Date().toLocaleTimeString()}
        </div>

        <div style={{ marginTop: '15px' }}>
          <a
            href="/diagnostic"
            style={{
              color: '#6b7280',
              fontSize: '11px',
              textDecoration: 'underline'
            }}
          >
            View Full Diagnostics →
          </a>
        </div>
      </div>
    </div>
  );
}
