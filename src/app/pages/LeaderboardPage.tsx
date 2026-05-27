import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trophy, TrendingUp, Coins, Crown, Award, Medal } from "lucide-react";

// Mock leaderboard data - in production, this would come from backend
const generateLeaderboard = (currentUserCoins: number, currentUserName: string) => {
  const names = [
    "Emma", "Sophie", "Olivia", "Amelia", "Isla", "Ava", "Mia", "Charlotte",
    "Lily", "Grace"
  ];

  const universities = [
    "Oxford", "Cambridge", "Imperial", "UCL", "Edinburgh"
  ];

  const leaderboard = [];

  // Generate random top earners
  for (let i = 0; i < 20; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const lastName = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + ".";
    const coins = Math.floor(Math.random() * 2000) + 500;
    const university = universities[Math.floor(Math.random() * universities.length)];
    const calls = Math.floor(coins / 6); // Approximate calls

    leaderboard.push({
      name: `${name} ${lastName}`,
      university,
      coins,
      calls,
      isCurrentUser: false
    });
  }

  // Add current user
  leaderboard.push({
    name: currentUserName,
    university: localStorage.getItem("userUniversity") || "Your University",
    coins: currentUserCoins,
    calls: JSON.parse(localStorage.getItem("earningsHistory") || "[]").length,
    isCurrentUser: true
  });

  // Sort by coins
  leaderboard.sort((a, b) => b.coins - a.coins);

  // Add ranks
  return leaderboard.map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};

export function LeaderboardPage() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState(0);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const userName = localStorage.getItem("userName") || "You";
    const coins = parseInt(localStorage.getItem("earnedCoins") || "0");

    setUserGender(gender);

    if (gender === "female") {
      const data = generateLeaderboard(coins, userName);
      setLeaderboard(data);

      const userEntry = data.find(u => u.isCurrentUser);
      if (userEntry) {
        setCurrentUserRank(userEntry.rank);
      }
    } else {
      // Males can view but won't be ranked
      const data = generateLeaderboard(0, "");
      setLeaderboard(data);
    }
  }, []);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: <Crown className="w-6 h-6 text-yellow-500" />, bg: "bg-gradient-to-r from-yellow-50 to-amber-50", border: "border-yellow-400", text: "text-yellow-600" };
      case 2:
        return { icon: <Award className="w-6 h-6 text-gray-400" />, bg: "bg-gradient-to-r from-gray-50 to-slate-50", border: "border-gray-300", text: "text-gray-600" };
      case 3:
        return { icon: <Medal className="w-6 h-6 text-orange-600" />, bg: "bg-gradient-to-r from-orange-50 to-amber-50", border: "border-orange-300", text: "text-orange-600" };
      default:
        return { icon: <Trophy className="w-5 h-5 text-purple-400" />, bg: "bg-white", border: "border-gray-200", text: "text-gray-700" };
    }
  };

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
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl mb-2">Leaderboard</h1>
            <p className="text-gray-500">Top earning students this month</p>
          </div>

          {userGender === "female" && currentUserRank > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 mb-1">Your Current Rank</p>
                  <div className="flex items-center gap-3">
                    <p className="text-5xl text-purple-600">#{currentUserRank}</p>
                    <div>
                      <p className="text-sm text-gray-600">
                        out of {leaderboard.length} students
                      </p>
                      {currentUserRank <= 10 && (
                        <p className="text-xs text-green-600 font-medium">
                          🔥 Top 10! Keep it up!
                        </p>
                      )}
                      {currentUserRank <= 3 && (
                        <p className="text-xs text-yellow-600 font-medium">
                          🏆 You're on the podium!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          )}

          <div className="space-y-3">
            {leaderboard.slice(0, 50).map((user, index) => {
              const badge = getRankBadge(user.rank);
              const isCurrentUser = user.isCurrentUser;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 shadow-md"
                      : `${badge.bg} ${badge.border}`
                  } ${user.rank <= 3 ? "shadow-lg" : ""}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCurrentUser ? "bg-purple-600" : "bg-gray-100"
                    }`}>
                      {user.rank <= 3 ? (
                        badge.icon
                      ) : (
                        <span className={`font-bold ${isCurrentUser ? "text-white" : badge.text}`}>
                          #{user.rank}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${isCurrentUser ? "text-purple-700 text-lg" : ""}`}>
                          {user.name}
                          {isCurrentUser && " (You)"}
                        </p>
                        {user.rank === 1 && (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                            👑 Top Earner
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{user.university}</p>
                      <p className="text-xs text-gray-400">{user.calls} calls completed</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <Coins className="w-5 h-5 text-yellow-500" />
                      <p className="text-xl font-bold text-purple-600">{user.coins}</p>
                    </div>
                    <p className="text-xs text-gray-500">coins earned</p>
                  </div>
                </div>
              );
            })}
          </div>

          {leaderboard.length > 50 && (
            <div className="text-center mt-6 text-gray-500">
              <p className="text-sm">Showing top 50 students</p>
            </div>
          )}
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white">
          <h3 className="text-lg mb-3 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            How to Climb the Leaderboard
          </h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Answer more calls to earn coins</li>
            <li>✓ Video calls earn more coins than audio calls</li>
            <li>✓ Stay online during peak hours for more calls</li>
            <li>✓ Complete your profile for bonus visibility</li>
            <li>✓ Maintain high ratings from callers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
