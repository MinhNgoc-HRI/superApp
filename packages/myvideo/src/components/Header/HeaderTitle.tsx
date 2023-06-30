import React from 'react';
import {Box, BoxProps, Text, fontSizeLine} from 'pmn-rn-component';

interface HeaderTitleProps extends BoxProps {
  center?: boolean;
  title: string;
  titleColor?: string;
  size?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
const HeaderTitle = (props: HeaderTitleProps) => {
  const {
    center = false,
    title,
    titleColor = '#000000',
    fontWeight = '700',
    size,
  } = props;
  return (
    <Box {...props} center={center}>
      <Text
        size={size || fontSizeLine(24)}
        lineHeight={fontSizeLine(36)}
        weight={fontWeight}
        color={titleColor}>
        {title}
      </Text>
    </Box>
  );
};

export default HeaderTitle;
