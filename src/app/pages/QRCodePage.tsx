import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Printer, Download } from "lucide-react";
import { useEffect, useState } from "react";

export function QRCodePage() {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Use custom domain if deployed, otherwise use current URL
    const deployedUrl = "https://frnds-x.vercel.app"; // Update this after deployment
    const isDevelopment = window.location.hostname === "localhost" || window.location.hostname.includes("127.0.0.1");
    setCurrentUrl(isDevelopment ? window.location.origin : deployedUrl);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const svg = document.getElementById("main-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 1024;
    canvas.height = 1024;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "frnds-x-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <button
          onClick={() => navigate("/")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all print:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-purple-600" fill="currentColor" />
            <h1 className="text-4xl">Frnds.x</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Connect with UK University Students
          </p>
          <p className="text-sm text-purple-600 mb-8 font-medium">
            📱 Point your phone camera at this QR code to join
          </p>

          <div className="bg-white p-12 rounded-2xl border-4 border-purple-200 inline-block mb-8 shadow-xl">
            {currentUrl ? (
              <QRCodeSVG
                id="main-qr-code"
                value={currentUrl}
                size={400}
                level="M"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            ) : (
              <div className="w-[400px] h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Loading QR code...</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 max-w-lg mx-auto print:hidden">
            <p className="text-sm text-blue-900 font-medium mb-2 text-center">
              📋 Can't scan? Use this URL instead:
            </p>
            <p className="text-xs text-blue-700 text-center break-all font-mono mb-4 bg-white p-3 rounded-lg">
              {currentUrl || "Loading..."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  if (!currentUrl) return;

                  try {
                    // Try modern clipboard API first
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm transition-all"
              >
                📋 Copy URL
              </button>
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm text-center transition-all"
              >
                🔗 Test Link
              </a>
            </div>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
              <h3 className="text-lg mb-4">How to Join on Mobile:</h3>
              <ol className="text-left space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  <span>Scan QR code with your phone camera OR copy the URL above</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  <span>Tap the notification/link or paste URL in mobile browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    3
                  </span>
                  <span>Create account & verify with student ID</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    4
                  </span>
                  <span>Start connecting with UK students!</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="flex gap-4 justify-center print:hidden">
            <button
              onClick={handleDownload}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download QR
            </button>
            <button
              onClick={handlePrint}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>🇬🇧 UK University Students Only</p>
            <p className="mt-2">Free for female students • Subscription for male students</p>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 max-w-lg mx-auto print:hidden">
          <h3 className="text-lg text-green-900 mb-3 font-medium">
            🧪 Mobile Testing Tools
          </h3>
          <p className="text-sm text-green-800 mb-3">
            Use these pages to test mobile access:
          </p>
          <div className="space-y-2">
            <a
              href={currentUrl + "/diagnostic"}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center transition-all"
            >
              📊 Diagnostic Page
            </a>
            <a
              href={currentUrl + "/"}
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-center transition-all"
            >
              🚀 Simple Landing Page
            </a>
          </div>
          <p className="text-xs text-green-700 mt-2 text-center">
            These pages load faster and show detailed info
          </p>
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 max-w-lg mx-auto print:hidden">
          <h3 className="text-lg text-yellow-900 mb-3 font-medium">
            ⚡ QR Code Not Scanning?
          </h3>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>✓ Make sure your screen brightness is turned up</li>
            <li>✓ Hold your phone 6-8 inches from the screen</li>
            <li>✓ Try using a different phone/camera</li>
            <li>✓ Use the "Copy URL" button above and paste in browser</li>
            <li>✓ Click "Test Link" to verify the URL works</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-white/80 text-sm print:hidden">
          <p>Demo Version - All data is simulated</p>
        </div>
      </div>
    </div>
  );
}
