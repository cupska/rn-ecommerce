import * as React from "react";
import Svg, { Defs, Path, Pattern, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Patt6 = (props: SvgProps) => (
  <Svg width={100} height={100} {...props}>
    <Defs>
      <Pattern viewBox="0 0 10 10" width={100} height={100}>
        <Path
          fill="#000"
          stroke={"#343aeb"}
          fillRule="evenodd"
          d="M0 6.172 6.172 0h5.656L0 11.828V6.172Zm40 5.656L28.172 0h5.656L40 6.172v5.656ZM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172Zm12 0L20 10.172 21.828 12h-3.656Z"
        />
      </Pattern>
    </Defs>
  </Svg>
);
export default Patt6;
