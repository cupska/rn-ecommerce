import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";

export function TextInput(props: ComponentProps<typeof PaperTextInput>) {
  return <PaperTextInput {...props} />;
}

const styleCustom = StyleSheet.create({
  input: {
    borderColor: "#9ca3af",
    borderWidth: 1,
    width: "auto",
    borderRadius: 8,
  },
});
