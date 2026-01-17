/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { UserContext } from "./UserContext";
import api from "../api.js";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { userToken } = useContext(UserContext);

  async function getProductsCart() {
    try {
      let { data } = await api.get(`/cart`);
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userToken) {
      getProductsCart();
    } else {
      setCart(null);
    }
  }, [userToken]);

  async function addToCart(productId) {
    try {
      let { data } = await api.post("/cart", { productId });
      getProductsCart();
      toast.success(data.message, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProductCountToCart(productId, count) {
    try {
      // FIXED: Changed from axios to api instance
      let { data } = await api.put(`/cart/${productId}`, { count });

      setCart(data);

      toast.success("Quantity updated", {
        duration: 1000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProductFromCart(productId) {
    try {
      let { data } = await api.delete(`/cart/${productId}`);
      setCart(data);
      toast.success("Success", {
        duration: 1000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function clearCart() {
    try {
      let { data } = await api.delete(`/cart`);
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        updateProductCountToCart,
        deleteProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}