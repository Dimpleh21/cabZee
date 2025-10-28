"use client";
import { useState, useRef, useEffect } from "react";
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
  const [selectedDate, setSelectedDate] = useState("");
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [filteredFromPlaces, setFilteredFromPlaces] = useState(places);
  const [filteredToPlaces, setFilteredToPlaces] = useState(places);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Set today's date as default on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

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

  // Close suggestions on outside click
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

  // Handle submit
  const handleClick = () => {
    if (fromQuery.trim() === "" || toQuery.trim() === "") {
      alert("Please fill in both 'From' and 'To' fields.");
      return;
    }

    const dateParam = selectedDate || new Date().toISOString().split("T")[0];

    router.push(
      `/rides?from=${encodeURIComponent(fromQuery)}&to=${encodeURIComponent(
        toQuery
      )}&date=${encodeURIComponent(dateParam)}`
    );
  };

  // Current location for From
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

  // Current location for To
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
    <div className="max-w-md mx-auto text-black rounded-xl font-[Raleway]">
      <form
        className="space-y-3 w-[400px] ml-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* From input */}
        <div className="relative" ref={fromRef}>
          <div className="absolute left-5 top-8 h-8 w-[1px] bg-black z-0"></div>
          <div className="flex gap-2 items-center mb-2 relative z-10">
            <div className="rounded-full bg-zinc-500/10 w-12 h-10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-black rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="From"
              className="w-full px-4 py-2 rounded-lg bg-zinc-500/10 focus:outline-none focus:ring text-sm"
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
            <div className="rounded-full bg-zinc-500/10 w-12 h-10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-black rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="To"
              className="w-full px-4 py-2 rounded-lg bg-zinc-500/10 focus:outline-none focus:ring text-sm"
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
            className="w-full px-4 py-2 rounded-lg bg-zinc-500/10 focus:outline-none focus:ring text-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Passengers input */}
        <input
          type="text"
          placeholder="Passengers"
          className="w-full px-4 py-2 bg-zinc-500/10 rounded-lg focus:outline-none focus:ring text-sm"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-zinc-500/80 transition duration-300 text-sm font-semibold flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          Search Ride
        </button>
      </form>
    </div>
  );
}
