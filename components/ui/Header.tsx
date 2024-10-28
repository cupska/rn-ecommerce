import { Pressable, StyleSheet, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import { Searchbar } from "../form";
import { Href, Link, router, useNavigation } from "expo-router";

export function Header({
  searchbarProps,
}: {
  searchbarProps: Pick<
    ComponentProps<typeof Searchbar>,
    "value" | "onChangeText"
  >;
}) {
  const navigation = useNavigation();
  const onPressSearchBar = () => {
    router.navigate("/searchProduct");
  };
  return (
    <View style={style.container}>
      <Pressable style={{ flexGrow: 1 }} onPress={() => onPressSearchBar()}>
        <Searchbar {...searchbarProps} readOnly style={style.searchBar} />
      </Pressable>
      <View style={style.iconWrapper}>
        <EvilIcons size={32} name="envelope" />
        <EvilIcons size={32} name="bell" />
        <EvilIcons size={32} name="cart" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
  },
  iconWrapper: { display: "flex", flexDirection: "row" },
  searchBar: {
    borderRadius: 12,
    flexShrink: 1,
  },
});
