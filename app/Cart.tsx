import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

import products from "../data/Product";
import { useCart } from "../Context/CartContext";
import { useNavigation, useRouter } from "expo-router";


export default function CartPage() {
  const { cart, increase, decrease } = useCart();
  const navigation = useNavigation();
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return product ? { ...product, qty } : null;
  }).filter(Boolean);
  const router = useRouter();

 const total = (cartItems || []).reduce(
  (sum: number, item: any) => sum + (Number(item?.qty) || 0) * (Number(item?.price) || 0),
  0
);


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item!.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item!.images} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item!.name}</Text>
              <Text style={styles.price}>₹{item!.price}</Text>
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => decrease(item!.id)}>
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item!.qty}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={() => increase(item!.id)}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.totalPrice}>
  ₹{Number(item?.qty || 0) * Number(item?.price || 0)}
</Text>

          </View>
        )}
      />

      {/* Footer total */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{total}</Text>
 <TouchableOpacity
  style={styles.checkoutButton}
  onPress={() =>
    router.push({
      pathname: "/protected/Address",
      params: { from: "cart", cartItems: JSON.stringify(cartItems) },
    })
  }
>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10, marginTop: 50, marginBottom: 20 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  price: { fontSize: 14, color: "#8A0000", marginBottom: 6 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  qtyButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  qtyText: { marginHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontWeight: "bold", fontSize: 16, marginLeft: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  totalText: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
