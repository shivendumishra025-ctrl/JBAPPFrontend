import React, { useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReviewOrder() {
  // ✅ Get params from Address screen
  const { cartItems, addressData } = useLocalSearchParams();
const router = useRouter();
  // ✅ Safely parse both values
  // let parsedCart: any[] = [];
  let parsedAddress: any = {};
const parsedCart = useMemo<any[]>(() => {
  if (!cartItems) return [];

  if (Array.isArray(cartItems)) {
    return cartItems;
  }

  if (typeof cartItems === "string") {
    try {
      return JSON.parse(cartItems);
    } catch {
      return [];
    }
  }

  return [];
}, [cartItems]);

  try {
    // if (cartItems && typeof cartItems === "string") {
    //   console.log("its string");
      
    //   parsedCart = JSON.parse(cartItems);
    // } else if (Array.isArray(cartItems)) {
    //   console.log("its array");
    //   parsedCart = cartItems;
    // }
    // else {
    //   console.log("its something else");
    // }

    if (addressData && typeof addressData === "string") {
      parsedAddress = JSON.parse(addressData);
    } else if (typeof addressData === "object") {
      parsedAddress = addressData;
    }
  } catch (error) {
    console.error("❌ Error parsing ReviewOrder params:", error);
  }

  console.log("🛒 Cart Data:", parsedCart);
  console.log("🏠 Address Data:", parsedAddress);


  // 💰 Summary calculations
  const subtotal = parsedCart.reduce(

    (sum, item) => {
      console.log("item", item);
      return sum + (item.price || 0) * (item.qty || 1);
    },
    0
  );
  console.log(subtotal);
  
  const tax = subtotal * 0.05;
  
  const deliveryFee = 40;
  const total = subtotal + tax + deliveryFee;

 const renderItem = ({ item }: any) => {
  console.log("ITEM:", item);

  return (
    <View style={styles.itemRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          ₹{item.price} × {item.qty ?? item.quantity ?? 1}
        </Text>
      </View>
      <Text style={styles.itemTotal}>
        ₹{Number(item.price) * Number(item.qty ?? item.quantity ?? 1)}
      </Text>
    </View>
  );
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Review Your Order</Text>

      {/* Cart Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          data={parsedCart}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        {parsedAddress ? (
          <>
            <Text style={styles.addressText}>{parsedAddress.name}</Text>
            <Text style={styles.addressText}>{parsedAddress.phone}</Text>
            <Text style={styles.addressText}>
              {parsedAddress.houseNo}, {parsedAddress.street},{" "}
              {parsedAddress.city}, {parsedAddress.state} - {parsedAddress.zip}
            </Text>
          </>
        ) : (
          <Text>No address selected.</Text>
        )}
      </View>

      {/* Bill Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (5%)</Text>
          <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Proceed to Payment Button */}
      <TouchableOpacity
  style={styles.payButton}
  onPress={() =>
    router.push({
      pathname: "/screens/Checkout",
      params: {
        cartItems: JSON.stringify(parsedCart),
        addressData: JSON.stringify(parsedAddress),
        totalAmount: total.toFixed(2), // ✅ send total
      },
    })
  }
>
  <Text style={styles.payButtonText}>Proceed to Payment</Text>
</TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 15,
    color: "#444",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#555",
  },
  summaryValue: {
    fontSize: 15,
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#28a745",
  },
  payButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
