import { db } from "../data/db";
import type { CartItemT, GuitarT } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: GuitarT } }
  | { type: "remove-from-cart"; payload: { id: GuitarT["id"] } }
  | { type: "decrease-quantity"; payload: { id: GuitarT["id"] } }
  | { type: "increase-quantity"; payload: { id: GuitarT["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: GuitarT[];
  cart: CartItemT[];
};

const sessionStorageCart = (): CartItemT[] => {
  const cart = sessionStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: sessionStorageCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    let updatedCart: CartItemT[] = [];

    //* existe en el carrito de compras
    if (itemExist) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      //* no existe en el carrito de compras
      // solo para typescript newItem
      const newItem: CartItemT = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const cart = state.cart.filter((guitar) => guitar.id !== action.payload.id);

    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decrease-quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  if (action.type === "increase-quantity") {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
