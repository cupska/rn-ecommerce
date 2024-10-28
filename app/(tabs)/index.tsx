import Loader from "@/components/Loader";
import { BannerCarousel, Header, ProductCard } from "@/components/ui";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import dummyjson from "@/services/dummyjson.com";
import { Category, Product } from "@/types";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [searchbarVal, setSearchbarVal] = useState("");

  const { queryKey, getNextPageParam, queryFn } = dummyjson.getAllProducts({});
  const productsQuery = useInfiniteQuery({
    queryFn,
    getNextPageParam,
    initialPageParam: 0,
    queryKey,
  });

  if (!productsQuery.data) return;
  const productList = productsQuery.data.pages.reduce(
    (prev: Product[], curr) => {
      prev.push(...curr.products);
      return prev;
    },
    []
  );
  // console.log({ products: productsQuery, list: productList, queryKey });

  return (
    <>
      <SafeAreaView>
        <Header
          searchbarProps={{
            value: searchbarVal,
            onChangeText: setSearchbarVal,
          }}
        />

        <FlatList
          data={productList}
          numColumns={2}
          onEndReached={() =>
            !productsQuery.isFetchingNextPage && productsQuery.fetchNextPage()
          }
          onEndReachedThreshold={1}
          columnWrapperStyle={{ gap: 8, marginHorizontal: 8, marginBottom: 8 }}
          ListHeaderComponent={
            <>
              <BannerCarousel />
              <UserInfoBar />
              <Pressable onPress={() => router.navigate("/products")}>
                <FlashSale products={productList} />
              </Pressable>
              <CategoriesGrid />
            </>
          }
          renderItem={({ item }) => (
            <View key={item.id} style={{ flex: 2 }}>
              <ProductCard
                styleCustom={{
                  container: {
                    backgroundColor: "white",
                    borderRadius: 8,
                    overflow: "hidden",
                  },
                }}
              >
                <ProductCard.Thumbnail source={{ uri: item.thumbnail }} />
                <View style={{ backgroundColor: "white", padding: 8 }}>
                  <ProductCard.Title {...item} />
                  <ProductCard.PriceTag {...item} />
                  <ProductCard.Rating {...item} />
                </View>
              </ProductCard>
            </View>
          )}
          ListFooterComponent={
            <View>
              {productsQuery.isError ? <Text>ERROR memuat</Text> : <Loader />}
            </View>
          }
        />
      </SafeAreaView>
    </>
  );
}

const UserInfoBar = () => {
  const saldo = "4000";
  const point = "200";
  return (
    <View style={UserInfoBarStyle.mainContainer}>
      <Ionicons
        name="scan-circle-outline"
        style={{ ...UserInfoBarStyle.icon, fontSize: 28 }}
      />
      <View style={UserInfoBarStyle.infoContainer}>
        <View>
          <View style={UserInfoBarStyle.wrapperTitle_Icon}>
            <Ionicons
              name="wallet-outline"
              style={{ ...UserInfoBarStyle.icon }}
            />
            <Text style={UserInfoBarStyle.textTitle}>{saldo}</Text>
          </View>
          <Text style={UserInfoBarStyle.textAdd}>Klaim 100RB</Text>
        </View>
        <View>
          <View style={UserInfoBarStyle.wrapperTitle_Icon}>
            <MaterialCommunityIcons
              name="hand-coin-outline"
              style={{ ...UserInfoBarStyle.icon }}
            />
            <Text style={UserInfoBarStyle.textTitle}>{point}</Text>
          </View>
          <Text style={UserInfoBarStyle.textAdd}>Gratis 25RB</Text>
        </View>
        <View>
          <View style={UserInfoBarStyle.wrapperTitle_Icon}>
            <Ionicons
              name="send-outline"
              style={{ ...UserInfoBarStyle.icon }}
            />
            <Text style={UserInfoBarStyle.textTitle}>Transfer</Text>
          </View>
          <Text style={UserInfoBarStyle.textAdd}>Gratis</Text>
        </View>
      </View>
    </View>
  );
};

const UserInfoBarStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  // scanContainer: { marginHorizontal: 8 },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  icon: {
    color: "green",
    fontSize: 12,
  },
  wrapperTitle_Icon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textTitle: {
    fontSize: 14,
    alignItems: "center",
    textAlignVertical: "bottom",
  },
  textAdd: {
    fontSize: 12,
    color: "gray",
  },
});

function CategoriesGrid() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: dummyjson.getAllCategories,
  });

  if (!categories.data) return <></>;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexDirection: "row", marginVertical: 16 }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.isSuccess &&
        (
          [
            ...categories.data.slice(0, 6).map((val, i) => {
              return { ...val, url: "/products" };
            }),
            {
              slug: "",
              name: "lihat semua",
              url: "/categories",
            },
          ] satisfies Category[]
        ).map(({ name, slug, url }, i) => (
          <Link
            key={name}
            href={{
              pathname: url as "/",
              params: { ...(slug && { category: slug }) },
            }}
            style={{
              marginHorizontal: 6,
              borderWidth: 1,
              borderColor: "#d1d1d1",
              shadowColor: "#d1d1d1",
              shadowOffset: { height: 8, width: 10 },
              shadowRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 24,
              backgroundColor: "white",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 12 }}>{name}</Text>
            </View>
          </Link>
        ))}
    </ScrollView>
  );
}

function FlashSale({ products }: { products: Product[] }) {
  const title = "FlashSale";
  const left = useCountdownTimer({ initialMinutes: 300 });
  return (
    <View style={flashSaleStyle.container}>
      <View style={flashSaleStyle.wrapperRow1}>
        <Text style={flashSaleStyle.title}>
          {title} <EvilIcons name="chevron-right" size={20} color={"gray"} />
        </Text>

        <View style={flashSaleStyle.countdownContainer}>
          <Text style={flashSaleStyle.countdownText}>{left}</Text>
        </View>
      </View>
      <View style={flashSaleStyle.wrapperCardProduct}>
        {products.slice(0, 4).map((product) => (
          <View key={product.id} style={{ flex: 1, paddingHorizontal: 4 }}>
            <ProductCard {...product}>
              <View>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#ff5e5e",
                    borderRadius: 2,
                    width: 32,
                    paddingVertical: 4,
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <Text style={{ fontSize: 10, color: "white" }}>
                    {product.discountPercentage.toFixed(0)} %
                  </Text>
                </View>
                <ProductCard.Thumbnail source={{ uri: product.thumbnail }} />
              </View>
              <ProductCard.PriceTag
                {...product}
                prefixOriginalPrice={
                  <MaterialIcons
                    name="discount"
                    size={8}
                    style={{ color: "red" }}
                  />
                }
                styleCustom={{
                  priceWrapper: { flexDirection: "column", gap: 0 },
                  finalPrice: { fontSize: 12 },
                  originalPrice: {
                    fontSize: 10,
                  },
                }}
              />
            </ProductCard>
          </View>
        ))}
      </View>
    </View>
  );
}

const flashSaleStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  wrapperRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  countdownContainer: {
    backgroundColor: "red",
    alignItems: "center",
    padding: 10,
    paddingVertical: 6,
    borderRadius: 24,
  },
  countdownText: { color: "white", fontWeight: "800" },
  wrapperCardProduct: {
    flexDirection: "row",
    marginHorizontal: 8,
  },
});
