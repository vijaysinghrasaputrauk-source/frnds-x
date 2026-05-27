import { QRCodeSVG } from "qrcode.react";
import { X, Download, Share2, Smartphone } from "lucide-react";

interface ShareQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function ShareQRModal({ isOpen, onClose, url }: ShareQRModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "uniconnect-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Frnds.x - Student Friendship App",
          text: "Join Frnds.x and connect with students across UK universities!",
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback copy function
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        // Use older method if clipboard API fails
        try {
          const textArea = document.createElement("textarea");
          textArea.value = url;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);

          if (successful) {
            alert("Link copied to clipboard!");
          } else {
            alert(`Copy this link:\n\n${url}`);
          }
        } catch (fallbackErr) {
          alert(`Copy this link:\n\n${url}`);
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Share Frnds.x</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <Smartphone className="w-10 h-10 mx-auto mb-3 text-purple-600" />
          <p className="text-gray-600">
            Scan with your phone camera or share the link
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-4 border-purple-200 mb-6 flex items-center justify-center">
          {url ? (
            <QRCodeSVG
              id="qr-code-svg"
              value={url}
              size={300}
              level="M"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#000000"
              className="w-full h-auto max-w-[300px]"
            />
          ) : (
            <div className="w-[300px] h-[300px] flex items-center justify-center">
              <p className="text-gray-400">Loading...</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-800 font-medium mb-1">App URL:</p>
          <p className="text-xs text-blue-600 break-all font-mono">
            {url || "Loading..."}
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={handleDownload}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Link
          </button>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm text-purple-900 mb-2">📱 How friends can join:</p>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Scan QR code with phone camera</li>
            <li>• Or share the link directly</li>
            <li>• They'll create their own profile</li>
            <li>• Start connecting instantly!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
