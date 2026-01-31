
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash-icon.jpg")} // your full-screen image
        style={styles.image}
        resizeMode="cover" // or "contain" depending on your image
      />
      <Button mode="contained" onPress={() => {router.push("/(tabs)/login")}}>
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B22222", // fallback background
  },
  image: {
    width: width,
    height: height,
  },
});
