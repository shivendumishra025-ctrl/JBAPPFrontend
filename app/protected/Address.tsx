import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";

export default function AddressScreen() {
  const router = useRouter();

  // ✅ Read route params
  const { cartItems, from } = useLocalSearchParams<{
    cartItems?: string;
    from?: string;
  }>();

  // ✅ Check source
  const isFromCart = from === "cart";

  // ✅ Parse cart items safely
  const parsedCartItems = useMemo<any[]>(() => {
    if (!cartItems) return [];
    try {
      const parsed = JSON.parse(cartItems);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [cartItems]);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // 🔹 Fetch addresses on focus
  const fetchAddresses = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        router.replace("/screens/signin");
        return;
      }

      const parsedUser = JSON.parse(userData);
      const userId = parsedUser.id;

      const response = await fetch(
        `https://jbappbackend.onrender.com/api/users/address/${userId}`
      );

      const data = await response.json();
      console.log("Address",data);
      
      setAddresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Address fetch error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  // 🔹 Select address (only from Cart)
  const handleSelect = async (address: any) => {
    setSelectedAddressId(address._id);
    setSelectedAddress(address);
    await AsyncStorage.setItem(
      "selectedAddress",
      JSON.stringify(address)
    );
  };

  // 🔹 Delete address
  const handleDelete = async (addressId: string) => {
    try {
      console.log("handleDelete");
      
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;
      console.log(userData);
      
      const parsedUser = JSON.parse(userData);
      console.log(parsedUser.id);
      
      const userId = parsedUser.id;

      await fetch(
        `https://jbappbackend.onrender.com/api/users/address/${userId}/${addressId}`,
        { method: "DELETE" }
      );

      fetchAddresses();

      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        setSelectedAddress(null);
      }
    } catch {
      Alert.alert("Delete Failed", "Could not delete address.");
    }
  };

  // 🔹 Edit address
  const handleEdit = (item: any) => {
    router.push({
      pathname: "/protected/AddAddressScreen",
      params: { address: JSON.stringify(item) },
    });
  };

  // 🔹 Go to Review Order (ONLY FROM CART)
  const handleReviewOrder = () => {
    if (!selectedAddress) {
      Alert.alert("Select Address", "Please select an address first.");
      return;
    }

    router.push({
      pathname: "/screens/ReviewOrder",
      params: {
        cartItems: JSON.stringify(parsedCartItems),
        addressData: JSON.stringify(selectedAddress),
      },
    });
  };

  // 🔹 Render each address card
  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.card,
        selectedAddressId === item._id && styles.selectedCard,
      ]}
    >
      {/* ✅ Show radio ONLY if from cart */}
      {isFromCart && (
        <TouchableOpacity
          style={styles.radioOuter}
          onPress={() => handleSelect(item)}
        >
          {selectedAddressId === item._id && (
            <View style={styles.radioInner} />
          )}
        </TouchableOpacity>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.addressTitle}>{item.name}</Text>
        <Text style={styles.addressTitle}>{item.phone}</Text>

        <Text style={styles.addressDetails}>
          {item.houseNo}, {item.street}, {item.city},{" "}
          {item.state} - {item.zip}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#E53935" }]}
            onPress={() => handleDelete(item._id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add Address */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/protected/AddAddressScreen")}
      >
        <Text style={styles.addButtonText}>+ Add Address</Text>
      </TouchableOpacity>

      <Text style={{ marginBottom: 10 }}>
        Address Count: {addresses.length}
      </Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* ✅ Review Order ONLY from Cart */}
      {isFromCart && (
        <Button
          mode="contained"
          onPress={handleReviewOrder}
          style={{ marginBottom: 20 }}
        >
          Review Order
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  addButton: {
    backgroundColor: "brown",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  selectedCard: {
    borderColor: "green",
    borderWidth: 2,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#2196F3",
  },
  cardContent: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});