import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Gift, Coins, ShoppingBag, Coffee, Smartphone, Ticket, CheckCircle } from "lucide-react";

const REWARDS = [
  {
    id: 1,
    name: "Amazon Gift Card",
    icon: "🛒",
    coinsRequired: 100,
    value: "£5",
    type: "giftcard",
    description: "Amazon voucher valid across all products"
  },
  {
    id: 2,
    name: "Starbucks Voucher",
    icon: "☕",
    coinsRequired: 150,
    value: "£7.50",
    type: "voucher",
    description: "Enjoy your favorite coffee on us"
  },
  {
    id: 3,
    name: "ASOS Gift Card",
    icon: "👗",
    coinsRequired: 200,
    value: "£10",
    type: "giftcard",
    description: "Fashion and beauty shopping voucher"
  },
  {
    id: 4,
    name: "Uber Eats Credit",
    icon: "🍔",
    coinsRequired: 180,
    value: "£9",
    type: "voucher",
    description: "Order your favorite meal"
  },
  {
    id: 5,
    name: "Spotify Premium",
    icon: "🎵",
    coinsRequired: 250,
    value: "3 Months",
    type: "subscription",
    description: "Ad-free music streaming"
  },
  {
    id: 6,
    name: "Netflix Voucher",
    icon: "🎬",
    coinsRequired: 300,
    value: "£15",
    type: "voucher",
    description: "Stream unlimited movies and shows"
  },
];

export function RewardsPage() {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const [totalCoins, setTotalCoins] = useState(0);
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const coins = parseInt(localStorage.getItem("earnedCoins") || "0");
    const redeemedItems = JSON.parse(localStorage.getItem("redeemedRewards") || "[]");

    setUserGender(gender);
    setTotalCoins(coins);
    setRedeemed(redeemedItems);

    if (gender !== "female") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleRedeem = (reward: any) => {
    if (totalCoins >= reward.coinsRequired) {
      // Deduct coins
      const newTotal = totalCoins - reward.coinsRequired;
      localStorage.setItem("earnedCoins", newTotal.toString());
      setTotalCoins(newTotal);

      // Add to redeemed list
      const newRedeemed = [...redeemed, reward.id];
      setRedeemed(newRedeemed);
      localStorage.setItem("redeemedRewards", JSON.stringify(newRedeemed));

      // Add to redemption history
      const history = JSON.parse(localStorage.getItem("redemptionHistory") || "[]");
      history.unshift({
        date: new Date().toISOString(),
        reward: reward.name,
        coins: reward.coinsRequired,
        value: reward.value,
        code: `FRNDS${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
      localStorage.setItem("redemptionHistory", JSON.stringify(history));

      setSelectedReward(reward);
      setShowSuccess(true);
    }
  };

  const canRedeem = (coinsRequired: number) => {
    return totalCoins >= coinsRequired;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Rewards Store</h1>
              <p className="text-gray-500">Redeem your coins for amazing rewards</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Your Balance</p>
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-500" />
                <p className="text-3xl text-purple-600">{totalCoins}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REWARDS.map((reward) => {
              const isAffordable = canRedeem(reward.coinsRequired);
              const isRedeemed = redeemed.includes(reward.id);

              return (
                <div
                  key={reward.id}
                  className={`border-2 rounded-2xl p-6 transition-all ${
                    isAffordable && !isRedeemed
                      ? "border-purple-300 bg-purple-50 hover:shadow-lg"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="text-5xl mb-4 text-center">{reward.icon}</div>

                  <h3 className="text-lg mb-2 text-center">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center min-h-[40px]">
                    {reward.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <p className="text-xl">{reward.coinsRequired}</p>
                  </div>

                  <div className="text-center mb-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Worth {reward.value}
                    </span>
                  </div>

                  {isRedeemed ? (
                    <div className="bg-gray-200 text-gray-600 py-3 rounded-xl text-center flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Redeemed
                    </div>
                  ) : isAffordable ? (
                    <button
                      onClick={() => handleRedeem(reward)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
                    >
                      Redeem Now
                    </button>
                  ) : (
                    <div className="bg-gray-200 text-gray-600 py-3 rounded-xl text-center">
                      Need {reward.coinsRequired - totalCoins} more coins
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white">
          <h3 className="text-lg mb-3 flex items-center gap-2">
            <Gift className="w-6 h-6" />
            How to Earn More Coins
          </h3>
          <ul className="space-y-2 text-sm">
            <li>• Answer audio calls: <strong>5 coins/minute</strong></li>
            <li>• Answer video calls: <strong>8 coins/minute</strong></li>
            <li>• Complete your profile: <strong>Bonus 20 coins</strong></li>
            <li>• Daily login streak: <strong>Up to 50 coins/week</strong></li>
          </ul>
        </div>
      </div>

      {showSuccess && selectedReward && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => {
            setShowSuccess(false);
            setSelectedReward(null);
          }}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl mb-3">Congratulations!</h2>
            <p className="text-gray-600 mb-4">
              You've successfully redeemed:
            </p>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
              <div className="text-4xl mb-2">{selectedReward.icon}</div>
              <p className="text-xl mb-1">{selectedReward.name}</p>
              <p className="text-sm text-gray-600 mb-3">{selectedReward.description}</p>
              <div className="bg-white border border-dashed border-purple-300 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Redemption Code</p>
                <p className="text-lg font-mono">
                  FRNDS{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Check your email for redemption instructions
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                setSelectedReward(null);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
