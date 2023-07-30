import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
type ArrowLeftProps = {
  width?: number;
  height?: number;
  color?: string;
};

const IconDropDown = ({
  width = 24,
  height = 24,
  color = '#fff',
}: ArrowLeftProps) => {
  return (
    <Svg width={widthLize(width)} height={widthLize(height)} fill="none">
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconDropDown;
