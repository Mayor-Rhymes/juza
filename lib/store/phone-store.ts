import { create } from "zustand";

export const usePhoneStore = create((set) => ({
  phone: "",
  updatePhone: (phoneInfo: string) => set(() => ({ phone: phoneInfo })),
}));
