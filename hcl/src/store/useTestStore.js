import { create } from "zustand";

const useTestStore = create((set) => ({
    loading: false,
    setLoading: (data) => set({
        loading: data
    })
}))

export default useTestStore;