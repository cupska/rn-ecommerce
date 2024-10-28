import dummyjson from "@/services/dummyjson.com";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Categories() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: dummyjson.getAllCategories,
  });
  return (
    <ScrollView>
      <ScrollView style={{ margin: 16, gap: 18 }}>
        {categoriesQuery.data?.map((category) => (
          <Link
            href={{
              pathname: "/products",
              params: { category: category.slug },
            }}
            key={category.name}
          >
            <View>
              <Text>{category.name}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
