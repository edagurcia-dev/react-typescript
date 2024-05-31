import { useEffect, useState, useMemo } from "react";
import type { GuitarT, CartItemT } from "../types";
import { db } from "../data/db";

export const useCart = () => {
  const checkSessionStorage = (): CartItemT[] => {
    const localState = sessionStorage.getItem("cart");

    return localState ? JSON.parse(localState) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(checkSessionStorage());

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: GuitarT) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    //* existe en el carrito de compras
    if (itemExist >= 0) {
      //* no permite adicionar mas productos que el maximo permitido
      if (cart[itemExist].quantity < MAX_ITEMS) {
        const updatedCart = [...cart];
        updatedCart[itemExist].quantity++;
        setCart(updatedCart);
      }
    } else {
      //* no existe en el carrito de compras
      // solo para typescript newItem
      const newItem: CartItemT = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: GuitarT["id"]) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantity = (id: GuitarT["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decreaseQuantity = (id: GuitarT["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  //* logica para header de carrito de compras
  // state derivado

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total: number, item) => total + item.quantity * item.price,
      0
    );
  }, [cart]);

  return {
    data,
    cart,
    cartTotal,
    isEmpty,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
