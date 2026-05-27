import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Phone, Video, MessageCircle, Coins, Gamepad2 } from "lucide-react";

export function ProfileCardsPage() {
  const navigate = useNavigate();
  const [userCoins, setUserCoins] = useState(parseInt(localStorage.getItem("userCoins") || "50"));
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Student");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Student";
    setUserName(name);
  }, []);

  const handleConnect = (type: "audio" | "video" | "chat") => {
    const costPerMin = type === "video" ? 50 : type === "audio" ? 20 : 5;

    if (userCoins < costPerMin) {
      navigate("/coins");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/call?type=${type}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 relative overflow-hidden">
      {/* Animated Female Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-scroll-left opacity-60"
            style={{
              top: `${(i * 5) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 5)}s`
            }}
          >
            👩
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(-100px);
          }
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 text-white">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
            title="Dashboard"
          >
            <User className="w-6 h-6" />
          </button>
          <div className="text-2xl font-bold">Frnds.x</div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Coins className="w-5 h-5 text-yellow-300" />
            <span className="font-bold">{userCoins}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-lg mx-auto mt-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            {isSearching ? (
              <div className="py-12">
                <div className="text-8xl mb-6 animate-bounce">👩</div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Searching...</h2>
                <p className="text-gray-600">Finding the perfect match for you</p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-8xl mb-6">💬</div>
                <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  Connect Now
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                  Start chatting with verified female students across UK
                </p>

                {/* Connection Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 bg-purple-50 rounded-2xl p-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">250+</div>
                    <div className="text-xs text-gray-600">Online Now</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">98%</div>
                    <div className="text-xs text-gray-600">Verified</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">24/7</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>

                {/* Connect Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleConnect("audio")}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Audio Call</div>
                        <div className="text-sm opacity-90">Voice chat with students</div>
                      </div>
                    </div>
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      20 coins/min
                    </div>
                  </button>

                  <button
                    onClick={() => handleConnect("video")}
                    className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Video className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Video Call</div>
                        <div className="text-sm opacity-90">Face to face connection</div>
                      </div>
                    </div>
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      50 coins/min
                    </div>
                  </button>

                  <button
                    onClick={() => handleConnect("chat")}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Text Chat</div>
                        <div className="text-sm opacity-90">Message instantly</div>
                      </div>
                    </div>
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      5 coins/min
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/games")}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Gamepad2 className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Play Games</div>
                        <div className="text-sm opacity-90">Group games with UK students</div>
                      </div>
                    </div>
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      10 coins/min
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/browse")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl hover:shadow-xl transition-all flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Browse Profiles</div>
                        <div className="text-sm opacity-90">View & select student profiles</div>
                      </div>
                    </div>
                    <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Free
                    </div>
                  </button>
                </div>

                {/* Buy Coins Link */}
                <button
                  onClick={() => navigate("/coins")}
                  className="mt-6 text-purple-600 font-bold underline hover:text-purple-800 transition-colors"
                >
                  Need more coins? Buy now →
                </button>
              </>
            )}
          </div>

          {/* Bottom Info */}
          <div className="text-center text-white mt-6 space-y-2">
            <p className="text-sm opacity-90">✓ All profiles verified</p>
            <p className="text-sm opacity-90">✓ Safe & Secure connections</p>
            <p className="text-sm opacity-90">✓ 24/7 Support available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
