import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Mic, MicOff, Video, VideoOff, X, Users, Trophy, Gamepad2, MessageCircle } from "lucide-react";

interface Player {
  id: number;
  name: string;
  age: number;
  university: string;
  emoji: string;
  gender: "male" | "female";
  isYou?: boolean;
}

const RANDOM_MALE_NAMES = ["James", "Oliver", "William", "Harry", "George", "Thomas", "Jack", "Charlie"];
const RANDOM_FEMALE_NAMES = ["Emma", "Sophie", "Olivia", "Emily", "Charlotte", "Amelia", "Mia", "Isabella"];
const RANDOM_UNIVERSITIES = [
  "Oxford", "Cambridge", "Imperial", "UCL", "Edinburgh", "Manchester", "Bristol", "King's College"
];
const MALE_EMOJIS = ["👨‍🎓", "👨‍💼", "👨‍🔬", "👨‍💻", "👨‍🎨", "👨‍🏫", "👨‍⚕️", "👨‍🌾"];
const FEMALE_EMOJIS = ["👩‍🎓", "👩‍💼", "👩‍🔬", "👩‍💻", "👩‍🎨", "👩‍🏫", "👩‍⚕️", "👩‍🌾"];

export function GameRoomPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("game") || "1";

  const [status, setStatus] = useState<"joining" | "waiting" | "ready" | "playing">("joining");
  const [players, setPlayers] = useState<Player[]>([]);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userGender, setUserGender] = useState("");
  const [userName, setUserName] = useState("");
  const [coinsSpent, setCoinsSpent] = useState(0);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "male";
    const name = localStorage.getItem("userName") || "You";
    setUserGender(gender);
    setUserName(name);

    // Simulate joining room
    setTimeout(() => {
      setStatus("waiting");
      generatePlayers(gender as "male" | "female", name);
    }, 2000);

    // Add players one by one
    setTimeout(() => setStatus("ready"), 5000);
    setTimeout(() => setStatus("playing"), 6000);
  }, []);

  useEffect(() => {
    if (status === "playing") {
      const timer = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;
          if (userGender === "male") {
            const totalCoins = Math.ceil((newDuration / 60) * 10);
            setCoinsSpent(totalCoins);
          }
          return newDuration;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, userGender]);

  const generatePlayers = (userGender: "male" | "female", userName: string) => {
    const playersList: Player[] = [];

    // Add the user first
    playersList.push({
      id: 0,
      name: userName,
      age: 20,
      university: "Your University",
      emoji: userGender === "male" ? "👨‍🎓" : "👩‍🎓",
      gender: userGender,
      isYou: true
    });

    // Add 3 more players (mix of genders)
    for (let i = 1; i <= 3; i++) {
      const isMale = Math.random() > 0.5;
      const names = isMale ? RANDOM_MALE_NAMES : RANDOM_FEMALE_NAMES;
      const emojis = isMale ? MALE_EMOJIS : FEMALE_EMOJIS;

      playersList.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        age: Math.floor(Math.random() * 5) + 19,
        university: RANDOM_UNIVERSITIES[Math.floor(Math.random() * RANDOM_UNIVERSITIES.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        gender: isMale ? "male" : "female"
      });
    }

    setPlayers(playersList);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLeaveRoom = () => {
    if (userGender === "male") {
      const currentCoins = parseInt(localStorage.getItem("userCoins") || "50");
      localStorage.setItem("userCoins", Math.max(0, currentCoins - coinsSpent).toString());
    } else {
      const coinsEarned = Math.floor((duration / 60) * 5);
      const currentCoins = parseInt(localStorage.getItem("earnedCoins") || "0");
      localStorage.setItem("earnedCoins", (currentCoins + coinsEarned).toString());
    }
    navigate("/games");
  };

  const getGameName = () => {
    const games = [
      "Truth or Dare", "UK Trivia Challenge", "Would You Rather",
      "Two Truths & A Lie", "University Quiz Battle", "Never Have I Ever",
      "British Accent Challenge", "Story Building", "Music Quiz UK",
      "Emoji Charades", "Guess the City", "Student Life Bingo"
    ];
    return games[parseInt(gameId) - 1] || games[0];
  };

  if (status === "joining") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center max-w-md">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl text-white mb-4">Joining Game Room...</h2>
          <p className="text-white/80">{getGameName()}</p>
        </div>
      </div>
    );
  }

  if (status === "waiting" || status === "ready") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 p-4">
        <div className="container mx-auto max-w-4xl py-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6 text-white">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">{getGameName()}</h2>
                  <p className="text-sm text-white/80">Group Game Room</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/games")}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between text-white mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">
                    {status === "waiting" ? "Adding players to room..." : "Room is ready!"}
                  </span>
                </div>
                <span className="text-sm">{players.length}/4 players</span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(players.length / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Player Grid */}
            <div className="grid grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white transform transition-all duration-500"
                  style={{
                    opacity: 1,
                    transform: 'scale(1)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-3">{player.emoji}</div>
                    <h3 className="font-bold text-lg mb-1">
                      {player.name}{player.isYou && " (You)"}
                      {player.gender === "female" && <span className="ml-1 text-pink-300">♀</span>}
                      {player.gender === "male" && <span className="ml-1 text-blue-300">♂</span>}
                    </h3>
                    <p className="text-sm text-white/70">{player.age} • {player.university}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">Online</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty slots */}
              {[...Array(4 - players.length)].map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-dashed border-white/30 flex items-center justify-center"
                >
                  <div className="text-center text-white/50">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Waiting...</p>
                  </div>
                </div>
              ))}
            </div>

            {status === "ready" && (
              <div className="mt-6 text-center">
                <div className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-white mb-4">
                  <p className="font-bold text-lg mb-1">🎮 All players ready!</p>
                  <p className="text-sm">Starting game in 3 seconds...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Playing state - Group video call + game
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 p-4">
      <div className="container mx-auto max-w-6xl py-4">
        {/* Top bar with game info */}
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <Gamepad2 className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="font-bold">{getGameName()}</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {formatTime(duration)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {players.length} players
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white">
            <span className="text-yellow-300">💰</span>
            <span className="font-mono">
              {userGender === "male" ? `-${coinsSpent}` : `+${Math.floor((duration / 60) * 5)}`}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Left: Video call grid */}
          <div className="md:col-span-1">
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Video className="w-5 h-5" />
                Group Call
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`relative aspect-square rounded-xl overflow-hidden ${
                      player.isYou ? 'ring-2 ring-blue-400' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-red-500/40 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl animate-subtle-bounce">{player.emoji}</div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      <p className="text-white text-xs font-medium">
                        {player.isYou ? "You" : player.name}
                      </p>
                    </div>
                    {!player.isYou && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Call controls */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-all ${
                    isMuted ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-white" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full transition-all ${
                    isVideoOff ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {isVideoOff ? (
                    <VideoOff className="w-4 h-4 text-white" />
                  ) : (
                    <Video className="w-4 h-4 text-white" />
                  )}
                </button>

                <button
                  onClick={handleLeaveRoom}
                  className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Game area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-8 min-h-[500px]">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{getGameName()}</h2>

                {/* Game interface simulation */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
                    <p className="text-2xl font-bold text-purple-600 mb-4">
                      Current Round: 1/5
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      {getGameName() === "Truth or Dare" && "Sophie's turn - Choose Truth or Dare!"}
                      {getGameName() === "UK Trivia Challenge" && "Question: Which UK city is known as the 'Steel City'?"}
                      {getGameName() === "Would You Rather" && "Would you rather: Study abroad or work remotely?"}
                      {getGameName().includes("Never Have") && "Never have I ever... traveled outside the UK"}
                      {!["Truth or Dare", "UK Trivia Challenge", "Would You Rather"].includes(getGameName()) && !getGameName().includes("Never Have") && "Game is starting..."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold transition-all">
                      Option A
                    </button>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold transition-all">
                      Option B
                    </button>
                  </div>
                </div>

                {/* Scoreboard */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Scoreboard
                  </h3>
                  <div className="space-y-2">
                    {players.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{player.emoji}</span>
                          <span className="font-medium text-gray-800">
                            {player.isYou ? "You" : player.name}
                          </span>
                        </div>
                        <span className="text-purple-600 font-bold">
                          {Math.floor(Math.random() * 50)} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat bar at bottom */}
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 mt-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-white" />
            <input
              type="text"
              placeholder="Type a message to the group..."
              className="flex-1 bg-white/10 text-white placeholder-white/50 px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-bold transition-all">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
