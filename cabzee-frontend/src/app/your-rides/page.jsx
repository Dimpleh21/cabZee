"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function YourRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUserRides = async () => {
      const userId = searchParams.get("id");

      if (!userId) {
        alert("User ID not found in URL. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/book/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setRides(data);
        console.log("Fetched user rides:", data);
      } catch (err) {
        console.error("Error fetching user rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRides();
  }, [searchParams]);

  return (
    <div className="font-[montserrat] px-6 py-6 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Your Rides</h1>

      {loading ? (
        <p className="text-center">Loading your rides...</p>
      ) : rides.length === 0 ? (
        <p className="text-center">No rides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="bg-zinc-800 p-6 rounded-xl border border-cyan-600"
            >
              <h2 className="text-xl font-semibold mb-2">
                {ride.rideDetails?.from || "Unknown"} →{" "}
                {ride.rideDetails?.to || "Unknown"}
              </h2>
              <p>
                <strong>Date:</strong>{" "}
                {ride.rideDetails?.date
                  ? new Date(ride.rideDetails.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {ride.rideDetails?.time || "N/A"}
              </p>
              <p>
                <strong>Seats Booked:</strong> {ride.seatsBooked}
              </p>
              <p>
                <strong>Price:</strong> ₹{ride.price || "N/A"}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {ride.contact_number || "Not provided"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
