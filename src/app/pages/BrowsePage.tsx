import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Heart, MapPin, Sparkles, Phone, Video, Star, TrendingUp, X, ChevronLeft, ChevronRight, Filter, MessageCircle } from "lucide-react";

const GIRL_PROFILES = [
  {
    id: 1,
    emoji: "👩‍🎓",
    name: "Emma",
    age: 20,
    university: "Oxford",
    city: "London",
    interests: ["Music", "Reading"],
    bio: "Love indie music and coffee chats!",
    online: true,
    tags: ["love", "movies"],
    rating: 4.8,
    isNew: false,
    isTop: true,
    callsCompleted: 234
  },
  {
    id: 2,
    emoji: "👩‍💼",
    name: "Sophie",
    age: 21,
    university: "Imperial College London",
    city: "London",
    interests: ["Technology", "Gaming", "Photography"],
    bio: "Engineering student who loves gaming and exploring London.",
    online: true,
    tags: ["friendship", "travel", "chill"],
    rating: 4.6,
    isNew: true,
    isTop: false,
    callsCompleted: 45
  },
  {
    id: 3,
    emoji: "👩‍🔬",
    name: "Olivia",
    age: 19,
    university: "University of Cambridge",
    city: "Cambridge",
    interests: ["Sports", "Fitness", "Travel"],
    bio: "Biology major. Fitness enthusiast and travel lover.",
    online: false,
    tags: ["travel", "friendship", "longdrives"],
    rating: 4.9,
    isNew: false,
    isTop: true,
    callsCompleted: 312
  },
  {
    id: 4,
    emoji: "👩‍🎨",
    name: "Amelia",
    age: 22,
    university: "University of Edinburgh",
    city: "Edinburgh",
    interests: ["Art", "Fashion", "Dancing"],
    bio: "Fashion design student. Love art galleries and dance performances.",
    online: true,
    tags: ["love", "nightouts", "movies"],
    rating: 4.7,
    isNew: false,
    isTop: false,
    callsCompleted: 167
  },
  {
    id: 5,
    emoji: "👩‍💻",
    name: "Isla",
    age: 20,
    university: "University of Manchester",
    city: "Manchester",
    interests: ["Coding", "Music", "Movies"],
    bio: "Computer Science student. Binge-watcher and music festival enthusiast.",
    online: true,
    tags: ["movies", "foodie", "chill"],
    rating: 4.5,
    isNew: true,
    isTop: false,
    callsCompleted: 89
  },
  {
    id: 6,
    emoji: "👩‍🎤",
    name: "Charlotte",
    age: 21,
    university: "University of Bristol",
    city: "Bristol",
    interests: ["Music", "Writing", "Photography"],
    bio: "English Lit student. Singer-songwriter in my free time.",
    online: false,
    tags: ["love", "travel", "movies"],
    rating: 4.8,
    isNew: false,
    isTop: true,
    callsCompleted: 245
  },
  {
    id: 7,
    emoji: "👩‍🏫",
    name: "Ava",
    age: 19,
    university: "King's College London",
    city: "London",
    interests: ["Languages", "Travel", "Cooking"],
    bio: "Languages student. Love cooking international cuisines!",
    online: true,
    tags: ["foodie", "travel", "friendship"],
    rating: 4.6,
    isNew: true,
    isTop: false,
    callsCompleted: 123
  },
  {
    id: 8,
    emoji: "👩‍⚕️",
    name: "Mia",
    age: 22,
    university: "University of Glasgow",
    city: "Glasgow",
    interests: ["Yoga", "Reading", "Volunteering"],
    bio: "Medical student. Passionate about wellness and helping others.",
    online: true,
    tags: ["friendship", "chill", "love"],
    rating: 4.9,
    isNew: false,
    isTop: true,
    callsCompleted: 289
  },
  {
    id: 9,
    emoji: "👩‍🎓",
    name: "Lily",
    age: 20,
    university: "University of Birmingham",
    city: "Birmingham",
    interests: ["Dance", "Music", "Party"],
    bio: "Love dancing and nightlife. Let's vibe together!",
    online: true,
    tags: ["nightouts", "love", "chill"],
    rating: 4.4,
    isNew: true,
    isTop: false,
    callsCompleted: 67
  },
  {
    id: 10,
    emoji: "👩‍🎨",
    name: "Grace",
    age: 21,
    university: "University of Leeds",
    city: "Leeds",
    interests: ["Photography", "Travel", "Food"],
    bio: "Foodie and travel blogger. Always looking for new adventures!",
    online: true,
    tags: ["foodie", "travel", "longdrives"],
    rating: 4.7,
    isNew: false,
    isTop: false,
    callsCompleted: 178
  },
  {
    id: 11,
    emoji: "👩‍💼",
    name: "Ella",
    age: 22,
    university: "University of Nottingham",
    city: "Nottingham",
    interests: ["Business", "Networking", "Coffee"],
    bio: "Entrepreneur at heart. Coffee addict and startup enthusiast.",
    online: false,
    tags: ["friendship", "chill", "foodie"],
    rating: 4.5,
    isNew: false,
    isTop: false,
    callsCompleted: 134
  },
  {
    id: 12,
    emoji: "👩‍🔬",
    name: "Freya",
    age: 19,
    university: "University of Sheffield",
    city: "Sheffield",
    interests: ["Science", "Hiking", "Nature"],
    bio: "Nature lover and science geek. Weekend hiker!",
    online: true,
    tags: ["travel", "longdrives", "friendship"],
    rating: 4.8,
    isNew: true,
    isTop: true,
    callsCompleted: 201
  },
  {
    id: 13,
    emoji: "👩‍🎤",
    name: "Poppy",
    age: 20,
    university: "University of Liverpool",
    city: "Liverpool",
    interests: ["Music", "Concerts", "Festivals"],
    bio: "Music is life! Concert junkie and festival lover.",
    online: true,
    tags: ["nightouts", "movies", "love"],
    rating: 4.6,
    isNew: false,
    isTop: false,
    callsCompleted: 156
  },
  {
    id: 14,
    emoji: "👩‍💻",
    name: "Daisy",
    age: 21,
    university: "University of Newcastle",
    city: "Newcastle",
    interests: ["Gaming", "Anime", "Tech"],
    bio: "Gamer girl who loves anime. Looking for gaming buddies!",
    online: true,
    tags: ["friendship", "chill", "movies"],
    rating: 4.7,
    isNew: true,
    isTop: false,
    callsCompleted: 92
  },
  {
    id: 15,
    emoji: "👩‍🏫",
    name: "Ruby",
    age: 22,
    university: "University of Warwick",
    city: "Birmingham",
    interests: ["Teaching", "Books", "Crafts"],
    bio: "Future teacher with a love for books and crafts.",
    online: false,
    tags: ["friendship", "love", "chill"],
    rating: 4.5,
    isNew: false,
    isTop: false,
    callsCompleted: 145
  },
  {
    id: 16,
    emoji: "👩‍⚕️",
    name: "Jessica",
    age: 23,
    university: "University of Southampton",
    city: "London",
    interests: ["Medicine", "Fitness", "Nutrition"],
    bio: "Med student focused on fitness and healthy living.",
    online: true,
    tags: ["friendship", "longdrives", "foodie"],
    rating: 4.9,
    isNew: false,
    isTop: true,
    callsCompleted: 267
  },
];

export function BrowsePage() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "online">("all");

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const coins = parseInt(localStorage.getItem("userCoins") || "50");
    setUserGender(gender);
    setUserCoins(coins);

    if (gender === "female") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const filteredProfiles = selectedFilter === "online"
    ? GIRL_PROFILES.filter(p => p.online)
    : GIRL_PROFILES;

  const handleConnect = (callType: "audio" | "video") => {
    const coinsNeeded = callType === "video" ? 50 : 20;
    if (userCoins < coinsNeeded) {
      navigate("/coins");
      return;
    }
    navigate(`/call?type=${callType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-white text-center">
            <p className="text-sm opacity-80">Your Balance</p>
            <p className="text-xl">{userCoins} coins</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-white mb-2">Discover Friends</h1>
            <p className="text-white/80">Connect with verified female students</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === "all"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              All Students
            </button>
            <button
              onClick={() => setSelectedFilter("online")}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                selectedFilter === "online"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online Now
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-8 text-center relative">
                  {profile.online && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      Online
                    </div>
                  )}
                  <div className="text-7xl mb-3">{profile.emoji}</div>
                  <h3 className="text-2xl text-white">{profile.name}, {profile.age}</h3>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{profile.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.city}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {profile.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {profile.online ? (
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleConnect("audio")}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-xs">Audio</span>
                      </button>
                      <button
                        onClick={() => handleConnect("video")}
                        className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                      >
                        <Video className="w-4 h-4" />
                        <span className="text-xs">Video</span>
                      </button>
                      <button
                        onClick={() => {
                          if (userCoins < 5) {
                            navigate("/coins");
                            return;
                          }
                          navigate("/chat");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">Chat</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-3 bg-gray-100 rounded-xl text-gray-500 text-sm">
                      Offline
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white text-center">
            <p className="text-sm">
              💡 Demo Mode: Profiles are simulated for demonstration purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
