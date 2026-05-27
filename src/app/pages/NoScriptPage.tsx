export function NoScriptPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #9333ea, #ec4899, #ef4444);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          h1 { font-size: 32px; color: #1f2937; margin: 15px 0 10px 0; }
          .emoji { font-size: 60px; margin-bottom: 10px; }
          p { color: #6b7280; margin-bottom: 20px; line-height: 1.6; }
          a {
            display: block;
            padding: 16px;
            background: linear-gradient(to right, #9333ea, #ec4899);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .debug {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 12px;
            text-align: left;
            color: #374151;
          }
        `}</style>
      </head>
      <body>
        <div className="card">
          <div className="emoji">⚠️</div>
          <h1>JavaScript Required</h1>
          <p>
            Frnds.x requires JavaScript to run. Please enable JavaScript in your browser settings.
          </p>
          <p style={{ fontSize: '14px' }}>
            If JavaScript is enabled and you're still seeing this, there may be a loading issue.
          </p>
          <a href="/">Reload Page</a>
          <div className="debug">
            <strong>Troubleshooting:</strong><br />
            • Check if JavaScript is enabled<br />
            • Try reloading the page<br />
            • Clear browser cache<br />
            • Try a different browser
          </div>
        </div>
      </body>
    </html>
  );
}
