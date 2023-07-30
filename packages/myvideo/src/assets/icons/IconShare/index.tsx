import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconShare = ({width = 24, height = 24, color = '#B0B0B8'}: Props) => {
  return (
    <Svg
      width={widthLize(width)}
      height={widthLize(height)}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M14.0333 8.26667V4L21.5 11.4667L14.0333 18.9333V14.56C8.7 14.56 4.96667 16.2667 2.3 20C3.36667 14.6667 6.56667 9.33333 14.0333 8.26667Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconShare;
