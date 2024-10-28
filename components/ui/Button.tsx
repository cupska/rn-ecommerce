import { ComponentProps } from "react";
import { Button as PaperButton } from "react-native-paper";

export function Button({
  style = { alignItems: "center", justifyContent: "center" },
  ...props
}: ComponentProps<typeof PaperButton>) {
  return <PaperButton {...props} style={style} />;
}
