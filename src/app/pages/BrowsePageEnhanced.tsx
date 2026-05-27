import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Heart, MapPin, Sparkles, Phone, Video, Star, TrendingUp, X, ChevronLeft, ChevronRight, Filter as FilterIcon, ShieldCheck, MessageCircle } from "lucide-react";

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
    callsCompleted: 234,
    verified: true
  },
  {
    id: 2,
    emoji: "👩‍💼",
    name: "Sophie",
    age: 21,
    university: "Imperial",
    city: "London",
    interests: ["Tech", "Gaming"],
    bio: "Engineering student who loves gaming.",
    online: true,
    tags: ["friendship", "travel"],
    rating: 4.6,
    isNew: true,
    isTop: false,
    callsCompleted: 45,
    verified: true
  },
  {
    id: 3,
    emoji: "👩‍🔬",
    name: "Olivia",
    age: 19,
    university: "Cambridge",
    city: "Cambridge",
    interests: ["Sports", "Fitness"],
    bio: "Biology major and fitness enthusiast.",
    online: true,
    tags: ["travel", "friendship"],
    rating: 4.9,
    isNew: false,
    isTop: true,
    callsCompleted: 312,
    verified: true
  },
  {
    id: 4,
    emoji: "👩‍🎨",
    name: "Amelia",
    age: 22,
    university: "Edinburgh",
    city: "Edinburgh",
    interests: ["Art", "Fashion"],
    bio: "Fashion design student.",
    online: true,
    tags: ["love", "nightouts"],
    rating: 4.7,
    isNew: false,
    isTop: false,
    callsCompleted: 167,
    verified: false
  },
  {
    id: 5,
    emoji: "👩‍💻",
    name: "Isla",
    age: 20,
    university: "Manchester",
    city: "Manchester",
    interests: ["Coding", "Music"],
    bio: "Computer Science student.",
    online: true,
    tags: ["movies", "chill"],
    rating: 4.5,
    isNew: true,
    isTop: false,
    callsCompleted: 89,
    verified: true
  },
  {
    id: 6,
    emoji: "👩‍🎤",
    name: "Charlotte",
    age: 21,
    university: "Bristol",
    city: "Bristol",
    interests: ["Music", "Writing"],
    bio: "Singer-songwriter.",
    online: true,
    tags: ["love", "travel"],
    rating: 4.8,
    isNew: false,
    isTop: true,
    callsCompleted: 245,
    verified: true
  },
  {
    id: 7,
    emoji: "👩‍🏫",
    name: "Ava",
    age: 19,
    university: "King's College",
    city: "London",
    interests: ["Languages", "Travel"],
    bio: "Languages student.",
    online: true,
    tags: ["foodie", "travel"],
    rating: 4.6,
    isNew: true,
    isTop: false,
    callsCompleted: 123,
    verified: true
  },
  {
    id: 8,
    emoji: "👩‍⚕️",
    name: "Mia",
    age: 22,
    university: "Glasgow",
    city: "Glasgow",
    interests: ["Yoga", "Reading"],
    bio: "Medical student.",
    online: true,
    tags: ["friendship", "chill"],
    rating: 4.9,
    isNew: false,
    isTop: true,
    callsCompleted: 289,
    verified: true
  },
];

const FILTERS = {
  special: [
    { id: "all", name: "All", icon: "🌟" },
    { id: "new", name: "New", icon: "✨" },
    { id: "star", name: "Star", icon: "⭐" },
    { id: "top", name: "Top", icon: "🔥" },
  ],
  cities: [
    { id: "London", name: "London", icon: "🏙️" },
    { id: "Manchester", name: "Manchester", icon: "⚽" },
    { id: "Birmingham", name: "Birmingham", icon: "🏭" },
    { id: "Edinburgh", name: "Edinburgh", icon: "🏰" },
    { id: "Liverpool", name: "Liverpool", icon: "🎸" },
  ],
  tags: [
    { id: "love", name: "#love", icon: "❤️" },
    { id: "friendship", name: "#friendship", icon: "🤝" },
    { id: "breakup", name: "#breakup", icon: "💔" },
    { id: "travel", name: "#travel", icon: "✈️" },
    { id: "movies", name: "#movies", icon: "🎬" },
    { id: "foodie", name: "#foodie", icon: "🍕" },
    { id: "chill", name: "#chill", icon: "😎" },
    { id: "nightouts", name: "#nightouts", icon: "🌃" },
    { id: "longdrives", name: "#longdrives", icon: "🚗" },
  ],
};

export function BrowsePageEnhanced() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [userCoins, setUserCoins] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [filteredProfiles, setFilteredProfiles] = useState(GIRL_PROFILES);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const coins = parseInt(localStorage.getItem("userCoins") || "50");
    setUserGender(gender);
    setUserCoins(coins);

    if (gender === "female") {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    filterProfiles(selectedFilter);
  }, [selectedFilter]);

  const filterProfiles = (filter: string) => {
    let filtered = [...GIRL_PROFILES];

    if (filter === "all") {
      filtered = GIRL_PROFILES;
    } else if (filter === "new") {
      filtered = GIRL_PROFILES.filter(p => p.isNew && p.online);
    } else if (filter === "star") {
      filtered = GIRL_PROFILES.filter(p => p.rating >= 4.7 && p.online);
    } else if (filter === "top") {
      filtered = GIRL_PROFILES.filter(p => p.isTop && p.online);
    } else if (["London", "Manchester", "Birmingham", "Edinburgh", "Liverpool"].includes(filter)) {
      filtered = GIRL_PROFILES.filter(p => p.city === filter && p.online);
    } else {
      filtered = GIRL_PROFILES.filter(p => p.tags.includes(filter) && p.online);
    }

    setFilteredProfiles(filtered);
    setCurrentProfileIndex(0);
  };

  const handleConnect = (callType: "audio" | "video") => {
    const coinsNeeded = callType === "video" ? 50 : 20;
    if (userCoins < coinsNeeded) {
      navigate("/coins");
      return;
    }
    navigate(`/call?type=${callType}`);
  };

  const nextProfile = () => {
    if (currentProfileIndex < filteredProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const prevProfile = () => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
    }
  };

  const currentProfile = filteredProfiles[currentProfileIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/swipe")}
            className="text-white flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-white text-center">
            <p className="text-sm opacity-80">Your Balance</p>
            <p className="text-xl">{userCoins} coins</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-white flex items-center gap-2"
          >
            <FilterIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl text-white mb-2">Discover Friends</h1>
            <p className="text-white/80">
              {filteredProfiles.length} student{filteredProfiles.length !== 1 ? "s" : ""} online
            </p>
          </div>

          {showFilters && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6">
              <div className="mb-4">
                <p className="text-white text-sm mb-2">Quick Filters</p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.special.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                        selectedFilter === filter.id
                          ? "bg-white text-purple-600 shadow-lg"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white text-sm mb-2">Cities</p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.cities.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                        selectedFilter === filter.id
                          ? "bg-white text-purple-600 shadow-lg"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-white text-sm mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.tags.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 text-sm ${
                        selectedFilter === filter.id
                          ? "bg-white text-purple-600 shadow-lg"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredProfiles.length > 0 && currentProfile ? (
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-12 text-center relative">
                  {currentProfile.isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      ✨ New
                    </div>
                  )}
                  {currentProfile.isTop && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      🔥 Top
                    </div>
                  )}
                  <div className="text-8xl mb-4">{currentProfile.emoji}</div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-3xl text-white">
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                    {currentProfile.verified && (
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-white/90">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span className="text-sm">{currentProfile.rating}</span>
                    <span className="text-sm ml-2">• {currentProfile.callsCompleted} calls</span>
                    {currentProfile.verified && (
                      <span className="text-sm ml-2">• ✓ Verified</span>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span>{currentProfile.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{currentProfile.city}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 text-center text-lg">
                    {currentProfile.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {currentProfile.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {currentProfile.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleConnect("audio")}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">Audio</span>
                    </button>
                    <button
                      onClick={() => handleConnect("video")}
                      className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                    >
                      <Video className="w-5 h-5" />
                      <span className="text-sm">Video</span>
                    </button>
                    <button
                      onClick={() => {
                        if (userCoins < 5) {
                          navigate("/coins");
                          return;
                        }
                        navigate("/chat");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-all flex flex-col items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Chat</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevProfile}
                  disabled={currentProfileIndex === 0}
                  className="bg-white/20 backdrop-blur-lg text-white p-4 rounded-full disabled:opacity-30 hover:bg-white/30 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="text-white text-center">
                  <p className="text-sm">
                    {currentProfileIndex + 1} / {filteredProfiles.length}
                  </p>
                </div>

                <button
                  onClick={nextProfile}
                  disabled={currentProfileIndex === filteredProfiles.length - 1}
                  className="bg-white/20 backdrop-blur-lg text-white p-4 rounded-full disabled:opacity-30 hover:bg-white/30 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl mb-2">No profiles found</h3>
              <p className="text-gray-600 mb-6">
                Try selecting a different filter to see more students
              </p>
              <button
                onClick={() => setSelectedFilter("all")}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl"
              >
                Show All Profiles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
