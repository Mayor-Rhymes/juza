import { create } from "zustand";
import { ProductType } from "../mock/fakeData";

export interface ProductTrack extends ProductType {
  count: number;
}

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product: ProductType) =>
    set((state: any) => {
      const productExists = state.cart.find(
        (p: ProductTrack) => p.id === product.id
      );
      if (productExists) {
        const newCart = state.cart;
        newCart[state.cart.indexOf(productExists)].count++;
        return { cart: newCart };
      } else {
        return { cart: [...state.cart, { ...product, count: 1 }] };
      }
    }),
  removeFromCart: (product: ProductType) =>
    set((state: any) => {
      const productExists = state.cart.find(
        (p: ProductTrack) => p.id === product.id
      );
      if (productExists.count > 1) {
        const newCart = state.cart;
        newCart[state.cart.indexOf(productExists)].count--;
        return { cart: newCart };
      } else if (productExists.count === 1) {
        const newCart = state.cart.filter(
          (p: ProductTrack) => p.id !== product.id
        );

        return { cart: newCart };
      }
    }),

  deleteFromCart: (product: ProductType) =>
    set((state: any) => {
      const newCart = state.cart.filter(
        (p: ProductTrack) => p.id !== product.id
      );

      return { cart: newCart };
    }),

  resetCart: () => set(() => ({ cart: [] })),
}));
