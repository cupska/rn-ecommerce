import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Patt5 = (props: SvgProps) => (
  <Svg width={40} height={1} {...props}>
    <Path fill="#000" fillRule="evenodd" d="M0 0h20v1H0z" />
  </Svg>
);
export default Patt5;
