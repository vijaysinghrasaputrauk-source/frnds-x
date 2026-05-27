import { useState } from "react";
import { useNavigate } from "react-router";
import { Gamepad2, Users, Trophy, Star, Crown, Zap, Heart, Brain, Music, Film } from "lucide-react";

interface Game {
  id: number;
  name: string;
  description: string;
  icon: string;
  players: string;
  duration: string;
  category: string;
  onlinePlayers: number;
}

const GAMES: Game[] = [
  {
    id: 1,
    name: "Truth or Dare",
    description: "Classic game of revealing truths or taking on fun dares with UK students",
    icon: "🎭",
    players: "4-8 players",
    duration: "15-30 min",
    category: "Party",
    onlinePlayers: 45
  },
  {
    id: 2,
    name: "UK Trivia Challenge",
    description: "Test your knowledge about UK culture, history, and universities",
    icon: "🧠",
    players: "2-10 players",
    duration: "10-20 min",
    category: "Trivia",
    onlinePlayers: 32
  },
  {
    id: 3,
    name: "Would You Rather",
    description: "Choose between two options and see what others pick",
    icon: "🤔",
    players: "3-12 players",
    duration: "10-25 min",
    category: "Party",
    onlinePlayers: 28
  },
  {
    id: 4,
    name: "Two Truths & A Lie",
    description: "Share facts about yourself and let others guess the lie",
    icon: "🎲",
    players: "3-8 players",
    duration: "15-30 min",
    category: "Icebreaker",
    onlinePlayers: 38
  },
  {
    id: 5,
    name: "University Quiz Battle",
    description: "Compete with students from different UK universities",
    icon: "🎓",
    players: "2-6 players",
    duration: "20-30 min",
    category: "Trivia",
    onlinePlayers: 24
  },
  {
    id: 6,
    name: "Never Have I Ever",
    description: "Discover fun facts about your new friends",
    icon: "🎊",
    players: "4-10 players",
    duration: "15-25 min",
    category: "Party",
    onlinePlayers: 41
  },
  {
    id: 7,
    name: "British Accent Challenge",
    description: "Guess regional UK accents and have fun with impressions",
    icon: "🗣️",
    players: "3-8 players",
    duration: "10-20 min",
    category: "Fun",
    onlinePlayers: 19
  },
  {
    id: 8,
    name: "Story Building",
    description: "Create hilarious stories together, one word at a time",
    icon: "📖",
    players: "3-10 players",
    duration: "15-30 min",
    category: "Creative",
    onlinePlayers: 22
  },
  {
    id: 9,
    name: "Music Quiz UK",
    description: "Guess British artists and popular UK chart songs",
    icon: "🎵",
    players: "2-8 players",
    duration: "15-25 min",
    category: "Music",
    onlinePlayers: 35
  },
  {
    id: 10,
    name: "Emoji Charades",
    description: "Act out emojis and let others guess what you're miming",
    icon: "😄",
    players: "4-12 players",
    duration: "10-20 min",
    category: "Party",
    onlinePlayers: 29
  },
  {
    id: 11,
    name: "Guess the City",
    description: "Identify UK cities from clues and photos",
    icon: "🏙️",
    players: "2-8 players",
    duration: "10-20 min",
    category: "Geography",
    onlinePlayers: 17
  },
  {
    id: 12,
    name: "Student Life Bingo",
    description: "Share university experiences and mark off common moments",
    icon: "📚",
    players: "3-10 players",
    duration: "15-25 min",
    category: "Icebreaker",
    onlinePlayers: 26
  }
];

export function GamesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const userGender = localStorage.getItem("userGender") || "";
  const [userCoins] = useState(
    userGender === "male"
      ? parseInt(localStorage.getItem("userCoins") || "50")
      : parseInt(localStorage.getItem("earnedCoins") || "0")
  );

  const categories = ["All", "Party", "Trivia", "Icebreaker", "Fun", "Creative", "Music", "Geography"];

  const filteredGames = selectedCategory === "All"
    ? GAMES
    : GAMES.filter(game => game.category === selectedCategory);

  const handleJoinGame = (game: Game) => {
    if (userGender === "male" && userCoins < 10) {
      navigate("/coins");
      return;
    }
    // Navigate to game room
    navigate(`/game-room?game=${game.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 text-white">
          <button
            onClick={() => navigate(userGender === "male" ? "/swipe" : "/dashboard")}
            className="text-white"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-7 h-7" />
            Games Room
          </h1>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-yellow-300">💰</span>
            <span className="font-bold">{userCoins}</span>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">230+</div>
              <div className="text-xs opacity-90">Students Playing</div>
            </div>
            <div>
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs opacity-90">Fun Games</div>
            </div>
            <div>
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">UK Only</div>
              <div className="text-xs opacity-90">Students Only</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-white text-purple-600 font-bold shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{game.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                        {game.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {game.onlinePlayers} playing
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{game.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {game.players}
                </span>
                <span className="flex items-center gap-1">
                  ⏱️ {game.duration}
                </span>
              </div>

              <button
                onClick={() => handleJoinGame(game)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                {userGender === "male" ? "Join Game (10 coins/min)" : "Join & Earn (5 coins/min)"}
              </button>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <h4 className="font-bold">How It Works</h4>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>• Select a game you want to play</li>
              <li>• Join a group call with UK students</li>
              <li>• Have fun playing together!</li>
              <li>• {userGender === "female" ? "Earn coins while gaming!" : "Make new friends while gaming"}</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-300" />
              <h4 className="font-bold">Features</h4>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>✓ UK students only</li>
              <li>✓ Mixed groups (boys & girls)</li>
              <li>✓ Voice & video enabled</li>
              <li>✓ Safe & moderated games</li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        {userGender === "male" && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Need More Coins?</h3>
            <p className="text-gray-600 mb-4">Get more coins to play unlimited games</p>
            <button
              onClick={() => navigate("/coins")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Buy Coins Now
            </button>
          </div>
        )}

        {userGender === "female" && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Earn More Coins!</h3>
            <p className="text-gray-600 mb-4">Play games and redeem your coins for rewards</p>
            <button
              onClick={() => navigate("/rewards")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              View Rewards
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
