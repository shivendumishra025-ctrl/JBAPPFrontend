import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import products from "../../data/Product";
import { useCart } from "../../Context/CartContext";

const { width } = Dimensions.get("window");

interface TrendingItem {
  _id: string;
  totalQty: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const { cart, increase, decrease } = useCart();

  const [search, setSearch] = useState("");
  const [recommended, setRecommended] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  /* ================= FETCH TRENDING ================= */
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://jbappbackend.onrender.com/api/recommend/realtime"
        );
        const data: TrendingItem[] = await res.json();

        const mapped = data
          .map(t => {
            const product = products.find(
              p => p.name.toLowerCase() === t._id.toLowerCase()
            );
            if (!product) return null;
            return { ...product, orderedCount: t.totalQty };
          })
          .filter(Boolean);

        setRecommended(mapped);
      } catch (e) {
        console.log("Trending fetch failed");
      }
    };

    fetchTrending();
    const i = setInterval(fetchTrending, 30000);
    return () => clearInterval(i);
  }, []);

  /* ================= SPECIAL FOOD ================= */
  const specialFoods = products.filter(p =>
    p.tags?.includes("todays-special")
  );

  /* ================= CART SUMMARY ================= */
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return sum + (product ? Number(product.price) * qty : 0);
  }, 0);

  /* ================= BANNERS ================= */
  const banners = [
    require("../../assets/images/main1.png"),
    require("../../assets/images/main1.png"),
  ];
const mustTryFoods = products.filter(p =>
  p.tags?.includes("must-try")
);

  const bannerRef = useRef<ScrollView>(null);

  useEffect(() => {
    const i = setInterval(() => {
      const next = (index + 1) % banners.length;
      setIndex(next);
      bannerRef.current?.scrollTo({
        x: next * (width - 30),
        animated: true,
      });
    }, 3500);
    return () => clearInterval(i);
  }, [index]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ================= SEARCH ================= */}
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search for dishes"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* ================= INFO STRIP (NEW) ================= */}
        <View style={styles.infoStrip}>
          <View style={styles.infoItem}>
            <Icon name="time-outline" size={16} color="#8A0000" />
            <Text style={styles.infoText}>30-40 min</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="star" size={16} color="#f5a623" />
            <Text style={styles.infoText}>4.5 Rating</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="shield-checkmark-outline" size={16} color="green" />
            <Text style={styles.infoText}>Hygiene Safe</Text>
          </View>
        </View>

        {/* ================= BANNERS ================= */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 15 }}
        >
          {banners.map((img, i) => (
            <ImageBackground
              key={i}
              source={img}
              style={styles.banner}
              imageStyle={{ borderRadius: 16 }}
            >
              <View style={styles.bannerOverlay} />
              <Text style={styles.bannerText}>Flat 40% OFF</Text>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* ================= QUICK CATEGORIES (NEW) ================= */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 15, marginBottom: 10 }}
        >
          {["Biryani", "Thali", "Veg", "Non-Veg", "Dessert", "Snacks"].map(cat => (
            <TouchableOpacity key={cat} style={styles.categoryPill}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= SPECIAL FOOD ================= */}
        {specialFoods.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              Special Food at Just Bengali ⭐
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {specialFoods.map(item => {
                const qty = cart[item.id] || 0;

                return (
                  <View key={item.id} style={styles.specialCard}>
                    <Image source={item.images} style={styles.specialImage} />

                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Chef’s Special</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                      <Text style={styles.name}>{item.name}</Text>

                      <View style={styles.row}>
                        <Text style={styles.price}>₹ {item.price}</Text>

                        {qty === 0 ? (
                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => increase(item.id)}
                          >
                            <Text style={styles.addText}>Add</Text>
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
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </>
        )}

    

        {/* ================= TRENDING ================= */}
        {recommended.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Trending Now 🔥</Text>

            {recommended.map(item => {
              const qty = cart[item.id] || 0;

              return (
                <View key={item.id} style={styles.card}>
                  <Image source={item.images} style={styles.image} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.sub}>
                      Ordered {item.orderedCount} times
                    </Text>

                    <View style={styles.row}>
                      <Text style={styles.price}>₹ {item.price}</Text>

                      {qty === 0 ? (
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => increase(item.id)}
                        >
                          <Text style={styles.addText}>Add</Text>
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
                  </View>
                </View>
              );
            })}
          </>
        )}
        {/* ================= MUST TRY DISHES ================= */}
{mustTryFoods.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>Must Try Dishes ⭐</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {mustTryFoods.map(item => {
        const qty = cart[item.id] || 0;

        return (
          <View key={item.id} style={styles.mustTryCard}>
            <Image source={item.images} style={styles.mustTryImage} />

            <View style={{ padding: 10 }}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>

              <View style={styles.row}>
                <Text style={styles.price}>₹ {item.price}</Text>

                {qty === 0 ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => increase(item.id)}
                  >
                    <Text style={styles.addText}>Add</Text>
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
            </View>
          </View>
        );
      })}
    </ScrollView>
  </>
)}

      </ScrollView>

      {/* ================= CART FOOTER ================= */}
      {totalItems > 0 && (
        <View style={[styles.cartFooter, { bottom: tabBarHeight }]}>
          <Text style={styles.cartText}>
            {totalItems} item(s) | ₹ {totalPrice}
          </Text>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push("/Cart")}
          >
            <Text style={styles.cartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#fff" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    paddingHorizontal: 15,
    height: 48,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
  },
  searchInput: { flex: 1, marginLeft: 10 },

  infoStrip: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 15,
  },
  infoItem: { flexDirection: "row", alignItems: "center" },
  infoText: { marginLeft: 6, fontSize: 12, fontWeight: "600" },

  banner: {
    width: width - 30,
    height: 190,
    marginHorizontal: 15,
    justifyContent: "flex-end",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
  },
  bannerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    padding: 15,
  },

  categoryPill: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: { fontSize: 14, fontWeight: "600" },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 15,
    marginVertical: 15,
  },

  card: { flexDirection: "row", padding: 15 },
  image: { width: 90, height: 90, borderRadius: 12, marginRight: 12 },

  name: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 12, color: "#777", marginVertical: 4 },
  price: { fontSize: 16, fontWeight: "700", color: "#8A0000" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: { color: "#fff", fontWeight: "bold" },

  qtyBox: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    backgroundColor: "#8A0000",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  qty: { marginHorizontal: 10, fontSize: 16, fontWeight: "700" },

  specialCard: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    width: 220,
    marginHorizontal: 10,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 5,
    overflow: "hidden",
  },
  specialImage: { width: "70%", height: 140, margin:30 },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#e23744",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },

  reorderCard: {
    width: 140,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    elevation: 3,
    alignItems: "center",
  },
  reorderImage: { width: 100, height: 80, borderRadius: 10 },
  reorderName: {
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 6,
    textAlign: "center",
  },
  reorderBtn: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reorderBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  cartFooter: {
    marginBottom: -100,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 10,
  },
  cartText: { fontSize: 16, fontWeight: "bold" },
  cartButton: {
    backgroundColor: "#8A0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  mustTryCard: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
  width: 250,
  marginHorizontal: 10,
  backgroundColor: "#fff",
  borderRadius: 18,
  elevation: 5,
  // overflow: "hidden",
},
mustTryImage: {
  width: "70%", height: 140, margin:30
},

});
