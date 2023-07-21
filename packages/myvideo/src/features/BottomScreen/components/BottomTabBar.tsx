import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Box,
  heightLize,
  Text,
  fontSizeLine,
  getOffset,
  TouchRippleSingle,
  widthLize,
} from 'pmn-rn-component';
import {routerBottomTab} from '@src/navigation/routes';
import IconHome from '@src/assets/icons/IconHome';
import IconShort from '@src/assets/icons/IconShort';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {BottomStackParamList} from '@src/navigation/types';
import {NavigationState} from '@react-navigation/native';
import IconLive from '@src/assets/icons/IconLive';
import IconHeart from '@src/assets/icons/IconHeart';
import IconProfile from '@src/assets/icons/IconProfile';
import {useAnimatedRef} from 'react-native-reanimated';

interface IBottomTabBar extends BottomTabBarProps {}
export type OBottomTabBar = {
  getBottomTabBarHeight: () => number;
};
const BottomTabBar = forwardRef<OBottomTabBar, IBottomTabBar>((props, ref) => {
  const {navigation} = props;
  const {index, routes} = props.state;
  const [height, setHeight] = useState<number>(0);
  const aref = useAnimatedRef<View>();

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const {height: h} = event.nativeEvent.layout;
    setHeight(h);
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      getBottomTabBarHeight: () => height,
    }),
    [height],
  );
  const renderIcon = useCallback((name: string, isActive: boolean) => {
    switch (name) {
      case routerBottomTab.Home:
        return <IconHome color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      case routerBottomTab.Short:
        return <IconShort color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      case routerBottomTab.Livestream:
        return <IconLive color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      case routerBottomTab.Favorite:
        return <IconHeart color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      case routerBottomTab.Profile:
        return <IconProfile color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      default:
        return null;
    }
  }, []);
  const onPress = useCallback(
    (
      route: NavigationState<BottomStackParamList>['routes'][number],
      isFocused: boolean,
    ) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation],
  );
  const renderButton = useCallback(
    (
      item: NavigationState<BottomStackParamList>['routes'][number],
      isActive: boolean,
    ) => {
      return (
        <TouchRippleSingle
          key={item.key}
          touchProps={{style: styles.button}}
          onPress={() => onPress(item, isActive)}>
          <Box middle center>
            {renderIcon(item.name, isActive)}
            <Text
              textAlign="center"
              marginTop={heightLize(4)}
              size={fontSizeLine(10)}
              height={fontSizeLine(13)}
              color={isActive ? '#D21F3C' : '#B0B0B8'}
              weight="700">
              {item.name}
            </Text>
          </Box>
        </TouchRippleSingle>
      );
    },
    [onPress, renderIcon],
  );
  return (
    <Box
      ref={aref}
      onLayout={handleLayout}
      position="absolute"
      bottom={0}
      row
      paddingBottom={getOffset().bottom_without_margin}
      color={'rgba(16,16,16,0.8)'}
      style={styles.container}>
      {routes?.map((value, i) =>
        renderButton(
          value as NavigationState<BottomStackParamList>['routes'][number],
          i === index,
        ),
      )}
    </Box>
  );
});

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: widthLize(12),
    borderTopRightRadius: widthLize(12),
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightLize(10),
  },
});
