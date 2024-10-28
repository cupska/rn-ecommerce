import { Product } from "@/types";
import { FlatList, FlatListProps, View } from "react-native";
import { ProductCard } from "./ui";
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { GetAllPromiseProductReturn } from "@/services/dummyjson.com";

type ProductsFlatListType = Omit<FlatListProps<Product>, ""> & {
  productsQuery: UseInfiniteQueryResult<
    InfiniteData<GetAllPromiseProductReturn>
  >;
};
export default function ProductsFlatList({
  productsQuery,
  numColumns = 2,
  horizontal = false,
}: ProductsFlatListType) {
  const items = new Array(3);
  if (!productsQuery.data) return;
  const reducedProduct = productsQuery.data.pages.reduce<Product[]>(
    (prev, curr) => [...prev, ...curr.products],
    []
  );
  return (
    <FlatList
      numColumns={numColumns}
      onEndReached={() =>
        (!productsQuery.isFetchingNextPage || productsQuery.hasNextPage) &&
        productsQuery.fetchNextPage()
      }
      horizontal={horizontal}
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
            <View
            // style={{ display: !productsQuery.hasNextPage ? "flex" : "none" }}
            >
              {productsQuery.isError ? <Text>ERROR memuat</Text> : <Loader />}
            </View>
          )}
        </>
      }
    />
  );
}
