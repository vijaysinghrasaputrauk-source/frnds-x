import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("=== ERROR BOUNDARY CAUGHT ERROR ===");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Time:", new Date().toISOString());

    // Try to alert on mobile
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        alert(`App Error: ${error.message}`);
      }, 100);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'white',
            color: '#1f2937',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '400px'
          }}>
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
              ⚠️ Loading Error
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Something went wrong loading the app.
            </p>
            <pre style={{
              background: '#f3f4f6',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '11px',
              textAlign: 'left',
              overflow: 'auto',
              marginBottom: '20px'
            }}>
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
