import React, {forwardRef, memo, useCallback, useImperativeHandle} from 'react';
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
const TextAnimated = Animated.createAnimatedComponent(Text);
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
  const outputColor = routes.map((_, i) =>
    i === index ? 'rgba(255,255,255,1)' : 'rgba(176,176,187,1)',
  );
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
        <TextAnimated
          weight="700"
          size={fontSizeLine(14)}
          lineHeight={fontSizeLine(20)}
          marginLeft={widthLize(4)}
          style={{
            color: position.interpolate({
              inputRange: input,
              outputRange: outputColor,
            }),
          }}>
          {convertTabName(name)}
        </TextAnimated>
        <BoxAnimated
          position="absolute"
          bottom={0}
          height={heightLize(3)}
          width={widthLize(70)}
          style={{
            opacity: position.interpolate({
              inputRange: input,
              outputRange: output,
              extrapolate: 'clamp',
            }),
          }}
          color="#D21F3C"
        />
      </BoxAnimated>
    </TouchRippleSingle>
  );
});
export default memo(ButtonTopBar);
