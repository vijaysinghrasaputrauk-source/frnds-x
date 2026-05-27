import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, Ticket, Heart } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  image: string;
  category: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    title: "London Student Meetup",
    date: "May 25, 2026",
    time: "6:00 PM",
    location: "Hyde Park",
    city: "London",
    description: "Join fellow university students for a casual evening meetup. Games, music, and great conversations!",
    attendees: 48,
    maxAttendees: 100,
    price: 10,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    category: "Social"
  },
  {
    id: 2,
    title: "Manchester Coffee Social",
    date: "May 28, 2026",
    time: "3:00 PM",
    location: "Northern Quarter",
    city: "Manchester",
    description: "Coffee lovers unite! Meet new friends from Manchester universities over coffee and treats.",
    attendees: 32,
    maxAttendees: 60,
    price: 10,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
    category: "Coffee"
  },
  {
    id: 3,
    title: "Edinburgh Festival Night",
    date: "June 5, 2026",
    time: "7:00 PM",
    location: "Edinburgh Castle Area",
    city: "Edinburgh",
    description: "Experience Edinburgh's vibrant culture with students. Live music, food stalls, and entertainment!",
    attendees: 65,
    maxAttendees: 150,
    price: 10,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
    category: "Festival"
  },
  {
    id: 4,
    title: "Oxford Punting Adventure",
    date: "June 8, 2026",
    time: "2:00 PM",
    location: "River Cherwell",
    city: "Oxford",
    description: "Traditional punting on the river followed by a picnic. Perfect way to meet Oxford students!",
    attendees: 28,
    maxAttendees: 50,
    price: 10,
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&h=400&fit=crop",
    category: "Activity"
  },
  {
    id: 5,
    title: "Birmingham Food Festival",
    date: "June 12, 2026",
    time: "5:00 PM",
    location: "Bullring Area",
    city: "Birmingham",
    description: "Taste diverse cuisines and meet students from all Birmingham universities. Food, fun, and friendships!",
    attendees: 55,
    maxAttendees: 120,
    price: 10,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
    category: "Food"
  },
  {
    id: 6,
    title: "Cambridge Cycling Tour",
    date: "June 15, 2026",
    time: "10:00 AM",
    location: "King's College Start",
    city: "Cambridge",
    description: "Cycle through Cambridge's historic streets and parks. Meet students and explore the city together!",
    attendees: 22,
    maxAttendees: 40,
    price: 10,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop",
    category: "Activity"
  },
  {
    id: 7,
    title: "Bristol Music Night",
    date: "June 20, 2026",
    time: "8:00 PM",
    location: "Harbourside",
    city: "Bristol",
    description: "Live music performances by student bands. Dance, sing, and connect with Bristol's student community!",
    attendees: 78,
    maxAttendees: 200,
    price: 10,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    category: "Music"
  },
  {
    id: 8,
    title: "Leeds Sports Day",
    date: "June 22, 2026",
    time: "1:00 PM",
    location: "Roundhay Park",
    city: "Leeds",
    description: "Friendly sports competitions and outdoor games. No experience needed, just come and have fun!",
    attendees: 41,
    maxAttendees: 80,
    price: 10,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
    category: "Sports"
  }
];

export function EventsPage() {
  const navigate = useNavigate();
  const userGender = localStorage.getItem("userGender") || "";
  const [registeredEvents, setRegisteredEvents] = useState<number[]>(
    JSON.parse(localStorage.getItem("registeredEvents") || "[]")
  );
  const [showPayment, setShowPayment] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!selectedEvent) return;

    // Process payment (demo)
    const newRegistered = [...registeredEvents, selectedEvent.id];
    setRegisteredEvents(newRegistered);
    localStorage.setItem("registeredEvents", JSON.stringify(newRegistered));

    // Show success
    setShowPayment(false);
    alert(`Successfully registered for ${selectedEvent.title}!\n\nYou'll receive a confirmation email with event details.`);
    setSelectedEvent(null);
  };

  const isRegistered = (eventId: number) => registeredEvents.includes(eventId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-red-500">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 text-white">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-7 h-7" />
            Events
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Info Banner */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">UK Student Events</h2>
          <p className="opacity-90">Meet students from across the UK at exclusive events</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-sm">
              <div className="text-xl font-bold">{UPCOMING_EVENTS.length}</div>
              <div className="opacity-80">Events</div>
            </div>
            <div className="text-sm">
              <div className="text-xl font-bold">£10</div>
              <div className="opacity-80">Per Event</div>
            </div>
            <div className="text-sm">
              <div className="text-xl font-bold">500+</div>
              <div className="opacity-80">Students</div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {event.category}
                </div>
                {isRegistered(event.id) && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Registered
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}, {event.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">£{event.price}</div>
                  {isRegistered(event.id) ? (
                    <button
                      disabled
                      className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 opacity-75 cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Registered
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Ticket className="w-5 h-5" />
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Registration</h2>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-purple-900 mb-2">{selectedEvent.title}</h3>
                <div className="text-sm text-purple-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date} at {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}, {selectedEvent.city}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Registration Fee</span>
                  <span className="font-bold">£{selectedEvent.price}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-2xl text-purple-600">£{selectedEvent.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-blue-800">
                  ℹ️ Demo mode: Click "Pay £10" to register. No actual payment required.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPayment(false);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Pay £{selectedEvent.price}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
