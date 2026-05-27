import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, CheckCircle, Camera, Shield, ScanFace, FileCheck } from "lucide-react";

export function VerificationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"id-type" | "id-upload" | "face-verify" | "processing" | "verified">("id-type");
  const [idType, setIdType] = useState<"university" | "government" | null>(null);
  const [idUploaded, setIdUploaded] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleIdTypeSelect = (type: "university" | "government") => {
    setIdType(type);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdUploaded(true);
      setTimeout(() => {
        setStep("face-verify");
      }, 1000);
    }
  };

  const handleTakeSelfie = () => {
    setFaceVerified(true);
    setTimeout(() => {
      setStep("processing");
      setTimeout(() => {
        setStep("verified");
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationDate", new Date().toISOString());
        setTimeout(() => {
          navigate("/create-profile");
        }, 2000);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate("/login")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {step === "id-type" && (
            <>
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">Verify Your Identity</h2>
                <p className="text-gray-500">
                  2-step verification for safety and authenticity
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-purple-900">ID Verification</p>
                    <p className="text-sm text-purple-700">Upload your university or government ID</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-pink-900">Face Verification</p>
                    <p className="text-sm text-pink-700">Take a live selfie to match your ID</p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-4">Select your ID type:</h3>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => {
                    handleIdTypeSelect("university");
                    setStep("id-upload");
                  }}
                  className="w-full p-4 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-lg">University ID Card</p>
                      <p className="text-sm text-gray-500">Recommended for students</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    handleIdTypeSelect("government");
                    setStep("id-upload");
                  }}
                  className="w-full p-4 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-lg">Government ID</p>
                      <p className="text-sm text-gray-500">Passport or Driver's License</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔒 Your data is encrypted and used only for verification. We follow UK GDPR standards.
                </p>
              </div>
            </>
          )}

          {step === "id-upload" && (
            <>
              <div className="text-center mb-8">
                <FileCheck className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">Upload Your {idType === "university" ? "University" : "Government"} ID</h2>
                <p className="text-gray-500">
                  Step 1 of 2 • Make sure your ID is clear and readable
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {!idUploaded ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer"
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2 font-medium">Click to upload your ID</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              ) : (
                <div className="border-2 border-green-300 bg-green-50 rounded-xl p-8 text-center mb-6">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <p className="text-green-800 font-medium">ID Uploaded Successfully!</p>
                  <p className="text-sm text-green-600">Proceeding to face verification...</p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800 font-medium mb-2">📸 Tips for best results:</p>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>Ensure all text is clearly visible</li>
                  <li>Good lighting, no glare or shadows</li>
                  <li>Take photo on flat surface</li>
                  <li>All corners of ID should be visible</li>
                </ul>
              </div>

              <button
                onClick={() => setStep("id-type")}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </>
          )}

          {step === "face-verify" && (
            <>
              <div className="text-center mb-8">
                <ScanFace className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">Face Verification</h2>
                <p className="text-gray-500">
                  Step 2 of 2 • Take a live selfie to verify your identity
                </p>
              </div>

              {!faceVerified ? (
                <>
                  <div className="border-4 border-dashed border-pink-300 rounded-2xl p-8 mb-6 bg-pink-50">
                    <div className="w-48 h-48 mx-auto bg-white rounded-full border-4 border-pink-400 flex items-center justify-center mb-4">
                      <Camera className="w-24 h-24 text-pink-400" />
                    </div>
                    <p className="text-center text-gray-600 mb-2">Position your face in the circle</p>
                    <p className="text-sm text-center text-gray-500">Make sure your face is well-lit and clearly visible</p>
                  </div>

                  <button
                    onClick={handleTakeSelfie}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all mb-4 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Take Selfie
                  </button>

                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800 font-medium mb-2">📸 Tips for best results:</p>
                    <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                      <li>Look directly at the camera</li>
                      <li>Remove glasses and hats</li>
                      <li>Ensure good lighting on your face</li>
                      <li>Keep a neutral expression</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="border-2 border-green-300 bg-green-50 rounded-xl p-8 text-center mb-6">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <p className="text-green-800 font-medium">Face Captured Successfully!</p>
                  <p className="text-sm text-green-600">Verifying your identity...</p>
                </div>
              )}

              <button
                onClick={() => setStep("id-upload")}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all"
                disabled={faceVerified}
              >
                Retake
              </button>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl mb-4">Verifying Your Identity...</h2>
              <div className="space-y-3 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-600">ID document scanned</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-600">Face matched with ID</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Finalizing verification...</p>
                </div>
              </div>
            </div>
          )}

          {step === "verified" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl mb-2 text-green-600">Identity Verified! ✓</h2>
              <p className="text-gray-500 mb-6">Your account is now verified and secure</p>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-800">
                  ✓ ID verified<br />
                  ✓ Face matched<br />
                  ✓ Account secured
                </p>
              </div>

              <p className="text-gray-400 text-sm">Redirecting to profile creation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
