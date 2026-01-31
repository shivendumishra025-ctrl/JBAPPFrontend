import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import products, { Product } from "../../data/Product";
import { useCart } from "../../Context/CartContext";

export default function ProductList() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { cart, increase, decrease } = useCart();

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const [activeCategory, setActiveCategory] = useState<string>(
    (params.category as string) || "All"
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = useMemo(() => {
    return activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  /* ================= CART SUMMARY ================= */
  const totalItems = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return sum + (Number(product?.price) || 0) * qty;
  }, 0);

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* ================= CATEGORY BAR (FLATLIST – NO JUMP) ================= */}
      <View style={styles.categoryBarWrapper}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
          renderItem={({ item }) => {
            const isActive = item === activeCategory;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveCategory(item)}
                style={[
                  styles.categoryPill,
                  isActive && styles.categoryActive,
                ]}
              >
                <Text
                  numberOfLines={1}
                  allowFontScaling={false}
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ================= PRODUCT LIST ================= */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {filteredProducts.map(item => {
          const qty = cart[item.id] || 0;

          return (
            <View key={item.id} style={styles.rowCard}>
                 {item.images && (
                <Image source={item.images} style={styles.image} />
              )}
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setSelectedProduct(item)}
              >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.description || " "}
                </Text>
                <Text style={styles.price}>₹ {item.price}</Text>
              </TouchableOpacity>

           

              {qty === 0 ? (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => increase(item.id)}
                >
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.qtyBox}>
                  <TouchableOpacity onPress={() => decrease(item.id)}>
                    <Text style={styles.qtyBtn}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{qty}</Text>
                  <TouchableOpacity onPress={() => increase(item.id)}>
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* ================= CART FOOTER ================= */}
      {totalItems > 0 && (
        <View style={styles.cartFooter}>
          <Text style={styles.cartText}>
            {totalItems} items | ₹ {totalPrice}
          </Text>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate("Cart" as never)}
          >
            <Text style={styles.cartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ================= PRODUCT MODAL ================= */}
      <Modal visible={!!selectedProduct} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {selectedProduct && (
              <>
                <Image source={selectedProduct.images} style={styles.modalImg} />
                <Text style={styles.modalTitle}>
                  {selectedProduct.name}
                </Text>
                <Text style={styles.price}>₹ {selectedProduct.price}</Text>
                <Text style={styles.desc}>
                  {selectedProduct.description}
                </Text>

                <TouchableOpacity
                  style={styles.modalAdd}
                  onPress={() => {
                    increase(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                  <Text style={{ marginTop: 10, color: "red" }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "800", marginLeft: 10 },

  /* CATEGORY BAR (LOCKED HEIGHT) */
  categoryBarWrapper: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  categoryContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryPill: {
    height: 32,
    minWidth: 90,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: "#f2f2f2",
  },
  categoryActive: {
    backgroundColor: "#8A0000",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
    color: "#333",
  },
  categoryTextActive: {
    color: "#fff",
  },

  /* PRODUCT ROW */
  rowCard: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    alignItems: "center",
  },
  name: { fontSize: 16, fontWeight: "700" },
  desc: { fontSize: 12, color: "#777", marginVertical: 4 },
  price: { fontSize: 16, fontWeight: "700", color: "#8A0000" },

  image: { width: 100, height: 100, borderRadius: 10, marginHorizontal: 10 },

  addBtn: {
    borderWidth: 1,
    borderColor: "#8A0000",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  addText: { color: "#8A0000", fontWeight: "700" },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8A0000",
    borderRadius: 6,
  },
  qtyBtn: { paddingHorizontal: 10, color: "#8A0000", fontSize: 18 },
  qty: { paddingHorizontal: 8, fontWeight: "700" },

  /* CART FOOTER */
  cartFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartText: { fontSize: 16, fontWeight: "700" },
  cartBtn: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartBtnText: { color: "#fff", fontWeight: "700" },

  /* MODAL */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  modalImg: { width: 260, height: 200, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "800", marginVertical: 8 },
  modalAdd: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});
