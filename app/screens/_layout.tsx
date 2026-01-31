import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Checkout" />
      <Stack.Screen name="OrderSuccess" />
      <Stack.Screen name="ReviewOrder" />
      <Stack.Screen name="signin" />
      {/* <Stack.Screen name="Signup" /> */}
    </Stack>
  );
}
