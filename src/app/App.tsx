import { RouterProvider } from "react-router";
import { router } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Suspense } from "react";

function LoadingFallback() {
  console.log('LoadingFallback rendered');

  // Set body background immediately
  if (typeof document !== 'undefined') {
    document.body.style.background = 'linear-gradient(135deg, #9333ea, #ec4899)';
    document.body.style.color = 'white';
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>❤️</div>
        <div style={{ marginBottom: '15px', fontSize: '24px' }}>Frnds.x</div>
        <div style={{ fontSize: '16px', opacity: 0.9 }}>Loading...</div>
        <div style={{ fontSize: '12px', marginTop: '20px', opacity: 0.7 }}>
          {window.innerWidth} x {window.innerHeight}
        </div>
        <div style={{ fontSize: '10px', marginTop: '10px', opacity: 0.6 }}>
          If this doesn't change in 5 seconds, there's a loading issue
        </div>
      </div>
    </div>
  );
}

// IMMEDIATE VISUAL FEEDBACK - Set body style before anything else
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  // This runs IMMEDIATELY when the module loads
  document.body.style.cssText = `
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #9333ea, #ec4899, #ef4444);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Add immediate visual feedback
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'initial-loader';
  loadingDiv.innerHTML = `
    <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 400px;">
      <div style="font-size: 60px; margin-bottom: 15px;">❤️</div>
      <h1 style="color: #1f2937; font-size: 32px; margin: 0 0 10px 0;">Frnds.x</h1>
      <p style="color: #6b7280; margin: 0 0 20px 0;">Loading app...</p>
      <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; font-size: 12px; color: #374151;">
        <strong>JavaScript is working!</strong><br>
        Screen: ${window.innerWidth}x${window.innerHeight}<br>
        Time: ${new Date().toLocaleTimeString()}
      </div>
    </div>
  `;

  if (document.body) {
    document.body.appendChild(loadingDiv);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(loadingDiv);
    });
  }

  // Remove loading div once React renders
  setTimeout(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.remove();
    }
  }, 2000);
}

export default function App() {
  // Log app initialization
  console.log('=== FRNDS.X APP INITIALIZED ===');
  console.log('Time:', new Date().toISOString());
  console.log('URL:', window.location.href);
  console.log('User Agent:', navigator.userAgent);

  // Global error handler for unhandled errors
  if (typeof window !== 'undefined') {
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('=== GLOBAL ERROR ===');
      console.error('Message:', msg);
      console.error('URL:', url);
      console.error('Line:', lineNo, 'Column:', columnNo);
      console.error('Error:', error);
      alert(`App Error: ${msg}`);
      return false;
    };

    window.onunhandledrejection = function(event) {
      console.error('=== UNHANDLED PROMISE REJECTION ===');
      console.error('Reason:', event.reason);
      alert(`Promise Error: ${event.reason}`);
    };
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="theme-color" content="#a855f7" />
          <title>Frnds.x - UK Student Connection App</title>
          <meta name="description" content="Connect with verified university students across the UK. Audio, video calls, and genuine friendships." />
        </Helmet>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  );
}