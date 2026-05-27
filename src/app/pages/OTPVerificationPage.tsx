import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { FrndsLogo } from "../components/FrndsLogo";

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    const phone = localStorage.getItem("tempPhone");
    if (!phone) {
      navigate("/signup");
      return;
    }
    setPhoneNumber(phone);

    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all digits entered
    if (newOtp.every(digit => digit !== "") && index === 5) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyOTP = (otpCode: string) => {
    setIsVerifying(true);

    // Demo: Accept "123456" or any 6 digits
    setTimeout(() => {
      if (otpCode === "123456" || otpCode.length === 6) {
        localStorage.setItem("isPhoneVerified", "true");
        const phone = localStorage.getItem("tempPhone");

        // Check if this is a login (existing user) or signup (new user)
        const isExistingUser = localStorage.getItem("isLoggedIn") === "true";

        if (isExistingUser) {
          // Existing user logging in - go to dashboard
          localStorage.removeItem("tempPhone");
          navigate("/dashboard");
        } else {
          // New user signing up - verify ID first
          localStorage.removeItem("tempPhone");
          navigate("/verify");
        }
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;

    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");

    // Show success message
    setTimeout(() => {
      alert("OTP sent successfully!");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate("/signup")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FrndsLogo size="large" showText={false} variant="dark" />
            </div>
            <h2 className="text-3xl mb-2">Verify OTP</h2>
            <p className="text-gray-500">
              Enter the 6-digit code sent to
            </p>
            <p className="text-purple-600 font-medium mt-1">
              +44 {phoneNumber}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                  style={{ fontSize: '28px', color: '#000000', fontWeight: 'bold' }}
                  disabled={isVerifying}
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {isVerifying && (
              <div className="text-center">
                <div className="inline-block w-6 h-6 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 mt-2">Verifying...</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOTP}
                disabled={resendTimer > 0}
                className="text-purple-600 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-800 text-center">
              💡 Demo: Use code <strong>123456</strong> or any 6 digits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
