import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Coins, Clock, TrendingUp, ArrowRight } from "lucide-react";

export function CallSummaryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callDuration = parseInt(searchParams.get("duration") || "0");
  const callType = searchParams.get("type") || "audio";

  const [userGender, setUserGender] = useState("");
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    setUserGender(gender);

    if (gender === "female") {
      // Calculate earnings
      const coinsPerMin = callType === "video" ? 8 : callType === "chat" ? 3 : 5;
      const earned = Math.floor((callDuration / 60) * coinsPerMin);
      setCoinsEarned(earned);

      // Update total coins
      const current = parseInt(localStorage.getItem("earnedCoins") || "0");
      const newTotal = current + earned;
      localStorage.setItem("earnedCoins", newTotal.toString());
      setTotalCoins(newTotal);

      // Add to earnings history
      const history = JSON.parse(localStorage.getItem("earningsHistory") || "[]");
      history.unshift({
        date: new Date().toISOString(),
        duration: callDuration,
        type: callType,
        coins: earned,
      });
      localStorage.setItem("earningsHistory", JSON.stringify(history.slice(0, 50)));

      // Show celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [callDuration, callType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const calculateGiftCards = () => {
    return Math.floor(totalCoins / 100);
  };

  const coinsToNextReward = () => {
    return 100 - (totalCoins % 100);
  };

  if (userGender !== "female") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Coins className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Great Job!</h1>
            <p className="text-gray-500">You've completed your {callType === "chat" ? "chat" : "call"}</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-2">You Earned</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Coins className="w-8 h-8 text-yellow-500" />
                <p className="text-5xl text-green-600">+{coinsEarned}</p>
              </div>
              <p className="text-sm text-green-600">Coins</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">Duration</p>
              </div>
              <p className="text-2xl">{formatTime(callDuration)}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">Total Coins</p>
              </div>
              <p className="text-2xl text-purple-600">{totalCoins}</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-purple-700">Next Reward Progress</p>
                <p className="text-xs text-purple-600 mt-1">
                  {coinsToNextReward()} more coins to unlock a gift card!
                </p>
              </div>
              <div className="text-2xl">{calculateGiftCards()} 🎁</div>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{ width: `${((totalCoins % 100) / 100) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/rewards")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              View Rewards & Redeem
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-white text-center">
          <p className="text-sm">
            💰 Keep chatting to earn more coins and unlock amazing rewards!
          </p>
        </div>
      </div>
    </div>
  );
}
