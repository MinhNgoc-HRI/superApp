import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconEye = ({width = 24, height = 24, color = '#8A8B93'}: Props) => {
  return (
    <Svg
      width={widthLize(width)}
      height={widthLize(height)}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M3 12C3 12 6.27273 5.45459 12 5.45459C17.7273 5.45459 21 12 21 12C21 12 17.7273 18.5455 12 18.5455C6.27273 18.5455 3 12 3 12Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 14.4545C13.3556 14.4545 14.4545 13.3556 14.4545 12C14.4545 10.6443 13.3556 9.54541 12 9.54541C10.6443 9.54541 9.54541 10.6443 9.54541 12C9.54541 13.3556 10.6443 14.4545 12 14.4545Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconEye;
