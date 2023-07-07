import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconFB = ({width = 41, height = 40, color = '#3B5998'}: Props) => {
  return (
    <Svg
      width={widthLize(width)}
      height={widthLize(height)}
      viewBox="0 0 41 40"
      fill="none">
      <Path
        d="M0.5 20C0.5 8.9543 9.4543 0 20.5 0C31.5457 0 40.5 8.9543 40.5 20C40.5 31.0457 31.5457 40 20.5 40C9.4543 40 0.5 31.0457 0.5 20Z"
        fill={color}
      />
      <Rect x="0.5" width="40" height="40" rx="20" fill={color} />
      <Path
        d="M22.8145 31V19.9987H26.0687L26.5 16.2076H22.8145L22.82 14.3101C22.82 13.3213 22.9207 12.7915 24.4426 12.7915H26.477V9H23.2223C19.3129 9 17.9369 10.8391 17.9369 13.9319V16.208H15.5V19.9991H17.9369V31H22.8145Z"
        fill="white"
      />
    </Svg>
  );
};

export default IconFB;
