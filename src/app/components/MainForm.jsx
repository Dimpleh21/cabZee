"use client";
import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
const places = [
  "Dayal Sweets",
  "Children's Park",
  "NIT Hamirpur",
  "Hangouts",
  "TDF",
  "Annu Chowk",
  "Bus Stand",
  "Gandhi Chowk",
];

export default function MainForm() {
  const router = useRouter();
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [filteredFromPlaces, setFilteredFromPlaces] = useState(places);
  const [filteredToPlaces, setFilteredToPlaces] = useState(places);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Filter places based on fromQuery
  useEffect(() => {
    if (fromQuery.trim() === "") {
      setFilteredFromPlaces(places);
    } else {
      setFilteredFromPlaces(
        places.filter((place) =>
          place.toLowerCase().includes(fromQuery.toLowerCase())
        )
      );
    }
  }, [fromQuery]);

  // Filter places based on toQuery
  useEffect(() => {
    if (toQuery.trim() === "") {
      setFilteredToPlaces(places);
    } else {
      setFilteredToPlaces(
        places.filter((place) =>
          place.toLowerCase().includes(toQuery.toLowerCase())
        )
      );
    }
  }, [toQuery]);

  // Close suggestions if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle current location for from input
  const handleCurrentLocationFrom = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setFromQuery("Current Location");
          setShowFromSuggestions(false);
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle current location for to input
  const handleCurrentLocationTo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setToQuery("Current Location");
          setShowToSuggestions(false);
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900/90 rounded-xl shadow-md font-[Raleway] ">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative" ref={fromRef}>
          <div className="absolute left-4 top-8 h-6 w-[3px] bg-white z-0"></div>

          {/* From input */}
          <div className="flex gap-2 items-center mb-2 relative z-10">
            <div className="rounded-full bg-zinc-500/30 w-12 h-10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="From"
              className="w-full px-4 py-2 rounded-full bg-zinc-500/30 focus:outline-none focus:ring text-sm"
              value={fromQuery}
              onChange={(e) => setFromQuery(e.target.value)}
              onFocus={() => setShowFromSuggestions(true)}
              autoComplete="off"
            />
          </div>

          {showFromSuggestions && (
            <ul className="absolute bg-white text-black rounded-md shadow-lg w-full max-h-48 overflow-y-auto top-full mt-1 text-sm z-20">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                onClick={handleCurrentLocationFrom}
              >
                📍 Use current location
              </li>
              {filteredFromPlaces.length > 0 ? (
                filteredFromPlaces.map((place) => (
                  <li
                    key={place}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setFromQuery(place);
                      setShowFromSuggestions(false);
                    }}
                  >
                    {place}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  No suggestions found.
                </li>
              )}
            </ul>
          )}
        </div>

        {/* To input */}
        <div className="relative" ref={toRef}>
          <div className="flex gap-2 items-center relative z-10">
            <div className="rounded-full bg-zinc-500/30 w-12 h-10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="To"
              className="w-full px-4 py-2 rounded-full bg-zinc-500/30 focus:outline-none focus:ring text-sm"
              value={toQuery}
              onChange={(e) => setToQuery(e.target.value)}
              onFocus={() => setShowToSuggestions(true)}
              autoComplete="off"
            />
          </div>

          {showToSuggestions && (
            <ul className="absolute bg-white text-black rounded-md shadow-lg w-full max-h-48 overflow-y-auto top-full mt-1 text-sm z-20">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                onClick={handleCurrentLocationTo}
              >
                📍 Use current location
              </li>
              {filteredToPlaces.length > 0 ? (
                filteredToPlaces.map((place) => (
                  <li
                    key={place}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setToQuery(place);
                      setShowToSuggestions(false);
                    }}
                  >
                    {place}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  No suggestions found.
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Date input */}
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="w-full px-4 py-2 rounded-full bg-zinc-500/30 focus:outline-none focus:ring text-sm"
            placeholder="Date"
          />
        </div>

        {/* Passengers input */}
        <input
          type="text"
          placeholder="Passengers"
          className="w-full px-4 py-2 bg-zinc-500/30 rounded-full focus:outline-none focus:ring text-sm"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-full hover:bg-zinc-50/60 transition duration-300 text-sm font-semibold flex items-center justify-center gap-2"
          onClick={() => router.push("/rides")}
        >
          Search Ride
        </button>
      </form>
    </div>
  );
}
