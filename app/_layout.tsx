import { Stack } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import { CartProvider } from "../Context/CartContext";
import { AuthProvider } from "../providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "./socket";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export default function RootLayout() {
 useEffect(() => {
  console.log("inside useEffect in Root Layout");

  const connectSocket = async () => {
    // ✅ FIX 1: correct token key
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.log("❌ No token found");
      return;
    }

    // ✅ Decode JWT safely
    const decoded: any = jwtDecode(token);
    const userId = decoded.userId;

    if (!userId) {
      console.log("❌ No userId in token");
      return;
    }

    console.log("✅ Token & userId found:", userId);

    // 🔌 CONNECT SOCKET
    socket.auth = { token };
    socket.connect();

    // ✅ FIX 2: correct event name
    socket.emit("joinCustomer", userId);

    // ✅ DEBUG EVENTS
    socket.on("connect", () => {
      console.log("🟢 Socket CONNECTED:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("🔴 Socket error:", err.message);
    });
  };

  connectSocket();

  return () => {
    socket.disconnect();
  };
}, []);

   console.log("🔥 Root layout render");
   console.log("Customer socket connected:", socket.connected);

  return (
    <CartProvider>
      <AuthProvider>
        <MenuProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </MenuProvider>
      </AuthProvider>
    </CartProvider>
  );
}
