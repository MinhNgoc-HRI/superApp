import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Box, Text, fontSizeLine, heightLize, widthLize} from 'pmn-rn-component';
import {OnbroadType} from '@src/mock';
import {DIMENSION} from '@src/common/dimension';

const BoxAnimated = Animated.createAnimatedComponent(Box);
export const PaginationContent: React.FC<{
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
  value: OnbroadType;
}> = props => {
  const {index, length, animValue, value} = props;
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [0, 1, 0];
    let transformRange = [40, 0, 40];
    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [0, 1, 0];
    }
    return {
      opacity: interpolate(
        animValue?.value,
        inputRange,
        outputRange,
        Extrapolate.EXTEND,
      ),

      transform: [
        {
          translateY: withSpring(
            interpolate(
              animValue?.value,
              inputRange,
              transformRange,
              Extrapolate.CLAMP,
            ),
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <BoxAnimated
      width={DIMENSION.width}
      middle
      center
      style={animStyle}
      padding={[widthLize(52), heightLize(32)]}
      position={'absolute'}>
      <Text
        textAlign="center"
        size={fontSizeLine(24)}
        lineHeight={fontSizeLine(24)}
        weight="700"
        color="#fff">
        {value.title}
      </Text>
      <Text
        textAlign="center"
        size={fontSizeLine(16)}
        lineHeight={fontSizeLine(21)}
        weight="500"
        color="#fff"
        marginTop={heightLize(24)}>
        {value.description}
      </Text>
    </BoxAnimated>
  );
};
