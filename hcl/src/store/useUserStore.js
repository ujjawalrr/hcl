import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: true,
    setUser: (data) => set({
        user: data
    })
}))

export default useUserStore;