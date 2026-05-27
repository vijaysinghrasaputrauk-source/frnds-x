import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Phone, Video, MessageCircle, Clock, Star, MapPin, User as UserIcon, ChevronRight, Calendar } from "lucide-react";

interface CallHistoryItem {
  id: string;
  girlName: string;
  girlAge: number;
  girlUniversity: string;
  girlCity: string;
  girlInterests: string[];
  girlBio: string;
  girlRating: number;
  girlVerified: boolean;
  callType: "audio" | "video" | "chat";
  duration: string;
  coinsSpent: number;
  date: string;
  time: string;
  emoji: string;
}

export function CallHistoryPage() {
  const navigate = useNavigate();
  const [callHistory, setCallHistory] = useState<CallHistoryItem[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<CallHistoryItem | null>(null);

  useEffect(() => {
    // Load call history from localStorage
    let history = JSON.parse(localStorage.getItem("callHistory") || "[]");

    // Add demo data if no history exists (for testing)
    if (history.length === 0) {
      const demoHistory = [
        {
          id: "demo1",
          girlName: "Emma",
          girlAge: 21,
          girlUniversity: "University of Oxford",
          girlCity: "Oxford",
          girlInterests: ["Photography", "Travel", "Coffee", "Art"],
          girlBio: "Love exploring new cafes and meeting interesting people ☕",
          girlRating: 4.8,
          girlVerified: true,
          emoji: "👩‍🎓",
          callType: "video",
          duration: "15m 30s",
          coinsSpent: 775,
          date: "23/05/2026",
          time: "14:30"
        },
        {
          id: "demo2",
          girlName: "Sophie",
          girlAge: 20,
          girlUniversity: "Imperial College London",
          girlCity: "London",
          girlInterests: ["Reading", "Yoga", "Cooking", "Music"],
          girlBio: "Always up for a good conversation about anything! 💬",
          girlRating: 4.9,
          girlVerified: true,
          emoji: "👩‍💼",
          callType: "audio",
          duration: "8m 45s",
          coinsSpent: 175,
          date: "22/05/2026",
          time: "19:15"
        },
        {
          id: "demo3",
          girlName: "Olivia",
          girlAge: 22,
          girlUniversity: "University of Cambridge",
          girlCity: "Cambridge",
          girlInterests: ["Dancing", "Fitness", "Movies", "Fashion"],
          girlBio: "Student by day, dreamer by night ✨",
          girlRating: 4.7,
          girlVerified: false,
          emoji: "👩‍🔬",
          callType: "chat",
          duration: "12m 20s",
          coinsSpent: 62,
          date: "21/05/2026",
          time: "16:45"
        }
      ];
      history = demoHistory;
      localStorage.setItem("callHistory", JSON.stringify(demoHistory));
    }

    setCallHistory(history);
  }, []);

  const getCallIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Phone className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "chat":
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Phone className="w-5 h-5" />;
    }
  };

  const getCallColor = (type: string) => {
    switch (type) {
      case "audio":
        return "bg-purple-100 text-purple-600";
      case "video":
        return "bg-pink-100 text-pink-600";
      case "chat":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleCallAgain = (type: "audio" | "video" | "chat") => {
    const userCoins = parseInt(localStorage.getItem("userCoins") || "0");
    const coinsNeeded = type === "video" ? 50 : type === "audio" ? 20 : 5;

    if (userCoins < coinsNeeded) {
      navigate("/coins");
      return;
    }

    navigate(`/call?type=${type}`);
  };

  if (selectedProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 text-white">
            <button
              onClick={() => setSelectedProfile(null)}
              className="flex items-center gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to History
            </button>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-12 text-center relative">
                <div className="text-8xl mb-4">{selectedProfile.emoji}</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-3xl font-bold text-white">
                    {selectedProfile.girlName}, {selectedProfile.girlAge}
                  </h2>
                  {selectedProfile.girlVerified && (
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <span className="text-sm">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-1 text-white/90">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm">{selectedProfile.girlRating}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <UserIcon className="w-4 h-4" />
                    <span>{selectedProfile.girlUniversity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedProfile.girlCity}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-center text-lg">
                  {selectedProfile.girlBio}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {selectedProfile.girlInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="bg-purple-50 rounded-xl p-4 mb-6">
                  <h4 className="font-bold text-purple-900 mb-2">Last Call Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-purple-600">Type:</span>
                      <span className="ml-2 font-medium capitalize">{selectedProfile.callType}</span>
                    </div>
                    <div>
                      <span className="text-purple-600">Duration:</span>
                      <span className="ml-2 font-medium">{selectedProfile.duration}</span>
                    </div>
                    <div>
                      <span className="text-purple-600">Spent:</span>
                      <span className="ml-2 font-medium">{selectedProfile.coinsSpent} coins</span>
                    </div>
                    <div>
                      <span className="text-purple-600">Date:</span>
                      <span className="ml-2 font-medium">{selectedProfile.date}</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-gray-800 mb-3">Call Again</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleCallAgain("audio")}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">Audio</span>
                  </button>
                  <button
                    onClick={() => handleCallAgain("video")}
                    className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <Video className="w-5 h-5" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button
                    onClick={() => handleCallAgain("chat")}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6 text-white">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-7 h-7" />
            Call History
          </h1>
          <div className="w-20"></div>
        </div>

        {callHistory.length === 0 ? (
          <div className="max-w-md mx-auto mt-12">
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📞</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">No Call History</h2>
              <p className="text-gray-600 mb-6">
                Your recent calls will appear here
              </p>
              <button
                onClick={() => navigate("/swipe")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Start Calling
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 text-white text-center">
              <div className="text-2xl font-bold">{callHistory.length}</div>
              <div className="text-sm opacity-90">Total Calls</div>
            </div>

            <div className="space-y-4">
              {callHistory.map((call) => (
                <div
                  key={call.id}
                  onClick={() => setSelectedProfile(call)}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-5xl">{call.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            {call.girlName}, {call.girlAge}
                          </h3>
                          {call.girlVerified && (
                            <span className="text-blue-500 text-sm">✓</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{call.girlCity}</span>
                          <span>•</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{call.girlRating}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getCallColor(call.callType)}`}>
                            {getCallIcon(call.callType)}
                            <span className="capitalize font-medium">{call.callType}</span>
                          </div>
                          <div className="text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {call.duration}
                          </div>
                          <div className="text-gray-500">
                            {call.coinsSpent} coins
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-500">{call.date}</div>
                      <div className="text-xs text-gray-400">{call.time}</div>
                      <ChevronRight className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
