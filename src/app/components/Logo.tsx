// Frnds.x Logo - Boy & Girl Design
export function Logo({
  size = "large",
  showText = false,
  variant = "light"
}: {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  variant?: "light" | "dark";
}) {
  const sizes = {
    small: {
      container: "w-16 h-16",
      text: "text-xl",
      emojiSize: "text-2xl",
      padding: "p-2"
    },
    medium: {
      container: "w-24 h-24",
      text: "text-2xl",
      emojiSize: "text-4xl",
      padding: "p-3"
    },
    large: {
      container: "w-28 h-28",
      text: "text-3xl",
      emojiSize: "text-5xl",
      padding: "p-4"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${currentSize.container} ${currentSize.padding} rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center shadow-xl`}
      >
        <div className={`flex items-center justify-center gap-0 ${currentSize.emojiSize}`}>
          <span role="img" aria-label="boy">👨</span>
          <span role="img" aria-label="girl">👩</span>
        </div>
      </div>
      {showText && (
        <div className="text-center mt-1">
          <h1 className={`${currentSize.text} font-black leading-tight`}>
            <span className={variant === "light" ? "text-white" : "text-gray-900"}>Frnds</span>
            <span className={variant === "light" ? "text-white/90" : "text-purple-600"}>.x</span>
          </h1>
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: {
      container: "w-10 h-10",
      emoji: "text-lg",
      padding: "p-1.5"
    },
    medium: {
      container: "w-12 h-12",
      emoji: "text-xl",
      padding: "p-2"
    },
    large: {
      container: "w-16 h-16",
      emoji: "text-3xl",
      padding: "p-3"
    }
  };

  const currentSize = sizes[size];

  return (
    <div
      className={`${currentSize.container} ${currentSize.padding} rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center shadow-lg`}
    >
      <div className={`flex items-center justify-center gap-0 ${currentSize.emoji}`}>
        <span role="img" aria-label="boy">👨</span>
        <span role="img" aria-label="girl">👩</span>
      </div>
    </div>
  );
}
