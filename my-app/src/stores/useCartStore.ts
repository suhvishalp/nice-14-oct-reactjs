import { create } from "zustand";
import type { Product } from "../components/ProductDetail";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export type CartProduct = Pick<Product, "id" | "title" | "price" | "thumbnail">;

export interface LineItem {
  product: CartProduct;
  quantity: number;
}

interface CartStore {
  lineItems: LineItem[];

  addItem: (product: CartProduct) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer(
      (set) => ({
        lineItems: [],

        addItem: (product: CartProduct) => {
          set((state) => {
            const existing = state.lineItems.find(
              (item) => item.product.id == product.id,
            );

            if (existing) {
              return {
                lineItems: state.lineItems.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                ),
              };
            }
            return {
              lineItems: [...state.lineItems, { product, quantity: 1 }],
            };
          });
        },

        increaseQuantity: (id: number) => {
          set((state) => {
            const item = state.lineItems.find((item) => item.product.id == id);
            if (item) item.quantity += 1;
          });
        },

        // increaseQuantity: (id) =>
        //   set((state) => ({
        //     lineItems: state.lineItems.map((item) =>
        //       item.product.id === id
        //         ? { ...item, quantity: item.quantity + 1 }
        //         : item,
        //     ),
        //   })),

        decreaseQuantity: (id) =>
          set((state) => ({
            lineItems: state.lineItems
              .map((item) =>
                item.product.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              )
              .filter((item) => item.quantity > 0),
          })),

        removeItem: (id) =>
          set((state) => ({
            lineItems: state.lineItems.filter((item) => item.product.id !== id),
          })),

        clearCart: () => set({ lineItems: [] }),
      })
    ),
    {name: 'cart'}
  )
);
