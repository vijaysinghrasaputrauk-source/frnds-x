// ULTRA MINIMAL PAGE - NO DEPENDENCIES
export function EmergencyPage() {
  console.log('=== EMERGENCY PAGE RENDERED ===');
  console.log('Time:', new Date().toISOString());

  // Force body styling
  if (typeof document !== 'undefined') {
    document.body.style.background = '#f3f4f6';
    document.body.style.margin = '0';
    document.body.style.padding = '20px';
    document.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        fontSize: '50px',
        textAlign: 'center',
        marginBottom: '15px'
      }}>✅</div>

      <h1 style={{
        textAlign: 'center',
        color: '#059669',
        marginBottom: '10px',
        fontSize: '28px'
      }}>APP IS WORKING!</h1>

      <p style={{
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        Frnds.x loaded successfully on your mobile
      </p>

      <div style={{
        background: '#f3f4f6',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '13px',
        color: '#374151'
      }}>
        <strong>Debug Info:</strong><br />
        Screen: {window.innerWidth} x {window.innerHeight}<br />
        Time: {new Date().toLocaleTimeString()}<br />
        Mobile: {/mobile/i.test(navigator.userAgent) ? 'YES ✓' : 'NO'}<br />
      </div>

      <a href="/signup" style={{
        display: 'block',
        padding: '20px',
        background: '#9333ea',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '10px',
        marginBottom: '10px'
      }}>
        SIGN UP
      </a>
      <a href="/login" style={{
        display: 'block',
        padding: '20px',
        background: '#ec4899',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '10px',
        marginBottom: '10px'
      }}>
        LOGIN
      </a>

      <a href="/share" style={{
        display: 'block',
        padding: '15px',
        background: '#10b981',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        📱 SHARE APP & QR CODE
      </a>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <a href="/troubleshoot" style={{
          color: '#6b7280',
          textDecoration: 'underline',
          fontSize: '13px'
        }}>
          Troubleshoot Issues
        </a>
        {' • '}
        <a href="/diagnostic" style={{
          color: '#6b7280',
          textDecoration: 'underline',
          fontSize: '13px'
        }}>
          Full Diagnostic
        </a>
      </div>
    </div>
  );
}
