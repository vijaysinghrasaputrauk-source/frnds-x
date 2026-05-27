import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Coins, TrendingUp, Calendar, Gift, Award, Trophy, ShieldCheck } from "lucide-react";

export function ProfilePage() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUniversity, setUserUniversity] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [earningsHistory, setEarningsHistory] = useState<any[]>([]);
  const [redemptionHistory, setRedemptionHistory] = useState<any[]>([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const name = localStorage.getItem("userName") || "Student";
    const email = localStorage.getItem("userEmail") || "";
    const university = localStorage.getItem("userUniversity") || "";
    const city = localStorage.getItem("userCity") || "";
    const interests = JSON.parse(localStorage.getItem("userInterests") || "[]");
    const coins = parseInt(localStorage.getItem(gender === "male" ? "userCoins" : "earnedCoins") || "0");
    const earnings = JSON.parse(localStorage.getItem("earningsHistory") || "[]");
    const redemptions = JSON.parse(localStorage.getItem("redemptionHistory") || "[]");
    const verified = localStorage.getItem("isVerified") === "true";

    setUserGender(gender);
    setUserName(name);
    setUserEmail(email);
    setUserUniversity(university);
    setUserCity(city);
    setUserInterests(interests);
    setTotalCoins(coins);
    setEarningsHistory(earnings);
    setRedemptionHistory(redemptions);
    setIsVerified(verified);
  }, []);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const totalEarnings = earningsHistory.reduce((sum, item) => sum + item.coins, 0);
  const totalCalls = earningsHistory.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl">{userName}</h1>
                {isVerified && (
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>
              <p className="text-gray-500">{userEmail}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">University</p>
              <p className="font-medium">{userUniversity || "Not set"}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">City</p>
              <p className="font-medium">{userCity || "Not set"}</p>
            </div>
          </div>

          {userInterests.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {userGender === "female" && (
            <>
              <div className="border-t pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-600" />
                    Earnings Overview
                  </h2>
                  <button
                    onClick={() => navigate("/leaderboard")}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-4 py-2 rounded-xl hover:shadow-md transition-all"
                  >
                    <Trophy className="w-5 h-5" />
                    Leaderboard
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                    <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-3xl text-purple-600 mb-1">{totalCoins}</p>
                    <p className="text-sm text-gray-600">Total Coins</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-3xl text-green-600 mb-1">{totalCalls}</p>
                    <p className="text-sm text-gray-600">Connections</p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <Gift className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-3xl text-blue-600 mb-1">{redemptionHistory.length}</p>
                    <p className="text-sm text-gray-600">Rewards Redeemed</p>
                  </div>
                </div>

                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Recent Earnings
                </h3>

                {earningsHistory.length > 0 ? (
                  <div className="space-y-3">
                    {earningsHistory.slice(0, 5).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.type === 'video' ? 'bg-pink-100' : item.type === 'chat' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {item.type === 'video' ? '📹' : item.type === 'chat' ? '💬' : '📞'}
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.type === 'video' ? 'Video Call' : item.type === 'chat' ? 'Text Chat' : 'Audio Call'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(item.date)} at {formatTime(item.date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">+{item.coins}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {Math.floor(item.duration / 60)}m {item.duration % 60}s
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No earnings yet. Start taking calls to earn coins!</p>
                  </div>
                )}

                {redemptionHistory.length > 0 && (
                  <>
                    <h3 className="text-xl mt-8 mb-4 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-gray-600" />
                      Redemption History
                    </h3>

                    <div className="space-y-3">
                      {redemptionHistory.slice(0, 5).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                          <div>
                            <p className="font-medium">{item.reward}</p>
                            <p className="text-sm text-gray-600">
                              {formatDate(item.date)} • Code: {item.code}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-600 font-medium">{item.value}</p>
                            <p className="text-xs text-gray-500">{item.coins} coins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
