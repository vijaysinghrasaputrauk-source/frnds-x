import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";
import { Download, Share2, Copy, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { FrndsLogoIcon } from "../components/FrndsLogo";

export function SharePage() {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Use custom shareable link
    const shareableLink = "frnds.x"; // Your custom domain
    const isDevelopment = window.location.hostname === "localhost" || window.location.hostname.includes("127.0.0.1");
    setCurrentUrl(isDevelopment ? window.location.origin : `https://${shareableLink}`);
  }, []);

  const handleCopy = async () => {
    if (!currentUrl) return;

    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to older method if clipboard API is blocked
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
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          // Show URL in alert as last resort
          alert(`Copy this link:\n\n${currentUrl}`);
        }
      } catch (fallbackErr) {
        // Show URL in alert as absolute last resort
        alert(`Copy this link:\n\n${currentUrl}`);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Frnds.x - Connect with UK Students',
          text: 'Join Frnds.x to connect with verified UK university students!',
          url: currentUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById("share-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 1200;
    canvas.height = 1400;

    img.onload = () => {
      if (ctx) {
        // Background
        ctx.fillStyle = "#7c3aed";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // White card
        ctx.fillStyle = "white";
        ctx.roundRect(100, 100, 1000, 1200, 40);
        ctx.fill();

        // QR code
        ctx.drawImage(img, 300, 300, 600, 600);

        // Text
        ctx.fillStyle = "#1f2937";
        ctx.font = "bold 60px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Frnds.x", 600, 220);

        ctx.font = "30px Arial";
        ctx.fillStyle = "#6b7280";
        ctx.fillText("Connect with UK Students", 600, 1050);

        ctx.font = "bold 36px Arial";
        ctx.fillStyle = "#7c3aed";
        ctx.fillText(currentUrl.replace("https://", ""), 600, 1150);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "frnds-x-share.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-6 hover:underline print:hidden"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <FrndsLogoIcon size="large" />
          </div>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frnds.x
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Connect with UK University Students
          </p>
          <p className="text-sm text-purple-600 mb-8 font-medium">
            📱 Scan to join the community
          </p>

          {/* QR Code */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl inline-block mb-8 shadow-xl border-4 border-purple-200">
            {currentUrl ? (
              <QRCodeSVG
                id="share-qr-code"
                value={currentUrl}
                size={300}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#7c3aed"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>

          {/* Shareable Link */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-6 max-w-lg mx-auto">
            <p className="text-sm text-purple-900 font-medium mb-3">
              📋 Share this link:
            </p>
            <div className="bg-white p-4 rounded-xl mb-4 border border-purple-200">
              <p className="text-2xl font-bold text-purple-600 break-all">
                {currentUrl.replace("https://", "").replace("http://", "")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={handleShare}
                className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center mb-8 print:hidden">
            <button
              onClick={handleDownload}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-bold text-gray-800 mb-1">Connect</h3>
              <p className="text-sm text-gray-600">Audio, Video & Chat with verified students</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-xl">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="font-bold text-gray-800 mb-1">Play Games</h3>
              <p className="text-sm text-gray-600">12 fun multiplayer games in groups</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-bold text-gray-800 mb-1">Events</h3>
              <p className="text-sm text-gray-600">Meet students at UK meetups</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500">
            <p>🇬🇧 UK University Students Only</p>
            <p className="mt-2">Girls earn rewards • Boys subscribe</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white print:hidden">
          <h3 className="font-bold text-lg mb-4">📲 How to Share:</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>✓ <strong>Copy Link</strong> and send via WhatsApp, Telegram, or any messenger</li>
            <li>✓ <strong>Share Button</strong> to share directly on social media</li>
            <li>✓ <strong>Download QR</strong> to post on Instagram stories or flyers</li>
            <li>✓ <strong>Print</strong> to create physical posters for campus</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
