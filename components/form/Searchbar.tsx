import { Searchbar as SearchbarPaper } from "react-native-paper";
import { ComponentProps } from "react";
import { Text } from "react-native";

export function Searchbar(props: ComponentProps<typeof SearchbarPaper>) {
  return (
    <SearchbarPaper
      {...props}
      style={{ borderRadius: 12, borderWidth: 0, ...(props.style as Object) }}
    />
  );
}
