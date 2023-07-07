import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
type ArrowLeftProps = {
  width?: number;
  height?: number;
  color?: string;
};

const IconArrowLeft = ({
  width = 24,
  height = 24,
  color = '#fff',
}: ArrowLeftProps) => {
  return (
    <Svg width={widthLize(width)} height={widthLize(height)} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m15 18-6-6 6-6"
      />
    </Svg>
  );
};

export default IconArrowLeft;
