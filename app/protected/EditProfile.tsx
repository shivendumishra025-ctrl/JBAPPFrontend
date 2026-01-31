import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const stored = await AsyncStorage.getItem("user");
    
    
    if (!stored) return;

    const user = JSON.parse(stored);
console.log("user", user);
    setFullName(user.fullName || "");
    setPhone(user.phone || "");

    if (user.addresses?.length > 0) {
      setAddress(user.addresses[0]);
    }
  };

  const handleUpdate = async () => {
    if (!fullName || !phone) {
      Alert.alert("Error", "Name and phone are required");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) return;

      const user = JSON.parse(stored);

      const payload: any = {
        fullName,
        phone,
        address,
      };

      if (password.trim()) {
        payload.password = password;
      }

      const res = await fetch(
        `https://jbappbackend.onrender.com/api/users/update-profile/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const updatedUser = await res.json();

      if (!res.ok) {
        Alert.alert("Error", updatedUser.message || "Update failed");
        return;
      }

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      Alert.alert("Success", "Profile updated");
      router.back();
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full Name" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="New Password (optional)" secureTextEntry />

      

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  subTitle: { fontSize: 18, marginVertical: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8A0000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
