import { useGlobalSearchParams } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native/Libraries/Components/View/View";

export default function OrderSuccess() {
  const { orderId } = useGlobalSearchParams<{ orderId: string }>();

  if (!orderId) {
    return null; // or loader
  }

  return (
    <View>
      <Text>Order ID: {orderId}</Text>
    </View>
  );
}
