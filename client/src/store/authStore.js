import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  login: async (inputs) => {
    const res = await axios.post("http://localhost:4000/api/login", inputs, {
      withCredentials: true,
    });
    set({ currentUser: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  },
  logout: async () => {
    await axios.post("http://localhost:4000/api/logout", null, {
      withCredentials: true,
    });
    set({ currentUser: null });
    localStorage.removeItem("user");
  },
}));

// export default useAuthStore;
