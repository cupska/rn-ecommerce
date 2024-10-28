import { Searchbar } from "@/components/form";
import { TextInput } from "@/components/form/TextInput";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ui/cards/product.card";
import dummyjson, {
  GetAllPromiseProductReturn,
} from "@/services/dummyjson.com";
import { Product } from "@/types";
import { EvilIcons, Feather } from "@expo/vector-icons";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const param: { category: string } = useLocalSearchParams();
  const defaultSearch = "smartphone";
  const numColumns = 2;
  const { queryFn, getNextPageParam, queryKey } = dummyjson.getAllProducts({
    category: param.category ?? undefined,
  });
  const productsQuery = useInfiniteQuery({
    queryFn,
    getNextPageParam,
    queryKey,
    initialPageParam: 0,
  });

  if (!productsQuery.data) return;
  const reducedProduct = productsQuery.data.pages.reduce<Product[]>(
    (prev, curr) => [...prev, ...curr.products],
    []
  );
  const isProductsListOdd = !!(reducedProduct.length % numColumns);
  isProductsListOdd && reducedProduct.push({ ...reducedProduct[0], id: -1 });

  return (
    <SafeAreaView>
      <Header defaultSearch={defaultSearch} />
      <FlatList
        numColumns={numColumns}
        onEndReached={() =>
          (!productsQuery.isFetchingNextPage || productsQuery.hasNextPage) &&
          productsQuery.fetchNextPage()
        }
        horizontal={false}
        onEndReachedThreshold={1}
        contentContainerStyle={{ gap: 8 }}
        data={reducedProduct}
        renderItem={({ item, index }) => (
          <>
            {item.id === -1 ? (
              <View style={{ flex: 2 }}></View>
            ) : (
              <View key={item.id} style={{ flex: 2 }}>
                <ProductCard>
                  <ProductCard.Thumbnail source={{ uri: item.thumbnail }} />
                  <ProductCard.Title {...item} />
                  <ProductCard.PriceTag {...item} />
                  <ProductCard.Rating {...item} />
                </ProductCard>
              </View>
            )}
          </>
        )}
        ListFooterComponent={
          <>
            {productsQuery.hasNextPage && (
              <View>
                {productsQuery.isError ? <Text>ERROR memuat</Text> : <Loader />}
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}

function Header({ defaultSearch }: { defaultSearch: string }) {
  return (
    <View style={style.headerContainer}>
      <Feather name="arrow-left" size={24} />
      <View style={{ flexGrow: 1 }}>
        <Searchbar value="" />
      </View>

      <Feather name="shopping-cart" size={24} />
      <Feather name="menu" size={24} />
    </View>
  );
}

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
