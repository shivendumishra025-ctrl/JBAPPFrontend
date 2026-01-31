import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Heart } from "lucide-react-native";

const sampleData = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/paneer-butter-masala.jpg",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    image:
      "https://www.simplyrecipes.com/thmb/1vYO1QuLrhvjzcmu3BNJVZTcEuM=/1500x0/filters:no_upscale()/Simply-Recipes-Margherita-Pizza-Lead.jpg",
  },
  {
    id: "3",
    name: "Gulab Jamun",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/10/gulab-jamun.jpg",
  },
];

export default function FavouriteDishes() {
  const [favourites, setFavourites] = useState(sampleData);

  const removeFavourite = (id: string) => {
    setFavourites(favourites.filter((dish) => dish.id !== id));
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold mb-4">❤️ Favourite Dishes</Text>

      {favourites.length === 0 ? (
        <Text className="text-gray-500 text-center mt-10">
          No favourite dishes yet. Start adding!
        </Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <View className="bg-gray-100 rounded-2xl mb-4 p-2 w-[48%] shadow-sm">
              <Image
                source={{ uri: item.image }}
                className="w-full h-28 rounded-xl"
                resizeMode="cover"
              />
              <Text className="font-semibold mt-2 text-center">
                {item.name}
              </Text>
              <TouchableOpacity
                onPress={() => removeFavourite(item.id)}
                className="absolute top-3 right-3 bg-white p-1 rounded-full shadow"
              >
                <Heart size={18} color="red" fill="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
