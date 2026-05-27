import { useEffect, useState } from "react";

export function DiagnosticPage() {
  const [info, setInfo] = useState({
    loaded: false,
    timestamp: "",
    url: "",
    userAgent: "",
    screen: "",
    viewport: "",
    isMobile: false,
    connection: "",
  });

  useEffect(() => {
    // Log to console immediately
    console.log('=== DIAGNOSTIC PAGE LOADED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('URL:', window.location.href);
    console.log('User Agent:', navigator.userAgent);

    const checkConnection = async () => {
      try {
        const start = Date.now();
        await fetch(window.location.origin);
        const duration = Date.now() - start;
        return `✓ Connected (${duration}ms)`;
      } catch (e) {
        return `✗ Connection failed: ${e}`;
      }
    };

    checkConnection().then((connection) => {
      setInfo({
        loaded: true,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        screen: `${window.screen.width} x ${window.screen.height}`,
        viewport: `${window.innerWidth} x ${window.innerHeight}`,
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        connection,
      });
    });

    console.log("Diagnostic page loaded");
    console.log("URL:", window.location.href);
    console.log("User Agent:", navigator.userAgent);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1f2937',
      color: 'white',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#10b981' }}>
          📊 Frnds.x Diagnostics
        </h1>

        {info.loaded ? (
          <div>
            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ color: '#10b981', marginBottom: '5px' }}>
                ✓ Page Loaded Successfully
              </div>
              <div style={{ opacity: 0.7 }}>
                {info.timestamp}
              </div>
            </div>

            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ color: '#60a5fa', marginBottom: '5px' }}>Device Type</div>
              <div>{info.isMobile ? "📱 Mobile Device" : "🖥️ Desktop"}</div>
            </div>

            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ color: '#60a5fa', marginBottom: '5px' }}>Current URL</div>
              <div style={{ wordBreak: 'break-all' }}>{info.url}</div>
            </div>

            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ color: '#60a5fa', marginBottom: '5px' }}>Screen Size</div>
              <div>Physical: {info.screen}</div>
              <div>Viewport: {info.viewport}</div>
            </div>

            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ color: '#60a5fa', marginBottom: '5px' }}>Connection</div>
              <div>{info.connection}</div>
            </div>

            <div style={{
              background: '#374151',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ color: '#60a5fa', marginBottom: '5px' }}>User Agent</div>
              <div style={{ wordBreak: 'break-all', fontSize: '10px' }}>
                {info.userAgent}
              </div>
            </div>

            <div style={{
              background: info.isMobile ? '#10b981' : '#f59e0b',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {info.isMobile ? '✓ MOBILE DEVICE DETECTED' : '⚠️ DESKTOP DEVICE'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="/"
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                ✓ Go to Mobile Entry (Fastest)
              </a>
              <a
                href="/simple"
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Go to Simple Landing
              </a>
              <a
                href="/signup"
                style={{
                  background: '#8b5cf6',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Go to Sign Up
              </a>
              <a
                href="/login"
                style={{
                  background: '#ec4899',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Go to Login
              </a>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#374151',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            Loading diagnostics...
          </div>
        )}
      </div>
    </div>
  );
}
