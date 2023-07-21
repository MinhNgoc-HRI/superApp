import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {TopStackParamList} from '@src/navigation/types';
import {TabNavigationState} from '@react-navigation/native';
import {routerTopTab} from '@src/navigation/routes';
import {
  Box,
  Text,
  fontSizeLine,
  TouchRippleSingle,
  widthLize,
  heightLize,
} from 'pmn-rn-component';
import {Animated} from 'react-native';

const BoxAnimated = Animated.createAnimatedComponent(Box);
export type IButtonTopBar = {
  index: number;
  routes: TabNavigationState<TopStackParamList>['routes'];
  data: TabNavigationState<TopStackParamList>['routes'][number];
  position: Animated.AnimatedInterpolation<number>;
  onPress: (
    key: TabNavigationState<TopStackParamList>['routes'][number]['key'],
  ) => void;
};
export type OButtonTopBar = {};
const ButtonTopBar = forwardRef<OButtonTopBar, IButtonTopBar>((props, ref) => {
  const {name, key} = props.data;
  const {onPress, position, routes, index} = props;

  useImperativeHandle(ref, () => ({}));
  const input = routes.map((_, i) => i);
  const output = routes.map((_, i) => (i === index ? 1 : 0));
  const opacity = position.interpolate({
    inputRange: input,
    outputRange: output,
    extrapolate: 'clamp',
  });
  const convertTabName = useCallback(
    (n: TabNavigationState<TopStackParamList>['routes'][number]['name']) => {
      switch (n) {
        case routerTopTab.Explore:
          return '';
        case routerTopTab.Suggest:
          return 'Đề xuất';
        case routerTopTab.Star:
          return 'Sao';
        case routerTopTab.Entertainment:
          return 'Giải trí';
        case routerTopTab.Music:
          return 'Nhạc';
        case routerTopTab.TVShow:
          return 'TV Show';
        case routerTopTab.Sport:
          return 'Thể thao';
        case routerTopTab.Suggest:
          return 'Gợi ý';
        default:
          return '';
      }
    },
    [],
  );

  if (name === routerTopTab.Explore) {
    return null;
  }
  return (
    <TouchRippleSingle onPress={() => onPress(key)}>
      <BoxAnimated
        middle
        center
        paddingVertical={heightLize(12)}
        width={widthLize(70)}>
        <Text
          weight="700"
          size={fontSizeLine(14)}
          lineHeight={fontSizeLine(20)}
          color="#FFF"
          marginLeft={widthLize(4)}>
          {convertTabName(name)}
        </Text>
        <BoxAnimated
          position="absolute"
          bottom={0}
          height={heightLize(3)}
          width={widthLize(70)}
          style={{opacity: opacity}}
          color="#D21F3C"
        />
      </BoxAnimated>
    </TouchRippleSingle>
  );
});

export default ButtonTopBar;
