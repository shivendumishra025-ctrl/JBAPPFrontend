import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../app/socket";

type AuthContextType = {
  customerToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  customerToken: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [customerToken, setCustomerToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load CUSTOMER token on app start
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");
        if (token) setCustomerToken(token);
      } catch (err) {
        console.error("Token load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  // 🔐 CUSTOMER login
  const login = async (token: string) => {
    await AsyncStorage.setItem("customerToken", token);
    setCustomerToken(token);
  };

  // 🚪 CUSTOMER logout
  const logout = async () => {
    try {
      console.log("🚪 Customer logging out...");

      if (socket.connected) {
        socket.removeAllListeners();
        socket.disconnect();
      }

      await AsyncStorage.multiRemove([
        "customerToken",
        "user",
      ]);

      setCustomerToken(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ customerToken, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => useContext(AuthContext);
