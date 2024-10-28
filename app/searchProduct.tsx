import { Searchbar } from "@/components/form";
import { Button } from "@/components/ui";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchProduct() {
  const [searchVal, setSearchVal] = useState("");
  const doSearch = () => router.push({ pathname: "/products" });
  return (
    <SafeAreaView>
      <View style={style.searchContainer}>
        <Searchbar
          value={searchVal}
          onChangeText={setSearchVal}
          style={style.searchInput}
          autoFocus
        />
        <Button onPress={() => doSearch()} style={style.buttonSearch}>
          Cari
        </Button>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    margin: 16,
  },
  searchInput: { flexShrink: 0, flexGrow: 1 },
  buttonSearch: { alignItems: "center", justifyContent: "center" },
});
