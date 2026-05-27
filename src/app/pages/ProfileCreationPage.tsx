import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, X } from "lucide-react";

const INTERESTS = [
  "Gaming", "Music", "Sports", "Reading", "Travel", "Cooking",
  "Art", "Photography", "Movies", "Fitness", "Technology", "Fashion",
  "Dancing", "Writing", "Yoga", "Coding", "Languages", "Volunteering"
];

const UK_CITIES = [
  "London", "Manchester", "Birmingham", "Edinburgh", "Glasgow",
  "Liverpool", "Bristol", "Leeds", "Oxford", "Cambridge",
  "Newcastle", "Nottingham", "Sheffield", "Cardiff", "Brighton"
];

export function ProfileCreationPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [city, setCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = () => {
    if (name && university && city && selectedInterests.length > 0) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userUniversity", university);
      localStorage.setItem("userCity", city);
      localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
      localStorage.setItem("userBio", bio);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8">
        <button
          onClick={() => navigate("/verify-otp")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl text-center mb-2">Create Your Profile</h2>
          <p className="text-center text-gray-500 mb-8">
            Tell us about yourself
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                style={{ fontSize: '16px', color: '#000000', fontWeight: '500' }}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">University</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g., University of Oxford"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                style={{ fontSize: '16px', color: '#000000', fontWeight: '500' }}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                style={{ fontSize: '16px', color: '#000000', fontWeight: '500' }}
              >
                <option value="">Select your city</option>
                {UK_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Interests & Hobbies (Select up to 5)
              </label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      disabled={!isSelected && selectedInterests.length >= 5}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                      }`}
                    >
                      {interest}
                      {isSelected && <X className="inline w-3 h-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {selectedInterests.length}/5 selected
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Bio (Optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-gray-900 bg-white"
                style={{ fontSize: '16px', color: '#000000', fontWeight: '500' }}
              />
            </div>

            <button
              onClick={handleComplete}
              disabled={!name || !university || !city || selectedInterests.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
