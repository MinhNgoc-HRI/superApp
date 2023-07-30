import {widthLize} from 'pmn-rn-component';
import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconDownload = ({width = 24, height = 24, color = '#B0B0B8'}: Props) => {
  return (
    <Svg width={widthLize(width)} height={widthLize(height)} fill="none">
      <G clip-path="url(#clip0_19157_29523)">
        <Path
          d="M8.5625 10.3125L12.5 14.25L16.4375 10.3125"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.5 3.75V14.25"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21.5 14L21.5 18C21.5 18.5304 21.2893 19.0391 20.9142 19.4142C20.5391 19.7893 20.0304 20 19.5 20L5.5 20C4.96957 20 4.46086 19.7893 4.08579 19.4142C3.71071 19.0391 3.5 18.5304 3.5 18L3.5 14"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_19157_29523">
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

export default IconDownload;
