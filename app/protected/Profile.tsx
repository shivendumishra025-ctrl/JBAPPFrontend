import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { AuthContext } from "@/providers/AuthProvider";

export default function Profile() {
  const router = useRouter();
const { logout } = useContext(AuthContext);
  const handleLogout = () => {
     logout();// ✅ Expo Router way
  };

  const Row = ({
    label,
    onPress,
  }: {
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.item}>{label}</Text>
      <AntDesign name="right" color="#000" size={22} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Menu */}
      <View style={{ flex: 1 }}>
        <Row label="Past Orders" onPress={() => router.push("/protected/PastOrders")} />
        {/* <Row label="Favourite Dishes" onPress={() => router.push("/protected/Favourite")} /> */}
        <Row
          label="Saved Addresses"
          onPress={() =>
            router.push({ pathname: "/protected/Address", params: { from: "profile" } })
          }
        />
        <Row label="Edit Profile" onPress={() => router.push("/protected/EditProfile")} />

        <Button mode="contained" onPress={handleLogout} style={styles.logoutBtn}>
          Log Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileContainer: {
    marginTop: 36,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  item: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  logoutBtn: {
    marginTop: 30,
  },
});
