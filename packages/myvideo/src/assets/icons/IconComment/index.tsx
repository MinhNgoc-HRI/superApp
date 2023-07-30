import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconComment = ({width = 24, height = 24, color = '#B0B0B8'}: Props) => {
  return (
    <Svg
      width={widthLize(width)}
      height={widthLize(height)}
      viewBox="0 0 24 24"
      fill="none">
      <G clip-Path="url(#clip0_19157_29506)">
        <Path
          d="M12.875 20.25H4.97188C4.87673 20.2513 4.78229 20.2334 4.69414 20.1976C4.60599 20.1618 4.52591 20.1087 4.45863 20.0414C4.39134 19.9741 4.33821 19.894 4.30238 19.8059C4.26655 19.7177 4.24874 19.6233 4.25 19.5281V11.625C4.25 9.33751 5.1587 7.14371 6.77621 5.5262C8.39371 3.9087 10.5875 3 12.875 3V3C14.0077 3 15.1292 3.22309 16.1756 3.65654C17.2221 4.08999 18.1729 4.7253 18.9738 5.5262C19.7747 6.32711 20.41 7.27792 20.8435 8.32436C21.2769 9.37079 21.5 10.4923 21.5 11.625V11.625C21.5 12.7577 21.2769 13.8792 20.8435 14.9256C20.41 15.9721 19.7747 16.9229 18.9738 17.7238C18.1729 18.5247 17.2221 19.16 16.1756 19.5935C15.1292 20.0269 14.0077 20.25 12.875 20.25V20.25Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.875 13.125C13.4963 13.125 14 12.6213 14 12C14 11.3787 13.4963 10.875 12.875 10.875C12.2537 10.875 11.75 11.3787 11.75 12C11.75 12.6213 12.2537 13.125 12.875 13.125Z"
          fill={color}
        />
        <Path
          d="M8.375 13.125C8.99632 13.125 9.5 12.6213 9.5 12C9.5 11.3787 8.99632 10.875 8.375 10.875C7.75368 10.875 7.25 11.3787 7.25 12C7.25 12.6213 7.75368 13.125 8.375 13.125Z"
          fill={color}
        />
        <Path
          d="M17.375 13.125C17.9963 13.125 18.5 12.6213 18.5 12C18.5 11.3787 17.9963 10.875 17.375 10.875C16.7537 10.875 16.25 11.3787 16.25 12C16.25 12.6213 16.7537 13.125 17.375 13.125Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_19157_29506">
          <Rect
            width={widthLize(width)}
            height={widthLize(height)}
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconComment;
