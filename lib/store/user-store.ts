import { create } from "zustand";

// type User = {

//     u
// }


export const useUserStore = create((set) => ({
  user: null,
  updateUser: (userInfo: any) => set(() => ({ user: userInfo })),
  resetUser: () => set(() => ({ user: null })),
}));
