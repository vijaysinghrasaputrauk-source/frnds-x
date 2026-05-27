import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Coins, Zap, Crown, Sparkles, CreditCard, Gift, Users, Share2, Copy, Check } from "lucide-react";

const MEGA_DEALS = [
  { coins: 3000, price: 120, discount: "20% OFF", originalPrice: 150, tag: "Best Value" },
  { coins: 6000, price: 200, discount: "33% OFF", originalPrice: 300, tag: "Mega Deal" },
];

const COIN_PACKAGES = [
  { coins: 50, price: 8, popular: false },
  { coins: 100, price: 10, popular: false },
  { coins: 120, price: 15, popular: false },
  { coins: 200, price: 25, popular: false },
  { coins: 400, price: 45, popular: false },
  { coins: 600, price: 60, popular: false },
  { coins: 950, price: 70, popular: false },
  { coins: 1400, price: 90, popular: true },
  { coins: 1800, price: 100, popular: false },
  { coins: 2500, price: 110, popular: false },
  { coins: 5000, price: 150, popular: false },
  { coins: 7500, price: 180, popular: false },
  { coins: 10000, price: 200, popular: false },
  { coins: 15000, price: 230, popular: false },
];

export function CoinsPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handlePurchase = (pkg: typeof COIN_PACKAGES[0]) => {
    const currentCoins = parseInt(localStorage.getItem("userCoins") || "0");
    localStorage.setItem("userCoins", (currentCoins + pkg.coins).toString());

    alert(`Purchase successful! You received ${pkg.coins} coins`);
    navigate("/dashboard");
  };

  const handleMegaDealPurchase = (deal: typeof MEGA_DEALS[0]) => {
    const currentCoins = parseInt(localStorage.getItem("userCoins") || "0");
    localStorage.setItem("userCoins", (currentCoins + deal.coins).toString());

    alert(`Purchase successful! You received ${deal.coins} coins`);
    navigate("/dashboard");
  };

  const referralLink = `${window.location.origin}/signup?ref=${localStorage.getItem("userName") || "user"}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to older method
      try {
        const textArea = document.createElement("textarea");
        textArea.value = referralLink;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          alert(`Copy this link:\n\n${referralLink}`);
        }
      } catch (fallbackErr) {
        alert(`Copy this link:\n\n${referralLink}`);
      }
    }
  };

  const handleShare = (platform: string) => {
    const text = "Join Frnds.x and get 80 free coins! Connect with students across UK universities. Sign up now!";
    const url = encodeURIComponent(referralLink);
    const encodedText = encodeURIComponent(text);

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "instagram":
        alert("Copy the link and share it in your Instagram bio or stories!");
        handleCopyLink();
        return;
      case "tiktok":
        alert("Copy the link and share it in your TikTok bio or videos!");
        handleCopyLink();
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <Coins className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl mb-2">Buy Coins</h1>
            <p className="text-gray-500">
              Purchase coins to connect with students across the UK
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Coin Pricing
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium mb-1">Audio Call</p>
                <p className="text-purple-600">20 coins/min</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium mb-1">Video Call</p>
                <p className="text-pink-600">50 coins/min</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="font-medium mb-1">Text Chat</p>
                <p className="text-blue-600">5 coins/min</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-500" />
                Mega Deals & Offers
              </h2>
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                Limited Time!
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {MEGA_DEALS.map((deal, index) => (
                <div
                  key={index}
                  className="relative border-4 border-orange-400 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-2xl transition-all"
                >
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold rotate-12">
                    {deal.discount}
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 rounded-full text-xs">
                    {deal.tag}
                  </div>

                  <div className="text-center mb-4 mt-2">
                    <p className="text-sm text-gray-500 line-through">£{deal.originalPrice}</p>
                    <p className="text-4xl text-orange-600 font-bold">£{deal.price}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coins className="w-10 h-10 text-yellow-500" />
                      <p className="text-5xl font-bold text-orange-600">{deal.coins}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Save £{deal.originalPrice - deal.price}!
                    </p>
                  </div>

                  <button
                    onClick={() => handleMegaDealPurchase(deal)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold hover:shadow-lg transition-all text-lg"
                  >
                    Grab Deal Now!
                  </button>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl mb-4">Regular Packages</h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {COIN_PACKAGES.map((pkg, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-2xl p-6 transition-all hover:shadow-lg ${
                  pkg.popular
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-4">
                  <p className="text-3xl mb-1">£{pkg.price}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="w-8 h-8 text-yellow-500" />
                    <p className="text-4xl">{pkg.coins}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    ~{Math.floor(pkg.coins / 20)} audio mins or ~{Math.floor(pkg.coins / 50)} video mins
                  </p>
                </div>

                <button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full py-3 rounded-xl transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  Purchase Now
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Payment Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Secure payment via Stripe</li>
                  <li>✓ All major credit/debit cards accepted</li>
                  <li>✓ Instant coin delivery after payment</li>
                  <li>✓ No automatic renewals or subscriptions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Gift className="w-10 h-10 text-green-600" />
                <h2 className="text-3xl text-green-800">Earn Free Coins!</h2>
              </div>
              <p className="text-gray-700 text-lg mb-2">
                Invite your friends and earn <span className="text-green-600 font-bold text-2xl">80 FREE COINS</span>
              </p>
              <p className="text-sm text-gray-600">
                when they successfully register using your referral link
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-3">Your Referral Link:</p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3 text-center">Share on Social Media:</p>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all flex flex-col items-center gap-2"
                  >
                    <Share2 className="w-6 h-6" />
                    <span className="text-xs">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare("instagram")}
                    className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all flex flex-col items-center gap-2"
                  >
                    <Share2 className="w-6 h-6" />
                    <span className="text-xs">Instagram</span>
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex flex-col items-center gap-2"
                  >
                    <Share2 className="w-6 h-6" />
                    <span className="text-xs">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("tiktok")}
                    className="p-4 bg-black hover:bg-gray-800 text-white rounded-xl transition-all flex flex-col items-center gap-2"
                  >
                    <Share2 className="w-6 h-6" />
                    <span className="text-xs">TikTok</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-green-700 mt-1" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-2">How it works:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Share your referral link with friends</li>
                    <li>They sign up using your link</li>
                    <li>Once they complete registration and verify their account</li>
                    <li>You both receive 80 free coins instantly!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white text-center">
          <p className="text-sm">
            💡 Demo Mode: Purchases are simulated. No real payment required.
          </p>
        </div>
      </div>
    </div>
  );
}
