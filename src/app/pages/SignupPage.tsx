import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Smartphone } from "lucide-react";
import { FrndsLogo } from "../components/FrndsLogo";

export function SignupPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length === 10 && gender) {
      setIsLoading(true);

      // Simulate OTP sending
      setTimeout(() => {
        localStorage.setItem("tempPhone", phoneNumber);
        localStorage.setItem("userGender", gender);
        setIsLoading(false);
        navigate("/verify-otp");
      }, 1500);
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
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <FrndsLogo size="large" showText={true} variant="dark" />
            </div>
            <h2 className="text-3xl mb-2">Sign Up</h2>
            <p className="text-gray-500">Enter your mobile number to get started</p>
          </div>

          <div className="space-y-6">
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
                UK mobile number (10 digits)
              </p>
            </div>

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
                  <div className="text-4xl mb-2">👨</div>
                  <p className="text-center font-bold text-lg text-gray-800">Male</p>
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
                  <div className="text-4xl mb-2">👩</div>
                  <p className="text-center font-bold text-lg text-gray-800">Female</p>
                  <p className="text-xs text-gray-500 mt-1">Free + Earn</p>
                </button>
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10 || !gender || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              📲 You'll receive a 6-digit OTP on your mobile number
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
