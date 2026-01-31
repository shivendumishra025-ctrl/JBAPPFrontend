import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import socket from "../socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const router = useRouter();
  const { login } = useAuth(); // ✅ IMPORTANT

const handleLogin = async () => {
  try {
    console.log("login click");

    const res = await axios.post(
      "https://jbappbackend.onrender.com/api/users/login",
      { email, password }
    );
    console.log(res.data);
    
    const { token, user } = res.data;

    if (!token || !user) {
      setMsg("Login failed");
      return;
    }

    const userId = user.id;
    const role = user.role;

    // 🚫 CUSTOMER APP → block admin & delivery
    if (role === "admin" || role === "delivery") {
      setMsg("Access denied. This app is for customers only.");
      return;
    }

    // ✅ SAVE TOKEN VIA AUTH PROVIDER (ONLY ONCE)
    await login(token);
    console.log(userId);
    
    // ✅ SAVE USER OBJECT (needed for profile/edit)
    await AsyncStorage.setItem("user", JSON.stringify(user));

    // 🔌 CONNECT SOCKET
    // console.log("socket value 👉", socket);

    socket.auth = { token }; // optional for future JWT validation
    socket.connect();
    socket.emit("joinCustomer", userId);

    console.log("🔌 Socket connected & joined:", userId);

    setMsg("Login successful!");

    // Let layout decide next screen
    router.replace("/");
  } catch (err: any) {
    console.log("Login error:", err.response || err.message);
    setMsg(err.response?.data?.message || "Invalid credentials");
  }
};


  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>

      <Button onPress={() => router.push("/screens/Signup")}>
        Don’t have an account? Signup
      </Button>

      {msg ? <Text style={{ marginTop: 10 }}>{msg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 10 },
});
