import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function ProtectedLayout() {
  console.log("🟡 Protected layout rendered");

  const { customerToken, loading } = useAuth();
  console.log("customerToken:", customerToken);
  
  if (loading) {
    console.log("⏳ Auth loading...");
    return null;
  }

  if (!customerToken) {
    console.log("🔴 Customer not logged in, redirecting...");
    return <Redirect href="/screens/signin" />;
  }

  console.log("🟢 Customer authenticated");

  return <Stack screenOptions={{ headerShown: false }} />;
}
