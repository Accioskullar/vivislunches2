// Import necessary types for the cart store
import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Initial state for the cart store
const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the cart store using Zustand with persistence
export const useCartStore = create(
  persist<CartType & ActionTypes>(
    // State and action definitions
    (set, get) => ({
      // Initialize state with the initial values
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      // Action: Add item to the cart
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          // If the product is already in the cart, update its quantity and price
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : item
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          // If the product is not in the cart, add it
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      // Action: Remove item from the cart
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
    }),
    // Zustand persist options
    { name: "cart", skipHydration: true }
  )
);
