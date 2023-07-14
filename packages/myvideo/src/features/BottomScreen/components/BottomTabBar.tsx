import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Box,
  heightLize,
  Text,
  fontSizeLine,
  getOffset,
  TouchRippleSingle,
} from 'pmn-rn-component';
import {routerBottomTab} from '@src/navigation/routes';
import IconHome from '@src/assets/icons/IconHome';
import IconShort from '@src/assets/icons/IconShort';
import {StyleSheet} from 'react-native';
import {BottomStackParamList} from '@src/navigation/types';
import {NavigationState} from '@react-navigation/native';

interface IBottomTabBar extends BottomTabBarProps {}
type OBottomTabBar = {};
const BottomTabBar = forwardRef<OBottomTabBar, IBottomTabBar>((props, ref) => {
  const {navigation} = props;
  const {index, routes} = props.state;

  useImperativeHandle(ref, () => ({}));
  const renderIcon = useCallback((name: string, isActive: boolean) => {
    switch (name) {
      case routerBottomTab.Home:
        return <IconHome color={isActive ? '#D21F3C' : '#B0B0B8'} />;
      case routerBottomTab.Short:
        return <IconShort color={isActive ? '#D21F3C' : '#B0B0B8'} />;
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
          <Box>
            {renderIcon(item.name, isActive)}
            <Text
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
      row
      paddingBottom={getOffset().bottom_without_margin}
      color={'rgba(16,16,16,0.8)'}>
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
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightLize(10),
  },
});
