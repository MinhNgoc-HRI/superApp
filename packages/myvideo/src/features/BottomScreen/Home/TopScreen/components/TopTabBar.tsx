import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {
  Box,
  Text,
  heightLize,
  widthLize,
  fontSizeLine,
  TouchRippleSingle,
} from 'pmn-rn-component';
import IconCompass from '@src/assets/icons/IconCompass';
import {ScrollView} from 'react-native-gesture-handler';
import {TopStackParamList} from '@src/navigation/types';
import {TabNavigationState} from '@react-navigation/native';
import {
  useSharedValue,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import ButtonTopBar from './ButtonTopBar';
import {routerTopTab} from '@src/navigation/routes';

interface ITopTabBar extends MaterialTopTabBarProps {}
type OTopTabBar = {};
const TopTabBar = forwardRef<OTopTabBar, ITopTabBar>((props, ref) => {
  const {position, state, jumpTo} = props;
  const {routes, index} = state;
  const x = useSharedValue(0);
  const refScrollView = useRef<ScrollView>(null);
  useImperativeHandle(ref, () => ({}));
  const jumbToTab = useCallback(
    (key: TabNavigationState<TopStackParamList>['routes'][number]['key']) => {
      jumpTo(key);
    },
    [jumpTo],
  );
  // GestureEvent<PanGestureHandlerEventPayload>,
  useEffect(() => {
    if (index) {
      refScrollView?.current?.scrollTo({
        x: widthLize(70) * (index - 1),
        y: 0,
        animated: true,
      });
    }
  }, [index]);
  const gestureHandler = useAnimatedGestureHandler<
    any,
    {
      startX: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: evt => {
      x.value = withDecay({
        velocity: evt.velocityX,
        clamp: [0, 200],
      });
    },
  });
  return (
    <Box row middle marginLeft={widthLize(12)}>
      <TouchRippleSingle
        onPress={() =>
          jumbToTab(
            routes.find(e => e.name === routerTopTab.Explore)?.key || '',
          )
        }>
        <Box row paddingVertical={heightLize(12)} paddingRight={widthLize(10)}>
          <IconCompass />
          <Text
            weight="700"
            size={fontSizeLine(14)}
            lineHeight={fontSizeLine(20)}
            color="#B0B0B8"
            marginLeft={widthLize(4)}>
            Khám phá
          </Text>
        </Box>
      </TouchRippleSingle>
      <ScrollView
        ref={refScrollView}
        horizontal
        onGestureEvent={gestureHandler}
        contentContainerStyle={{
          paddingLeft: widthLize(10),
        }}>
        {routes?.map((e, i) => (
          <ButtonTopBar
            key={e.key}
            index={i}
            routes={routes as TabNavigationState<TopStackParamList>['routes']}
            data={e as TabNavigationState<TopStackParamList>['routes'][number]}
            position={position}
            onPress={jumbToTab}
          />
        ))}
      </ScrollView>
    </Box>
  );
});

export default memo(TopTabBar);
