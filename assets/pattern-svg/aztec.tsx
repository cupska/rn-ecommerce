import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Patt1 = (props: SvgProps) => (
  <Svg {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4Zm12 8h20v4H16v24H0v-4h12V36Zm16 12h-4v12h8v4H20V44h12v12h-4v-8ZM0 36h8v20H0v-4h4V40H0v-4Z"
    />
  </Svg>
);
export default Patt1;
