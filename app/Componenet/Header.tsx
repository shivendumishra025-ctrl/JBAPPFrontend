import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text,Image } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";


export default function Header() {
  const router = useRouter();
  const [area, setArea] = useState("Fetching...");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setArea("Location off");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const geo = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geo.length > 0) {
          const place = geo[0];
          // Priority: area → city → region
          console.log(place);
          
          setArea(
            place.name ||
            place.formattedAddress ||
              place.city ||
              place.region ||
              "Unknown"
          );
        }
      } catch (err) {
        console.log("Location error:", err);
        setArea("Unavailable");
      }
    })();
  }, []);

  return (
    <View style={styles.topBar}>
      <View>
           <TouchableOpacity
             style={styles.locationBox}
          
           >
             <Icon name="location-outline" size={20} color="#ff5722" />

             <Text style={styles.locationText} numberOfLines={1}>
               {area}
             </Text>
            
           </TouchableOpacity>
             </View>
    
            <Image source={require('../../assets/images/icon.png')} style={{width:170,height:120}} />

           <TouchableOpacity onPress={() => router.push("/protected/Profile")}>
             <Icon name="person-circle-outline" size={34} color="#333" />
           </TouchableOpacity>
         </View>
  );
}


const styles = StyleSheet.create({
    wrapper: {
    backgroundColor: "#fff",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 45,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 30,
  },
locationBox: {
  alignItems: "center",      // 👈 center icon + text
  justifyContent: "center",
  padding: 8,
  maxWidth: 120,
},

  locationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
});

