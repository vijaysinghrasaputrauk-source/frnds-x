import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Phone, Video, Mic, MicOff, VideoOff, X, MessageCircle, Flag } from "lucide-react";

const RANDOM_NAMES = ["Sarah", "Emily", "Sophie", "Emma", "Olivia", "Charlotte", "Amelia", "Mia"];
const RANDOM_UNIVERSITIES = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "UCL", "University of Edinburgh", "King's College London",
  "University of Manchester", "University of Bristol"
];
const RANDOM_CITIES = ["London", "Cambridge", "Oxford", "Manchester", "Edinburgh", "Bristol", "Birmingham", "Leeds"];
const RANDOM_INTERESTS = [
  ["Photography", "Travel", "Coffee", "Art"],
  ["Reading", "Yoga", "Cooking", "Music"],
  ["Dancing", "Fitness", "Movies", "Fashion"],
  ["Gaming", "Anime", "Tech", "Science"],
  ["Nature", "Hiking", "Writing", "Poetry"],
  ["Theatre", "History", "Languages", "Culture"]
];
const RANDOM_BIOS = [
  "Love exploring new cafes and meeting interesting people ☕",
  "Always up for a good conversation about anything! 💬",
  "Student by day, dreamer by night ✨",
  "Just here to make new friends and have fun chats 🌟",
  "Studying hard but always time for good company 📚",
  "Passionate about life and meeting new people 🌸"
];
const RANDOM_EMOJIS = ["👩‍🎓", "👩‍💼", "👩‍🔬", "👩‍🎨", "👩‍💻", "👩‍🏫", "👩‍⚕️", "👩‍🌾"];

interface PartnerProfile {
  id: string;
  girlName: string;
  girlAge: number;
  girlUniversity: string;
  girlCity: string;
  girlInterests: string[];
  girlBio: string;
  girlRating: number;
  girlVerified: boolean;
  emoji: string;
}

export function CallPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("type") || "audio";

  const [status, setStatus] = useState<"matching" | "connected" | "ended">("matching");
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [partner, setPartner] = useState({ name: "", university: "" });
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
  const [userGender, setUserGender] = useState("");
  const [coinsSpent, setCoinsSpent] = useState(0);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    setUserGender(gender);

    const matchingTimer = setTimeout(() => {
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const randomUni = RANDOM_UNIVERSITIES[Math.floor(Math.random() * RANDOM_UNIVERSITIES.length)];
      const randomCity = RANDOM_CITIES[Math.floor(Math.random() * RANDOM_CITIES.length)];
      const randomInterests = RANDOM_INTERESTS[Math.floor(Math.random() * RANDOM_INTERESTS.length)];
      const randomBio = RANDOM_BIOS[Math.floor(Math.random() * RANDOM_BIOS.length)];
      const randomEmoji = RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
      const randomAge = Math.floor(Math.random() * 5) + 19; // 19-23
      const randomRating = (Math.random() * 0.8 + 4.2).toFixed(1); // 4.2-5.0

      setPartner({ name: randomName, university: randomUni });

      const profile: PartnerProfile = {
        id: Date.now().toString(),
        girlName: randomName,
        girlAge: randomAge,
        girlUniversity: randomUni,
        girlCity: randomCity,
        girlInterests: randomInterests,
        girlBio: randomBio,
        girlRating: parseFloat(randomRating),
        girlVerified: Math.random() > 0.3, // 70% verified
        emoji: randomEmoji
      };

      setPartnerProfile(profile);
      setStatus("connected");
    }, 2000);

    return () => clearTimeout(matchingTimer);
  }, []);

  useEffect(() => {
    if (status === "connected") {
      const timer = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;

          if (userGender === "male") {
            const coinsPerMin = callType === "video" ? 50 : 20;
            const totalCoins = Math.ceil((newDuration / 60) * coinsPerMin);
            setCoinsSpent(totalCoins);
          } else {
            const coinsPerMin = callType === "video" ? 8 : 5;
            const earnedCoins = Math.floor((newDuration / 60) * coinsPerMin);
            const currentCoins = parseInt(localStorage.getItem("earnedCoins") || "0");
            localStorage.setItem("earnedCoins", (currentCoins + earnedCoins).toString());
          }

          return newDuration;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, callType, userGender]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    if (userGender === "male") {
      const currentCoins = parseInt(localStorage.getItem("userCoins") || "50");
      localStorage.setItem("userCoins", Math.max(0, currentCoins - coinsSpent).toString());

      // Save call to history
      if (partnerProfile) {
        const callHistoryItem = {
          ...partnerProfile,
          callType: callType as "audio" | "video" | "chat",
          duration: formatTime(duration),
          coinsSpent: coinsSpent,
          date: new Date().toLocaleDateString("en-GB"),
          time: new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })
        };

        const history = JSON.parse(localStorage.getItem("callHistory") || "[]");
        history.unshift(callHistoryItem);
        localStorage.setItem("callHistory", JSON.stringify(history.slice(0, 50))); // Keep last 50 calls
      }

      setStatus("ended");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      // Female user - redirect to call summary to show earnings
      setStatus("ended");
      setTimeout(() => {
        navigate(`/call-summary?duration=${duration}&type=${callType}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {status === "matching" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-3xl text-white mb-4">Finding a match...</h2>
            <p className="text-white/80">
              Connecting you with a student from a different university
            </p>
          </div>
        )}

        {status === "connected" && (
          <div className="space-y-4">
            {callType === "video" ? (
              <div className="relative">
                {/* Main video feed - Partner's video */}
                <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 rounded-3xl overflow-hidden aspect-[9/16] md:aspect-video relative">
                  {isVideoOff ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-6xl">
                          {partner.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl text-white mb-1">{partner.name}</h2>
                        <p className="text-white/70 text-sm">{partner.university}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {/* Simulated video background with gradient animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-red-500/40 animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-9xl filter drop-shadow-2xl animate-subtle-bounce">
                          {partnerProfile?.emoji || "👩‍🎓"}
                        </div>
                      </div>
                      {/* Top overlay with name */}
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <p className="text-white font-medium">{partner.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Picture-in-picture - Your video */}
                <div className="absolute bottom-20 right-4 w-32 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
                  {isVideoOff ? (
                    <div className="flex items-center justify-center h-full">
                      <VideoOff className="w-8 h-8 text-white/50" />
                    </div>
                  ) : (
                    <div className="relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-500/40 to-pink-500/40 animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl">
                          {userGender === "male" ? "👨‍🎓" : "👩‍🎓"}
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                        <p className="text-white text-xs">You</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats overlay */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-2xl p-3">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-mono">{formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-300">💰</span>
                      <span className="font-mono">
                        {userGender === "male" ? `-${coinsSpent}` : `+${Math.floor((duration / 60) * 8)}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Control bar */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/70 backdrop-blur-lg rounded-full px-6 py-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full transition-all ${
                      isMuted ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-full transition-all ${
                      isVideoOff ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {isVideoOff ? (
                      <VideoOff className="w-5 h-5 text-white" />
                    ) : (
                      <Video className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </button>

                  <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                    <Flag className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                    {partner.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl text-white mb-1">{partner.name}</h2>
                  <p className="text-white/70 text-sm">{partner.university}</p>
                </div>

                <div className="bg-white/20 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="text-white">
                      <p className="text-sm opacity-80">Call Duration</p>
                      <p className="text-3xl font-mono">{formatTime(duration)}</p>
                    </div>
                    <div className="text-white text-right">
                      <p className="text-sm opacity-80">
                        {userGender === "male" ? "Coins Spent" : "Coins Earned"}
                      </p>
                      <p className="text-3xl font-mono">
                        {userGender === "male" ? `-${coinsSpent}` : `+${Math.floor((duration / 60) * 5)}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full transition-all ${
                      isMuted ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="w-6 h-6 text-white" />
                    ) : (
                      <Mic className="w-6 h-6 text-white" />
                    )}
                  </button>

                  <button className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </button>

                  <button className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all">
                    <Flag className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-white/80 text-sm text-center">
              💡 Tip: Be respectful and genuine. Report any inappropriate behavior.
            </div>
          </div>
        )}

        {status === "ended" && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl mb-4">Call Ended</h2>
            <p className="text-gray-600 mb-6">Duration: {formatTime(duration)}</p>

            {userGender === "male" ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">Coins spent: {coinsSpent}</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  Coins earned: +{Math.floor((duration / 60) * (callType === "video" ? 8 : 5))}
                </p>
              </div>
            )}

            <p className="text-gray-500">Returning to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
