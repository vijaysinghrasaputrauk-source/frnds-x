import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Coins, Phone, Video, MessageCircle, User, Gift, LogOut, Calendar, Share2, Users, Trophy, Gamepad2, Clock } from "lucide-react";
import { ShareQRModal } from "../components/ShareQRModal";
import { FrndsLogoIcon } from "../components/FrndsLogo";

export function DashboardPage() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [userName, setUserName] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const name = localStorage.getItem("userName") || "Student";
    setUserGender(gender);
    setUserName(name);

    if (!gender) {
      navigate("/login");
      return;
    }

    if (gender === "male") {
      setUserCoins(parseInt(localStorage.getItem("userCoins") || "50"));
    } else {
      setUserCoins(parseInt(localStorage.getItem("earnedCoins") || "0"));
    }

    setOnlineUsers(Math.floor(Math.random() * 200) + 150);
  }, [navigate]);

  const handleStartCall = (type: "audio" | "video") => {
    if (userGender === "male" && userCoins < 20) {
      navigate("/coins");
      return;
    }
    navigate(`/call?type=${type}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FrndsLogoIcon size="medium" />
            <div className="text-white">
              <h1 className="text-2xl">Welcome, {userName}!</h1>
              <p className="text-white/80 text-sm">{onlineUsers} students online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              title="Profile"
            >
              <User className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              title="Share App"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Balance</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <p className="text-2xl">{userCoins}</p>
                  </div>
                </div>
              </div>

              {userGender === "male" && (
                <button
                  onClick={() => navigate("/coins")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  Buy Coins
                </button>
              )}

              {userGender === "female" && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Earnings</p>
                  <p className="text-green-600">£{(userCoins * 0.05).toFixed(2)}</p>
                </div>
              )}
            </div>

            {userGender === "male" && userCoins < 20 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Low balance! Buy more coins to continue making calls.
                </p>
              </div>
            )}
          </div>

          {userGender === "male" && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl mb-2 text-center">Quick Connect</h2>
              <p className="text-gray-500 text-center mb-6">
                Choose how you want to connect with students
              </p>

              <button
                onClick={() => navigate("/swipe")}
                className="w-full p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all group mb-4"
              >
                <MessageCircle className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl mb-2">Connect Now</h3>
                <p className="text-sm text-white/80">
                  Audio, Video, Chat & Games
                </p>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/browse")}
                  className="w-full p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all group"
                >
                  <Users className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl mb-2">Browse Profiles</h3>
                  <p className="text-sm text-white/80">
                    View student profiles
                  </p>
                </button>

                <button
                  onClick={() => navigate("/call-history")}
                  className="w-full p-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl hover:shadow-lg transition-all group"
                >
                  <Clock className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl mb-2">Call History</h3>
                  <p className="text-sm text-white/80">
                    View recent calls
                  </p>
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl mb-2 text-center">
              {userGender === "male" ? "Quick Connect" : "Start Connecting"}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              {userGender === "female"
                ? "Receive calls and earn rewards while chatting!"
                : "Or start a random call instantly"}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleStartCall("audio")}
                className="p-8 border-2 border-purple-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <Phone className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl mb-2">Audio Call</h3>
                <p className="text-sm text-gray-500">
                  {userGender === "male" ? "20 coins/min" : "Earn 5 coins/min"}
                </p>
              </button>

              <button
                onClick={() => handleStartCall("video")}
                className="p-8 border-2 border-pink-200 rounded-2xl hover:border-pink-500 hover:bg-pink-50 transition-all group"
              >
                <Video className="w-12 h-12 mx-auto mb-4 text-pink-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl mb-2">Video Call</h3>
                <p className="text-sm text-gray-500">
                  {userGender === "male" ? "50 coins/min" : "Earn 8 coins/min"}
                </p>
              </button>
            </div>

            <button
              onClick={() => {
                if (userGender === "male" && userCoins < 5) {
                  navigate("/coins");
                  return;
                }
                navigate("/chat");
              }}
              className="w-full p-4 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg mb-1">Text Chat</h3>
              <p className="text-sm text-gray-500">
                {userGender === "male" ? "5 coins/min" : "Earn 3 coins/min"}
              </p>
            </button>
          </div>

          {/* Games Section - Available for Everyone */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl mb-2 text-center">Play Games</h2>
            <p className="text-gray-500 text-center mb-6">
              {userGender === "female"
                ? "Play fun games with UK students and earn coins!"
                : "Join group games with UK students"}
            </p>

            <button
              onClick={() => navigate("/games")}
              className="w-full p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl hover:shadow-lg transition-all group"
            >
              <Gamepad2 className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl mb-2">Games Room</h3>
              <p className="text-sm text-white/80">
                12 fun games with mixed groups • {userGender === "male" ? "10 coins/min" : "Earn coins while playing"}
              </p>
            </button>
          </div>

          {userGender === "female" && (
            <>
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <h3 className="text-xl">Leaderboard</h3>
                  </div>
                  <button
                    onClick={() => navigate("/leaderboard")}
                    className="text-purple-600 text-sm font-medium hover:underline"
                  >
                    View Full →
                  </button>
                </div>

                <button
                  onClick={() => navigate("/leaderboard")}
                  className="w-full p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        🏆
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-600">See where you rank</p>
                        <p className="text-xl text-gray-800 font-medium">Top Earners This Month</p>
                        <p className="text-xs text-gray-500 mt-1">Compete with students across UK</p>
                      </div>
                    </div>
                    <div className="text-3xl group-hover:scale-110 transition-transform">
                      →
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-pink-600" />
                    <h3 className="text-xl">Your Earnings</h3>
                  </div>
                  <button
                    onClick={() => navigate("/rewards")}
                    className="text-purple-600 text-sm font-medium hover:underline"
                  >
                    View All →
                  </button>
                </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-4">
                <div className="text-center">
                  <p className="text-sm text-purple-700 mb-1">Total Coins Earned</p>
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-8 h-8 text-yellow-500" />
                    <p className="text-4xl text-purple-600">{userCoins}</p>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    Worth £{(userCoins * 0.05).toFixed(2)} in rewards
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Available Gift Cards</span>
                  <span className="font-medium text-green-600">{Math.floor(userCoins / 100)} 🎁</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Coins to Next Reward</span>
                  <span className="font-medium">{100 - (userCoins % 100)}</span>
                </div>
                <button
                  onClick={() => navigate("/rewards")}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  Redeem Rewards
                </button>
              </div>
            </div>
            </>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl">Upcoming Events</h3>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="text-purple-600 text-sm font-medium hover:underline"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-all">
                <p className="font-medium mb-1">London Student Meetup</p>
                <p className="text-sm text-gray-500">May 25, 2026 • Hyde Park</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-purple-600">48/100 attendees</span>
                  <span className="text-sm font-bold text-purple-600">£10</span>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-all">
                <p className="font-medium mb-1">Manchester Coffee Social</p>
                <p className="text-sm text-gray-500">May 28, 2026 • Northern Quarter</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-purple-600">32/60 attendees</span>
                  <span className="text-sm font-bold text-purple-600">£10</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/events")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Browse All Events
            </button>
          </div>
        </div>
      </div>

      <ShareQRModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={window.location.origin}
      />
    </div>
  );
}
