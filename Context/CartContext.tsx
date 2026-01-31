import React, { createContext, useContext, useState } from "react";

type RepeatItem = {
  id: number;
  qty: number;
};

type CartType = {
  cart: Record<number, number>;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;

  // ✅ NEW (for Repeat Order)
  setCartFromRepeatOrder: (items: RepeatItem[]) => void;
};

const CartContext = createContext<CartType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const increase = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  // 🔁 REPEAT ORDER SUPPORT
  const setCartFromRepeatOrder = (items: RepeatItem[]) => {
    const newCart: Record<number, number> = {};
    items.forEach((item) => {
      newCart[item.id] = item.qty;
    });
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        increase,
        decrease,
        clearCart,
        setCartFromRepeatOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
