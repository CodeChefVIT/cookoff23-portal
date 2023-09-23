import { create } from "zustand";

const useTokenStore = create((set) => ({
  access_token: "",
  refresh_token: "",
}));

export default useTokenStore;
