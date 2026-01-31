import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View, SafeAreaView } from "react-native";
import Header from "../Componenet/Header";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom Header always on top */}
      <Header />

      {/* Tabs should take remaining screen space */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "brown",
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={28} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="login"
            options={{
              title: "Menu",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="dining" size={28} color={color} />
              ),
            }}
          />

          {/* Example Cart tab (optional) */}
          {/* <Tabs.Screen
            name="Cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="shopping-cart" size={28} color={color} />
              ),
            }}
          /> */}
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
