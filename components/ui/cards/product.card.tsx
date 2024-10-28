import { Product } from "@/types";
import { calculateFinalPrice } from "@/utils/calculateDiscountPrice";
import { convertUSDtoIDR } from "@/utils/convertUSDtoIDR";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps, ReactNode } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

type StyleCustomType<
  T extends keyof typeof style,
  U extends ImageStyle | TextStyle | ViewStyle
> = Partial<Pick<Record<keyof typeof style, U>, T>>;
function ProductCard({
  children,
  styleCustom,
}: {
  children: ReactNode;
  styleCustom?: StyleCustomType<"container", ViewStyle>;
}) {
  return (
    <View style={{ ...style.container, ...styleCustom?.container }}>
      {children}
    </View>
  );
}

ProductCard.Thumbnail = ({
  source,
  styleCustom,
}: {
  source: ComponentProps<typeof Image>["source"];
  styleCustom?: StyleCustomType<"thumbnail", ImageStyle>;
}) => (
  <Image
    style={{
      ...style.thumbnail,
      ...styleCustom?.thumbnail,
    }}
    source={source}
  />
);

ProductCard.Title = ({ title }: { title: string }) => (
  <Text style={style.title} numberOfLines={2}>
    {title}
  </Text>
);

ProductCard.PriceTag = ({
  discountPercentage,
  price: originalPrice,
  styleCustom,
  prefixOriginalPrice,
}: {
  prefixOriginalPrice?: string | JSX.Element;
  styleCustom?: StyleCustomType<
    "finalPrice" | "priceWrapper" | "originalPrice",
    TextStyle
  >;
} & Pick<Product, "price" | "discountPercentage">) => {
  const finalPriceUSD = calculateFinalPrice(originalPrice, discountPercentage);
  const finalPriceRP = formatToRupiah(convertUSDtoIDR(finalPriceUSD));
  const originalPriceRP = formatToRupiah(convertUSDtoIDR(originalPrice));

  return (
    <View style={{ ...style.priceWrapper, ...styleCustom?.priceWrapper }}>
      <Text
        style={{
          ...style.finalPrice,
          ...(styleCustom?.finalPrice && styleCustom.finalPrice),
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {prefixOriginalPrice}
        {finalPriceRP}
      </Text>
      <Text
        style={{
          ...style.originalPrice,
          ...(styleCustom?.originalPrice && styleCustom.originalPrice),
        }}
        numberOfLines={1}
      >
        {originalPriceRP}
      </Text>
    </View>
  );
};

ProductCard.Rating = ({ rating }: Pick<Product, "rating">) => (
  <View style={style.ratingContainer}>
    <Rating
      ratingCount={5}
      imageSize={10}
      style={{ width: 50 }}
      startingValue={rating}
      fractions={1}
    />
    <Text style={style.ratingNums}>{rating.toFixed(1)}</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 0,
  },
  title: {
    fontWeight: "300",
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    width: "100%",
    overflow: "hidden",
  },
  finalPrice: {
    fontWeight: "500",
  },
  originalPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: "1",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  ratingNums: {
    fontSize: 10,
    color: "gray",
    marginLeft: 4,
  },
});

export default ProductCard;
