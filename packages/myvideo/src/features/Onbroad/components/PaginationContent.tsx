import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Box, Text} from 'pmn-rn-component';
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
    const {width} = DIMENSION;
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <BoxAnimated width={DIMENSION.width} middle center style={animStyle}>
      <Text size={16}>{value.title}</Text>
    </BoxAnimated>
  );
};
