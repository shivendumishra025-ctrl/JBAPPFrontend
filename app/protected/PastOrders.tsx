// PastOrders.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";

import products from "../../data/Product";
import { useCart } from "../../Context/CartContext";

type DecodedToken = {
  userId?: string;
  _id?: string;
  id?: string;
};

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type Order = {
  _id: string;
  createdAt: string;
  orderStatus: string;
  grandTotal: number;
  paymentMethod: string;
  items: OrderItem[];
};

export default function PastOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { setCartFromRepeatOrder } = useCart();

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const fetchPastOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);
      console.log(decoded);
      
      const customerId =
        decoded.userId || decoded._id || decoded.id;
console.log("customer id" , customerId);

      const res = await fetch(
        `https://jbappbackend.onrender.com/api/orders/customer/${customerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      // console.log(data);
      
  
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Repeat Order
  const handleRepeatOrder = (order: Order) => {
    const mappedItems = order.items
      .map((dish) => {
        const product = products.find(
          (p) =>
            p.name.toLowerCase().trim() ===
            dish.name.toLowerCase().trim()
        );
        return product
          ? { id: product.id, qty: dish.qty }
          : null;
      })
      .filter(Boolean) as { id: number; qty: number }[];

    setCartFromRepeatOrder(mappedItems);

    // 👉 Pass order details to cart page
    router.push({
      pathname: "/Cart",
      params: {
        orderInfo: JSON.stringify({
          orderStatus: order.orderStatus,
          paymentMethod: order.paymentMethod,
          grandTotal: order.grandTotal,
        }),
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.row}>
              <Text style={styles.orderId}>
                Order #{item._id.slice(-6)}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    backgroundColor:
                      item.orderStatus === "Delivered"
                        ? "#16a34a"
                        : "#f59e0b",
                  },
                ]}
              >
                {item.orderStatus}
              </Text>
            </View>

            <Text style={styles.date}>
              {new Date(item.createdAt).toDateString()}
            </Text>

            {item.items.map((dish, i) => (
              <Text key={i} style={styles.dish}>
                {dish.name} × {dish.qty}
              </Text>
            ))}

            <View style={styles.footer}>
              <Text style={styles.total}>₹{item.grandTotal}</Text>

              <TouchableOpacity
                style={styles.repeatBtn}
                onPress={() => handleRepeatOrder(item)}
              >
                <Text style={styles.repeatText}>Repeat Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: { fontSize: 15, fontWeight: "700" },
  status: {
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },
  date: { fontSize: 13, color: "#6b7280", marginVertical: 6 },
  dish: { fontSize: 14, color: "#374151" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  total: { fontSize: 18, fontWeight: "700" },
  repeatBtn: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  repeatText: { color: "#fff", fontWeight: "600" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
