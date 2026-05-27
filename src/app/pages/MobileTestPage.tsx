export function MobileTestPage() {
  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-4xl mb-4">✓ It Works!</h1>
        <p className="text-xl mb-4">The app is loading successfully on your mobile device.</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4 text-left text-sm">
          <p><strong>URL:</strong> {window.location.href}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
          <p><strong>Screen:</strong> {window.innerWidth} x {window.innerHeight}</p>
          <p><strong>Device:</strong> {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"}</p>
        </div>

        <a
          href="/"
          className="block bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition-all"
        >
          Go to Main App
        </a>
      </div>
    </div>
  );
}
