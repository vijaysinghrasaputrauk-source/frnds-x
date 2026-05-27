// Logo Variant 1: Heart with Connect
export function LogoV1({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl" },
    medium: { container: "w-24 h-24", text: "text-3xl" },
    large: { container: "w-32 h-32", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} relative rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl`}>
        <div className="text-white text-4xl">❤️</div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-white text-xs font-bold">●</span>
        </div>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Frnds
          </span>
          <span className="text-purple-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Variant 2: Circle Badge Style
export function LogoV2({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl" },
    medium: { container: "w-24 h-24", text: "text-3xl" },
    large: { container: "w-32 h-32", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} relative rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center shadow-2xl`}>
        <div className="text-center">
          <div className="text-white font-black text-2xl">F</div>
          <div className="text-white font-black text-xs -mt-1">.x</div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="text-gray-800">Frnds</span>
          <span className="text-purple-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Variant 3: Modern Minimalist
export function LogoV3({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl" },
    medium: { container: "w-24 h-24", text: "text-3xl" },
    large: { container: "w-32 h-32", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} relative`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="v3grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          <circle cx="35" cy="50" r="30" fill="url(#v3grad)" opacity="0.8" />
          <circle cx="65" cy="50" r="30" fill="url(#v3grad)" opacity="0.8" />

          <text x="50" y="62" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
            F
          </text>
        </svg>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="text-gray-800">Frnds</span>
          <span className="text-pink-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Variant 4: People Connection
export function LogoV4({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl" },
    medium: { container: "w-24 h-24", text: "text-3xl" },
    large: { container: "w-32 h-32", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl p-4`}>
        <div className="text-6xl">👥</div>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="text-gray-800">Frnds</span>
          <span className="text-purple-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Variant 5: Chat Bubble
export function LogoV5({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl" },
    medium: { container: "w-24 h-24", text: "text-3xl" },
    large: { container: "w-32 h-32", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} relative`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="v5grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          <path
            d="M20 30 C20 20 25 15 35 15 L65 15 C75 15 80 20 80 30 L80 55 C80 65 75 70 65 70 L45 70 L30 85 L30 70 C25 70 20 65 20 55 Z"
            fill="url(#v5grad)"
          />

          <text x="50" y="52" fontSize="28" textAnchor="middle" fontFamily="Arial, sans-serif">
            ❤️
          </text>
        </svg>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="text-gray-800">Frnds</span>
          <span className="text-pink-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Variant 6: Boy and Girl Together
export function LogoV6({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { container: "w-16 h-16", text: "text-xl", emoji: "text-2xl" },
    medium: { container: "w-24 h-24", text: "text-3xl", emoji: "text-4xl" },
    large: { container: "w-32 h-32", text: "text-5xl", emoji: "text-6xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size].container} bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl p-4 relative`}>
        <div className={`flex items-center gap-1 ${sizes[size].emoji}`}>
          <span>👨</span>
          <span className="text-white text-2xl">❤️</span>
          <span>👩</span>
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-white text-xs font-bold">●</span>
        </div>
      </div>
      <div className="text-center">
        <h1 className={`${sizes[size].text} font-black`}>
          <span className="text-gray-800">Frnds</span>
          <span className="text-purple-600">.x</span>
        </h1>
      </div>
    </div>
  );
}

// Logo Preview Component
export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Frnds.x Logo</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Option 1: Heart Connect</h3>
            <LogoV1 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Option 2: Circle Badge</h3>
            <LogoV2 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Option 3: Minimalist</h3>
            <LogoV3 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Option 4: People</h3>
            <LogoV4 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Option 5: Chat Heart</h3>
            <LogoV5 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-purple-500">
            <h3 className="text-center font-bold mb-4 text-purple-700">⭐ NEW: Boy & Girl</h3>
            <LogoV6 size="large" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-center font-bold mb-4 text-gray-700">Current Logo</h3>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="currentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 85C50 85 15 65 15 40C15 30 20 20 30 20C37 20 43 25 50 32C57 25 63 20 70 20C80 20 85 30 85 40C85 65 50 85 50 85Z"
                    fill="url(#currentGrad)"
                  />
                  <circle cx="35" cy="45" r="4" fill="white" opacity="0.9" />
                  <circle cx="65" cy="45" r="4" fill="white" opacity="0.9" />
                  <line x1="35" y1="45" x2="65" y2="45" stroke="white" strokeWidth="2" opacity="0.8" />
                </svg>
              </div>
              <h1 className="text-5xl font-black">
                <span className="text-gray-800">Frnds</span>
                <span className="text-purple-600">.x</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Choose one of these logo designs for your app!</p>
          <p className="text-sm text-gray-500">Each logo works with the purple/pink/red gradient theme</p>
        </div>
      </div>
    </div>
  );
}
