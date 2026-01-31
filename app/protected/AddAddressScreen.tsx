import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";


export default function AddAddressScreen() {
  const params = useLocalSearchParams(); 

  // Editing mode: address is passed via params
  const editingAddress = params.address ? JSON.parse(params.address as string) : null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when editing
 useEffect(() => {
  if (editingAddress) {
    setName(editingAddress.name || "");
    setPhone(editingAddress.phone || "");
    setHouseNo(editingAddress.houseNo || "");
    setStreet(editingAddress.street || "");
    setCity(editingAddress.city || "");
    setState(editingAddress.state || "");
    setZip(editingAddress.zip || "");
  }
}, []); // 👈 empty dependency - runs only on mount


  const handleSave = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("user");
      if (!token) {
        Alert.alert("Error", "No user token found. Please log in again.");
        router.push("/screens/signin");
        return;
      }

      const parsedToken = JSON.parse(token);
      const userId = parsedToken.id;

      const newAddress = { name, phone, houseNo, street, city, state, zip };

      let res;
      if (editingAddress) {
        // Update address
        res = await axios.put(
          `https://jbappbackend.onrender.com/api/users/address/${userId}/${editingAddress._id}`, 
          newAddress
        );
      } else {
        // Add new address
        res = await axios.post(
          `https://jbappbackend.onrender.com/api/users/address/${userId}`, 
          newAddress
        );
      }

      console.log("Saved:", res.data);
      Alert.alert("Success", editingAddress ? "Address updated!" : "Address added!");
      router.back();

    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {editingAddress ? "Edit Address" : "Add Address"}
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Phone" 
        value={phone} 
        onChangeText={setPhone} 
        keyboardType="phone-pad"
      />
      <TextInput 
        style={styles.input} 
        placeholder="House No." 
        value={houseNo} 
        onChangeText={setHouseNo} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Street" 
        value={street} 
        onChangeText={setStreet} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="City" 
        value={city} 
        onChangeText={setCity} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="State" 
        value={state} 
        onChangeText={setState} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="zip" 
        value={zip} 
        onChangeText={setZip} 
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={[styles.saveButton, loading && { opacity: 0.6 }]} 
        onPress={handleSave} 
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? "Saving..." : editingAddress ? "Update Address" : "Save Address"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", marginTop: 30 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "brown" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 },
  saveButton: { backgroundColor: "brown", padding: 15, borderRadius: 8, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
