import { useNavigate } from "react-router";
import { Heart } from "lucide-react";

export function SimpleLandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #ef4444 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>❤️</div>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#1f2937' }}>
          Frnds.x
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          UK Student Friendship App
        </p>

        <button
          onClick={() => navigate("/signup")}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: '100%',
            background: 'white',
            color: '#6b7280',
            padding: '12px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Already have account? Login
        </button>

        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px' }}>
          <p>🇬🇧 UK Universities Only</p>
          <p style={{ marginTop: '5px' }}>Connect • Call • Chat</p>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#4b5563'
        }}>
          ✓ App loaded successfully on mobile
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a
            href="/full"
            style={{
              color: '#6b7280',
              fontSize: '11px',
              textDecoration: 'underline'
            }}
          >
            Full Version
          </a>
          <span style={{ color: '#d1d5db' }}>•</span>
          <a
            href="/diagnostic"
            style={{
              color: '#6b7280',
              fontSize: '11px',
              textDecoration: 'underline'
            }}
          >
            Diagnostic
          </a>
        </div>
      </div>
    </div>
  );
}
