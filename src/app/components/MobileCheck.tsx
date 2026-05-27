import { useEffect, useState } from "react";

export function MobileCheck() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    setIsLoaded(true);

    console.log("App loaded on mobile:", /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    console.log("Window size:", window.innerWidth, "x", window.innerHeight);
    console.log("Current URL:", window.location.href);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed top-0 left-0 w-full bg-purple-600 text-white text-center py-2 text-sm z-50">
        Loading...
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs z-50 shadow-lg">
        📱 Mobile
      </div>
    );
  }

  return null;
}
