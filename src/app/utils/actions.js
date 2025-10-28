"use server";
const API_BASE_URL = "https://cabzee-backend.vercel.app/api/cabzee";

export const createRide = async (rideData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/rides/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rideData),
    });
    if (!res.ok) throw new Error("Failed to create ride");
    console.log("Ride created successfully:", await res.json());
    return await res.json();
  } catch (err) {
    console.error("Error creating ride:", err);
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return await res.json();
  } catch (err) {
    console.error("Error creating user:", err);
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error("Failed to login user");
    return await res.json();
  } catch (err) {
    console.error("Error logging in:", err);
    return null;
  }
};

export const getRides = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/rides/rides`);
    if (!res.ok) throw new Error("Failed to fetch rides");
    return await res.json();
  } catch (err) {
    console.error("Error fetching rides:", err);
    return null;
  }
};
