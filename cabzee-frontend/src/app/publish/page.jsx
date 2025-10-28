"use client";
import { useEffect, useState } from "react";
import Img from "@/../public/car3.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // 👈 Add this import
import { createRide } from "../utils/actions";
export default function Publish() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    price: 0,
    contact_number: "",
    createdBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setFormData((prev) => ({ ...prev, createdBy: user.id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "seats" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await createRide(formData);
      if (!data.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ Ride published successfully!");
      setFormData((prev) => ({
        from: "",
        to: "",
        date: "",
        time: "",
        seats: 1,
        price: 0,
        contact_number: "",
        createdBy: prev.createdBy,
      }));
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 👇 Animate image section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <Image src={Img} alt="ride" className="h-72 w-full" />
        <button
          className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded z-10 cursor-pointer"
          onClick={() => Router.push("/")}
        >
          Go Home
        </button>
      </motion.div>

      {/* 👇 Animate form section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col min-h-screen bg-white text-black px-8 mt-8"
      >
        <div className="text-black font-bold text-3xl pl-8">Publish Ride</div>
        <p className="text-gray-600 mt-2 pl-8 pr-8 pt-4">
          Why travel alone when you can share the ride, cut costs, and make new
          connections along the way? By publishing your ride, you not only make
          use of empty seats but also contribute to a more sustainable and
          social way of traveling.
        </p>

        <form
          onSubmit={handleSubmit}
          className="p-10 rounded-xl w-full max-w-full space-y-4 mt-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
            <div>
              <p className="text-sm">From</p>
              <input
                type="text"
                name="from"
                placeholder="Departure Location"
                value={formData.from}
                onChange={handleChange}
                required
                className="w-full h-14 px-4 py-2 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-sm">To</p>
              <input
                type="text"
                name="to"
                placeholder="Destination"
                value={formData.to}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
            <div>
              <p className="text-sm">Date</p>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-sm">Time</p>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>

            <div>
              <p className="text-sm">Seats Available</p>
              <input
                type="number"
                name="seats"
                min={1}
                placeholder="Seats Available"
                value={formData.seats}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-sm">Price per Seat</p>
              <input
                type="number"
                name="price"
                min={0}
                placeholder="Price per seat"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-sm">Contact Number</p>
              <input
                type="number"
                name="contact_number"
                min={0}
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 h-14 rounded bg-zinc-100 focus:outline-none"
              />
            </div>
          </div>

          <input type="hidden" name="createdBy" value={formData.createdBy} />

          <div className="flex justify-center mt-10">
            {/* 👇 Animate submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !formData.createdBy}
              className="bg-zinc-900 hover:bg-zinc-600 w-[300px] py-2 rounded font-semibold transition text-white cursor-pointer"
            >
              {loading ? "Publishing..." : "Publish Ride"}
            </motion.button>
          </div>

          {message && <p className="text-center mt-2">{message}</p>}
        </form>
      </motion.div>
    </div>
  );
}
