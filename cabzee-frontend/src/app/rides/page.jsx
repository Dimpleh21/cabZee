"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GlareCard } from "../components/ui/glare-card"; // check path
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
import { getRides } from "../utils/actions";
export default function Rides() {
  const [rides, setRides] = useState([]);
  const [baseFilteredRides, setBaseFilteredRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeats, setSelectedSeats] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = (await getRides()) || [];

        const fromParam = searchParams.get("from")?.toLowerCase();
        const toParam = searchParams.get("to")?.toLowerCase();

        const filtered = data.filter((ride) => {
          const matchesFrom = fromParam
            ? ride.from.toLowerCase().includes(fromParam)
            : true;
          const matchesTo = toParam
            ? ride.to.toLowerCase().includes(toParam)
            : true;
          return matchesFrom && matchesTo;
        });

        setRides(data);
        setBaseFilteredRides(filtered);
        setFilteredRides(filtered);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = baseFilteredRides.filter(
        (ride) =>
          ride.from.toLowerCase().includes(query) ||
          ride.to.toLowerCase().includes(query)
      );
      setFilteredRides(results);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, baseFilteredRides]);

  const handleBookNow = async (ride) => {
    if (typeof window === "undefined") return;

    const userString = localStorage.getItem("user");
    if (!userString) {
      alert("Please login to book a ride.");
      return;
    }

    const user = JSON.parse(userString);
    const userId = user.id;
    if (!userId) {
      alert("User ID not found, please login again.");
      return;
    }

    const seatsToBook = selectedSeats[ride._id] || 1;
    if (seatsToBook > ride.seats) {
      alert(`Only ${ride.seats} seat(s) available.`);
      return;
    }

    const bookingData = {
      rideId: ride.rideId || ride._id,
      userId,
      seatsBooked: seatsToBook,
      contact_number: ride.contact_number,
      from: ride.from,
      to: ride.to,
      date: new Date(ride.date).toISOString(),
      time: ride.time,
      price: ride.price * seatsToBook,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Booking successful!");
        console.log("Booking details:", data);
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div className="font-[montserrat] min-h-screen bg-gray-950 py-6 px-6 text-white relative">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-18 mb-32 bg-gradient-to-br from-white to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl relative z-0"
        >
          Available Rides
        </motion.h1>
      </LampContainer>

      <motion.div className="relative z-10 -mt-96">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-28"
        >
          <input
            type="text"
            placeholder="Search by origin or destination..."
            className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {loading ? (
          <p className="text-center text-lg">Loading rides...</p>
        ) : filteredRides.length === 0 ? (
          <p className="text-center text-lg">No rides found.</p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {filteredRides.map((ride) => (
              <motion.div
                key={ride._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-2xl p-[1px] bg-gradient-to-br from-zinc-900 to-zinc-900"
              >
                <div className="bg-cyan-900/60 p-6 rounded-2xl border border-cyan-400/60">
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                      {ride.from} → {ride.to}
                    </h2>
                    <p className="text-md text-gray-100">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(ride.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-md text-gray-100">
                      <span className="font-medium">Time:</span> {ride.time}
                    </p>
                    <p className="text-md text-gray-100">
                      <span className="font-medium">Seats Available:</span>{" "}
                      {ride.seats}
                    </p>
                    <p className="text-md text-gray-100">
                      <span className="font-medium">Price per Seat:</span> ₹
                      {ride.price}
                    </p>
                    <p className="text-md text-gray-100">
                      <span className="font-medium">Contact Number:</span>{" "}
                      {ride.contact_number || "Not provided"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm text-gray-100">
                      Seats to book:
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={ride.seats}
                      value={selectedSeats[ride._id] || 1}
                      onChange={(e) =>
                        setSelectedSeats({
                          ...selectedSeats,
                          [ride._id]: Math.min(
                            Math.max(1, parseInt(e.target.value) || 1),
                            ride.seats
                          ),
                        })
                      }
                      className="mt-1 w-full px-2 py-1 rounded border border-gray-400 bg-black text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4 gap-5">
                    <button
                      onClick={() => handleBookNow(ride)}
                      className="w-full bg-cyan-700 text-white py-2 rounded-xl hover:bg-cyan-800 transition duration-200 cursor-pointer"
                      disabled={ride.seats === 0}
                    >
                      Call to confirm
                    </button>
                    <button
                      onClick={() => handleBookNow(ride)}
                      className={`w-full py-2 rounded-xl transition duration-200 cursor-pointer ${
                        ride.seats === 0
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-zinc-700 hover:bg-zinc-800 text-white"
                      }`}
                      disabled={ride.seats === 0}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
