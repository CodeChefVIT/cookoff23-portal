import { create } from "zustand";

const useTimerStore = create((set) => ({
  Time: 2*60*45,
//   countdeduct: () => set((state) => ({ initalTime: state.initalTime - 1 })),
//   countParse: () => set((state) => ({ initalTime: parseInt(state.initalTime) })),
}));

export default useTimerStore;
