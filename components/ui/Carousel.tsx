import * as React from "react";
import { Image, Module, Text, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
];

function BannerCarousel() {
  const { width } = useWindowDimensions();
  const height = (width * 302) / 1208;

  return (
    <View id="carousel-component">
      <Carousel
        testID={"xxx"}
        loop={true}
        width={width}
        height={height}
        snapEnabled={true}
        pagingEnabled={false}
        autoPlayInterval={2000}
        autoPlay
        data={[
          require("@/assets/banner/ea701ee6-f36b-473d-b429-4d2a1da0713d.jpg"),
          require("@/assets/banner/6d79d227-67fe-497a-a904-af990882e2ee.jpg.webp"),
        ]}
        style={{ width: "100%" }}
        renderItem={({ index, item }) => (
          <Image key={index} style={{}} resizeMode="repeat" source={item} />
        )}
      />
    </View>
  );
}
export { BannerCarousel };
