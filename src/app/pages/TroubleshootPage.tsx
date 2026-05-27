export function TroubleshootPage() {
  const tests = {
    jsEnabled: typeof window !== 'undefined',
    reactRendered: true,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    isMobile: /mobile/i.test(navigator.userAgent),
    url: window.location.href,
    timestamp: new Date().toISOString(),
    localStorage: typeof localStorage !== 'undefined',
    navigator: typeof navigator !== 'undefined'
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#059669' }}>✅ REACT IS WORKING!</h1>

      <p style={{ fontSize: '16px', color: '#374151', marginBottom: '20px' }}>
        If you can see this page, React is loading correctly on your device.
      </p>

      <div style={{
        background: tests.isMobile ? '#d1fae5' : '#fef3c7',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        border: `2px solid ${tests.isMobile ? '#059669' : '#f59e0b'}`
      }}>
        <strong style={{ fontSize: '18px' }}>
          {tests.isMobile ? '📱 Mobile Device Detected' : '🖥️ Desktop Device'}
        </strong>
      </div>

      <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>System Tests:</h2>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>JavaScript</td>
            <td style={{ padding: '10px', color: '#059669' }}>✓ Enabled</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>React Render</td>
            <td style={{ padding: '10px', color: '#059669' }}>✓ Working</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Screen Size</td>
            <td style={{ padding: '10px' }}>{tests.screenSize}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Mobile</td>
            <td style={{ padding: '10px' }}>{tests.isMobile ? 'Yes' : 'No'}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>LocalStorage</td>
            <td style={{ padding: '10px', color: tests.localStorage ? '#059669' : '#ef4444' }}>
              {tests.localStorage ? '✓' : '✗'}
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Navigator</td>
            <td style={{ padding: '10px', color: tests.navigator ? '#059669' : '#ef4444' }}>
              {tests.navigator ? '✓' : '✗'}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>Navigation:</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a
          href="/"
          style={{
            display: 'block',
            padding: '15px',
            background: '#10b981',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Go to Home Page
        </a>
        <a
          href="/signup"
          style={{
            display: 'block',
            padding: '15px',
            background: '#8b5cf6',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Sign Up
        </a>
        <a
          href="/diagnostic"
          style={{
            display: 'block',
            padding: '15px',
            background: '#3b82f6',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Full Diagnostic
        </a>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: '#f3f4f6',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        color: '#6b7280'
      }}>
        <strong>Current URL:</strong><br />
        {tests.url}<br /><br />
        <strong>Timestamp:</strong><br />
        {tests.timestamp}
      </div>
    </div>
  );
}
