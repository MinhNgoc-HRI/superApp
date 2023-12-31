import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconLogo = ({width = 64, height = 64, color = '#D21F3C'}: Props) => {
  return (
    <Svg
      width={widthLize(width)}
      height={widthLize(height)}
      viewBox="0 0 64 64"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M41.5794 30.2057C35.9615 34.4316 26.4277 40.9155 26.4277 36.2758V18.7355C26.4277 10.8689 36.2947 18.5799 41.8696 23.5644C43.8722 25.3538 43.7228 28.5949 41.5794 30.2057ZM59.4971 9.74263C56.2047 3.81218 47.1518 0 30.6949 0C24.1272 0 10.2671 2.72829 5.59558 7.20177C-1.6711 14.1578 -0.987538 35.1583 2.71536 41.0888C6.41826 47.0192 13.8258 49.5601 21.2298 51.6801C28.6374 53.7966 43.0385 59.7271 43.0385 59.7271L39.7478 52.5271C39.7478 52.5271 51.2687 52.1027 59.4971 42.3601C67.7256 32.6175 62.7878 15.6731 59.4971 9.74263"
        fill={color}
      />
    </Svg>
  );
};

export default IconLogo;
