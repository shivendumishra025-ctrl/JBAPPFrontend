import axios from "axios";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import socket from "../socket";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ================= TYPES ================= */

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Out for delivery"
  | "Completed"
  | "Delivered"
  | "Rejected"
  | "Cancelled";

/* ================= STEPS ================= */

const STEPS = [
  { label: "Pending", icon: "clock-outline" },
  { label: "Preparing", icon: "chef-hat" },
  { label: "Out for delivery", icon: "motorbike" },
  { label: "Delivered", icon: "check-circle" },
];

const STATUS_STEP_MAP: Record<string, number> = {
  Pending: 0,
  Preparing: 1,
  Completed: 1,
  "Out for delivery": 2,
  Delivered: 3,
};

/* ================= COMPONENT ================= */

export default function OrderSuccess() {
  const { orderId } = useGlobalSearchParams<{ orderId: string }>();
  const router = useRouter();

  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [step, setStep] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [deliveryBoy, setDeliveryBoy] = useState<{
    name: string;
    phone: string;
    vehicleType?: string;
  } | null>(null);

  const progress = useSharedValue(0);

  /* ================= JOIN ORDER ROOM ================= */
  useEffect(() => {
    if (!orderId) return;

    socket.emit("join_room", orderId);

    return () => {
      socket.emit("leave_room", orderId);
    };
  }, [orderId]);

  /* ================= INITIAL API FETCH ================= */
  useEffect(() => {
    if (!orderId) return;

    axios
      .get(`https://jbappbackend.onrender.com/api/orders/${orderId}/status`)
      .then((res) => {
        console.log("📥 Initial API:", res.data);
        setOrderStatus(res.data.status);
        setDeliveryBoy(res.data.deliveryBoy || null);

        const initialStep = STATUS_STEP_MAP[res.data.status];
        if (initialStep !== undefined) setStep(initialStep);
      })
      .catch(console.log);
  }, [orderId]);

  /* ================= REAL-TIME SOCKET ================= */
  useEffect(() => {
    

    if (!orderId) return;

    const handler = (data: any) => {
       console.log("📩 REAL-TIME EVENT:", data);
      if (data.orderId !== orderId) return;

      setOrderStatus(data.status);
      setDeliveryBoy(data.deliveryBoy || null);

      const newStep = STATUS_STEP_MAP[data.status];
      if (newStep !== undefined) {
        setStep(newStep);
      }
    };
console.log("Setting up socket listener for orderId:", orderId);

    socket.on("orderStatusUpdated", handler);

    return () => {
      socket.off("orderStatusUpdated", handler);
    };
  }, [orderId]);

  /* ================= PROGRESS ANIMATION ================= */
  useEffect(() => {
    if (!trackWidth) return;

    progress.value = withTiming(
      (step / (STEPS.length - 1)) * trackWidth,
      { duration: 400 }
    );
  }, [step, trackWidth]);

  const progressStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.orderId}>Order #{orderId?.slice(-6)}</Text>

        {/* PROGRESS TRACKER */}
        <View
          style={styles.progressContainer}
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        >
          <View style={styles.progressTrack} />
          <Animated.View style={[styles.progressFill, progressStyle]} />

          <View style={styles.steps}>
            {STEPS.map((item, index) => (
              <View key={index} style={styles.step}>
                <View
                  style={[
                    styles.iconWrapper,
                    index <= step && styles.iconActive,
                  ]}
                >
                  <Icon name={item.icon} size={22} color="#fff" />
                </View>
                <Text style={styles.stepText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* DELIVERY PARTNER */}
        {deliveryBoy && (
          <View style={styles.deliveryCard}>
            <Text style={styles.deliveryTitle}>Delivery Partner</Text>
            <Text style={styles.deliveryName}>👤 {deliveryBoy.name}</Text>

            <TouchableOpacity
              style={styles.callButton}
              onPress={() => Linking.openURL(`tel:${deliveryBoy.phone}`)}
            >
              <Icon name="phone" size={18} color="#fff" />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.statusText}>Status: {orderStatus}</Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.homeText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ======================= STYLES ======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e23744",
    textAlign: "center",
    marginBottom: 10,
  },

  progressContainer: {
    marginTop: 20,
    height: 130,
  },

  progressTrack: {
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 4,
    position: "absolute",
    top: 50,
    width: "100%",
  },

  progressFill: {
    height: 4,
    backgroundColor: "#e23744",
    borderRadius: 4,
    position: "absolute",
    top: 50,
    left: 0,
  },

  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  step: {
    alignItems: "center",
    width: SCREEN_WIDTH / 4.5,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
  },

  iconActive: {
    backgroundColor: "#e23744",
  },

  stepText: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
  },

  deliveryCard: {
    marginTop: 20,
    backgroundColor: "#fef3f4",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  deliveryTitle: {
    fontWeight: "700",
    marginBottom: 5,
    fontSize: 16,
  },

  deliveryName: {
    fontSize: 14,
    marginBottom: 10,
  },

  callButton: {
    flexDirection: "row",
    backgroundColor: "#e23744",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  callText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  statusText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  homeButton: {
    marginTop: 15,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 30,
  },

  homeText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
