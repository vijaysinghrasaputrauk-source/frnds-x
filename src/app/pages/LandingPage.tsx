import { useNavigate } from "react-router";
import { Users, Heart, Shield, Sparkles, QrCode, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { MobileCheck } from "../components/MobileCheck";

export function LandingPage() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.origin);

    // Log for debugging
    console.log("LandingPage loaded");
    console.log("Origin:", window.location.origin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <MobileCheck />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-12 h-12 text-white" fill="white" />
            <h1 className="text-5xl text-white">Frnds.x</h1>
          </div>
          <p className="text-xl text-white/90">
            Connect with students across UK universities
          </p>
          <p className="text-white/80 mt-2">
            Beat loneliness. Make genuine friendships. Audio & Video calls.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <Users className="w-10 h-10 mb-4" />
            <h3 className="text-xl mb-2">Random Matching</h3>
            <p className="text-white/80">
              Connect with students from different universities automatically
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <Shield className="w-10 h-10 mb-4" />
            <h3 className="text-xl mb-2">Verified Students</h3>
            <p className="text-white/80">
              University ID verification ensures genuine student connections
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <Sparkles className="w-10 h-10 mb-4" />
            <h3 className="text-xl mb-2">Real Friendships</h3>
            <p className="text-white/80">
              Audio, video calls, and chat to build meaningful connections
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl text-center mb-6 text-gray-800">
            Get Started
          </h2>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl mb-4 hover:shadow-lg transition-all"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl mb-4 hover:bg-gray-50 transition-all"
          >
            Login
          </button>

          <button
            onClick={() => setShowQR(true)}
            className="w-full bg-white border-2 border-purple-600 text-purple-600 py-4 rounded-xl mb-4 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            Scan QR Code on Mobile
          </button>

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>🇬🇧 Available in UK only</p>
            <p className="mt-2">Must be a university student to join</p>
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/qr")}
              className="text-white/90 hover:text-white underline text-sm"
            >
              View Printable QR Code →
            </button>
            <button
              onClick={() => navigate("/test")}
              className="text-white/90 hover:text-white underline text-sm"
            >
              Mobile Test Page →
            </button>
          </div>
          <p className="text-white/70 text-sm">Demo Version - All data is simulated</p>
        </div>
      </div>

      {showQR && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl mb-2">Access on Mobile</h2>
              <p className="text-gray-600">
                Scan this QR code with your phone camera to open the app
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border-4 border-purple-200 mb-6 flex items-center justify-center">
              {currentUrl ? (
                <QRCodeSVG
                  value={currentUrl}
                  size={300}
                  level="M"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  className="w-full h-auto max-w-[300px]"
                />
              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center">
                  <p className="text-gray-400">Loading QR code...</p>
                </div>
              )}
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-purple-900 mb-2 font-medium">
                📱 How to scan on mobile:
              </p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Open your phone's <strong>Camera app</strong></li>
                <li>• Hold phone 6-8 inches from screen</li>
                <li>• Point camera at the QR code above</li>
                <li>• Tap the notification/banner that appears</li>
                <li>• QR not working? Copy URL below instead</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
              <p className="text-xs text-blue-800 mb-1 font-medium">Alternative: Manual URL</p>
              <p className="text-xs text-blue-600 break-all font-mono mb-2">
                {currentUrl || "Loading..."}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    if (!currentUrl) return;

                    try {
                      await navigator.clipboard.writeText(currentUrl);
                      alert("✓ URL copied! Paste it in your mobile browser.");
                    } catch (err) {
                      // Fallback to older method
                      try {
                        const textArea = document.createElement("textarea");
                        textArea.value = currentUrl;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-999999px";
                        textArea.style.top = "-999999px";
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();

                        const successful = document.execCommand('copy');
                        document.body.removeChild(textArea);

                        if (successful) {
                          alert("✓ URL copied! Paste it in your mobile browser.");
                        } else {
                          alert(`Copy this URL:\n\n${currentUrl}`);
                        }
                      } catch (fallbackErr) {
                        alert(`Copy this URL:\n\n${currentUrl}`);
                      }
                    }
                  }}
                  className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-all"
                >
                  Copy URL
                </button>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-all"
                >
                  Test URL
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
