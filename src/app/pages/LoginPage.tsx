import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, Smartphone, User } from "lucide-react";
import { FrndsLogo } from "../components/FrndsLogo";

export function LoginPage() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [showGenderSelection, setShowGenderSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = () => {
    if (email && password) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoading(false);

        // Check if user has gender set (existing user)
        const existingGender = localStorage.getItem("userGender");
        if (existingGender) {
          navigate("/dashboard");
        } else {
          // New user - show gender selection
          setShowGenderSelection(true);
        }
      }, 1000);
    }
  };

  const handleGenderSubmit = () => {
    if (gender) {
      localStorage.setItem("userGender", gender);
      localStorage.setItem("userName", email.split("@")[0]);

      // Initialize coins for male users
      if (gender === "male") {
        localStorage.setItem("userCoins", "50");
      } else {
        localStorage.setItem("earnedCoins", "0");
      }

      navigate("/dashboard");
    }
  };

  const handleMobileLogin = () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem("tempPhone", phoneNumber);
        setIsLoading(false);
        navigate("/verify-otp");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!showGenderSelection ? (
            <>
              <div className="flex justify-center mb-6">
                <FrndsLogo size="large" showText={true} variant="dark" />
              </div>
              <h2 className="text-3xl text-center mb-2">Login</h2>
              <p className="text-center text-gray-500 mb-8">
                Welcome back to Frnds.x
              </p>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                loginMethod === "email"
                  ? "bg-white shadow text-purple-600"
                  : "text-gray-600"
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setLoginMethod("mobile")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                loginMethod === "mobile"
                  ? "bg-white shadow text-purple-600"
                  : "text-gray-600"
              }`}
            >
              <Smartphone className="w-4 h-4 inline mr-2" />
              Mobile
            </button>
          </div>

          {loginMethod === "email" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@university.ac.uk"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-base font-medium bg-white"
                    style={{ fontSize: '16px', color: '#000000' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-base font-medium bg-white"
                    style={{ fontSize: '16px', color: '#000000' }}
                  />
                </div>
              </div>

              <button
                onClick={handleEmailLogin}
                disabled={!email || !password || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isLoading ? "Logging in..." : "Login with Email"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 flex items-center gap-2 font-medium">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-base font-bold">+44</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setPhoneNumber(value);
                      }
                    }}
                    placeholder="7123456789"
                    maxLength={10}
                    className="w-full pl-20 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-lg font-medium bg-white"
                    style={{ fontSize: '18px', color: '#000000' }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll send you an OTP
                </p>
              </div>

              <button
                onClick={handleMobileLogin}
                disabled={phoneNumber.length !== 10 || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isLoading ? "Sending OTP..." : "Login with OTP"}
              </button>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl text-center mb-2">Select Your Gender</h2>
              <p className="text-center text-gray-500 mb-8">
                To complete your profile
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-3 text-gray-700">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setGender("male")}
                      className={`p-6 border-2 rounded-xl transition-all ${
                        gender === "male"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="text-5xl mb-2">👨</div>
                      <p className="text-center font-bold text-xl text-gray-800">Male</p>
                      <p className="text-xs text-gray-500 mt-1">Subscription</p>
                    </button>

                    <button
                      onClick={() => setGender("female")}
                      className={`p-6 border-2 rounded-xl transition-all ${
                        gender === "female"
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      <div className="text-5xl mb-2">👩</div>
                      <p className="text-center font-bold text-xl text-gray-800">Female</p>
                      <p className="text-xs text-gray-500 mt-1">Free + Earn</p>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGenderSubmit}
                  disabled={!gender}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Continue to Dashboard
                </button>

                <button
                  onClick={() => setShowGenderSelection(false)}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
