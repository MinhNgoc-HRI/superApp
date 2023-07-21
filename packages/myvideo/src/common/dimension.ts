import {Dimensions} from 'react-native';
import {OBottomTabBar} from '@src/features/BottomScreen/components/BottomTabBar';
import {createRef} from 'react';

export const refBottomTab = createRef<OBottomTabBar>();
export const DIMENSION = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  getHeightBotomTab: () => refBottomTab?.current?.getBottomTabBarHeight(),
};
