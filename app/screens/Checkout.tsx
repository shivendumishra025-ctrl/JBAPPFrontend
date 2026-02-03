import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useCart } from "../../Context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { clearCart } = useCart();

  const { totalAmount, cartItems, addressData } = useLocalSearchParams();

  /* ================= PARSE PARAMS ================= */

  const parsedCart = cartItems
    ? JSON.parse(typeof cartItems === "string" ? cartItems : cartItems[0])
    : [];

  const parsedAddress = addressData
    ? JSON.parse(typeof addressData === "string" ? addressData : addressData[0])
    : {};

  const amount = parseFloat(
    typeof totalAmount === "string"
      ? totalAmount
      : totalAmount?.[0] || "0"
  );

  /* ================= RAZORPAY PAYMENT ================= */
console.log("Amount:", amount);
// console.log("Order:", rpOrder);

  const startRazorpayPayment = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        Alert.alert("Login Required", "Please sign in to continue.");
        router.replace("/screens/signin");
        return;
      }

      const user = JSON.parse(userData);
      const customerId = user.id;
      console.log("user",user);
      
      // 1️⃣ Create Razorpay Order
      const rpOrderRes = await fetch(
        "https://jbappbackend.onrender.com/api/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
  amount: Math.round(amount * 100) // 143.50 → 14350
}),

        }
      );

      const rpOrder = await rpOrderRes.json();
      console.log("Order:", rpOrder); // 👈 THIS LINE

      if (!rpOrderRes.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SAN79giSys27NA", // 🔴 Use ENV in production
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        order_id: rpOrder.id,
        name: "JB App",
        description: "Order Payment",
        prefill: {
          name: user.name || "Customer",
          email: user.email || "customer@gmail.com",
          contact: user.phone || "9999999999",
        },
        theme: { color: "#28a745" },
      };

      // 3️⃣ Open Razorpay
      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          // 4️⃣ Verify Payment
          await fetch(
            " https://jbappbackend.onrender.com/api/payments/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayPaymentId: paymentData.razorpay_payment_id,
                razorpayOrderId: paymentData.razorpay_order_id,
                razorpaySignature: paymentData.razorpay_signature,
              }),
            }
          );

          // 5️⃣ Create Order After Payment Success
          const orderPayload = {
            customerId,
            items: parsedCart.map((item: any) => ({
              name: item.name,
              price: item.price,
              qty: item.qty || item.quantity || 1,
            })),
            paymentMethod: "UPI",
            paymentStatus: "Paid",
            deliveryAddress: parsedAddress,
            discount: 0,
          };

          const orderRes = await fetch(
            "https://jbappbackend.onrender.com/api/orders/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderPayload),
            }
          );

          const orderData = await orderRes.json();
          if (!orderRes.ok) {
            throw new Error(orderData?.error || "Order creation failed");
          }

          // 6️⃣ Clear cart & redirect
          clearCart();

          router.replace({
            pathname: "/protected/OrderSuccess",
            params: { orderId: orderData._id },
          });
        })
        .catch(() => {
          Alert.alert("Payment Cancelled", "You cancelled the payment");
        });
    } catch (error: any) {
      console.error("❌ Payment Error:", error);
      Alert.alert("Error", error.message || "Payment failed");
    }
  };

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.amount}>💰 Total: ₹{amount.toFixed(2)}</Text>

      <TouchableOpacity style={styles.payButton} onPress={startRazorpayPayment}>
        <Text style={styles.payText}>
          Pay ₹{amount.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    marginBottom: 30,
  },
  payButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
