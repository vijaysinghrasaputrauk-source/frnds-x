import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Send, MoreVertical, Flag, X, Smile } from "lucide-react";

const RANDOM_NAMES = ["Sarah", "Emily", "James", "Oliver", "Sophie", "Daniel", "Emma", "Thomas"];
const RANDOM_UNIVERSITIES = [
  "University of Oxford", "University of Cambridge", "Imperial College London",
  "UCL", "University of Edinburgh", "King's College London",
  "University of Manchester", "University of Bristol"
];

const AUTO_RESPONSES = [
  "That's interesting! 😊",
  "I agree!",
  "Haha! 😄",
  "Nice!",
  "Really?",
  "Cool! 🌟"
];

interface Message {
  id: number;
  sender: "user" | "partner";
  text: string;
  timestamp: Date;
}

export function ChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"matching" | "connected" | "ended">("matching");
  const [duration, setDuration] = useState(0);
  const [partner, setPartner] = useState({ name: "", university: "" });
  const [userGender, setUserGender] = useState("");
  const [coinsSpent, setCoinsSpent] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    setUserGender(gender);

    const matchingTimer = setTimeout(() => {
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const randomUni = RANDOM_UNIVERSITIES[Math.floor(Math.random() * RANDOM_UNIVERSITIES.length)];
      setPartner({ name: randomName, university: randomUni });
      setStatus("connected");

      // Send initial message from partner
      setTimeout(() => {
        setMessages([{
          id: 1,
          sender: "partner",
          text: `Hey! I'm ${randomName}. Nice to meet you! 👋`,
          timestamp: new Date()
        }]);
      }, 500);
    }, 2000);

    return () => clearTimeout(matchingTimer);
  }, []);

  useEffect(() => {
    if (status === "connected") {
      const timer = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;

          if (userGender === "male") {
            const coinsPerMin = 5;
            const totalCoins = Math.ceil((newDuration / 60) * coinsPerMin);
            setCoinsSpent(totalCoins);
          }

          return newDuration;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, userGender]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate partner typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: messages.length + 2,
        sender: "partner",
        text: AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, response]);
    }, 1500 + Math.random() * 1000);
  };

  const handleEndChat = () => {
    if (userGender === "male") {
      const currentCoins = parseInt(localStorage.getItem("userCoins") || "50");
      localStorage.setItem("userCoins", Math.max(0, currentCoins - coinsSpent).toString());
    } else {
      const coinsPerMin = 3;
      const earnedCoins = Math.floor((duration / 60) * coinsPerMin);
      const currentCoins = parseInt(localStorage.getItem("earnedCoins") || "0");
      localStorage.setItem("earnedCoins", (currentCoins + earnedCoins).toString());

      const earningsHistory = JSON.parse(localStorage.getItem("earningsHistory") || "[]");
      earningsHistory.unshift({
        type: "chat",
        duration: duration,
        coins: earnedCoins,
        date: new Date().toISOString()
      });
      localStorage.setItem("earningsHistory", JSON.stringify(earningsHistory));
    }

    setStatus("ended");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col">
      {status === "matching" && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-3xl text-white mb-4">Finding a chat partner...</h2>
            <p className="text-white/80">
              Connecting you with a student from a different university
            </p>
          </div>
        </div>
      )}

      {status === "connected" && (
        <>
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="text-center flex-1">
                  <h3 className="text-white text-lg font-medium">{partner.name}</h3>
                  <p className="text-white/70 text-xs">{partner.university}</p>
                </div>

                <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 text-white/90 text-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="opacity-80">Time: </span>
                    <span className="font-mono font-medium">{formatTime(duration)}</span>
                  </div>
                  <div>
                    <span className="opacity-80">
                      {userGender === "male" ? "Spent: " : "Earned: "}
                    </span>
                    <span className="font-mono font-medium">
                      {userGender === "male" ? `-${coinsSpent}` : `+${Math.floor((duration / 60) * 3)}`} coins
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEndChat}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  End Chat
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="container mx-auto max-w-3xl space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-purple-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-purple-200" : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="container mx-auto max-w-3xl p-4">
              <div className="flex items-center gap-3">
                <button className="text-white hover:bg-white/20 p-3 rounded-full transition-all">
                  <Smile className="w-6 h-6" />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white p-3 rounded-full transition-all disabled:cursor-not-allowed"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center gap-6 mt-3">
                <button className="text-white/70 hover:text-white text-xs flex items-center gap-1 transition-all">
                  <Flag className="w-3 h-3" />
                  Report
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {status === "ended" && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-12 text-center max-w-md">
            <h2 className="text-3xl mb-4">Chat Ended</h2>
            <p className="text-gray-600 mb-6">Duration: {formatTime(duration)}</p>

            {userGender === "male" ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">Coins spent: {coinsSpent}</p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  Coins earned: +{Math.floor((duration / 60) * 3)}
                </p>
              </div>
            )}

            <p className="text-gray-500">Returning to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
