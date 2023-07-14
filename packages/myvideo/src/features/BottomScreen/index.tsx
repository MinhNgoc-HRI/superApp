import React, {forwardRef, memo} from 'react';
import {
  BottomStackParamList,
  MainStackScreenProps,
} from '@src/navigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routerBottomTab} from '@src/navigation/routes';
import Home from '@src/features/BottomScreen/Home';
import BottomTabBar from '@src/features/BottomScreen/components/BottomTabBar';
import Short from '@src/features/BottomScreen/Short';
import Livestream from '@src/features/BottomScreen/Livestream';
import Favorite from '@src/features/BottomScreen/Favorite';
import Profile from '@src/features/BottomScreen/Profile';
const Stack = createBottomTabNavigator<BottomStackParamList>();
interface IBottomScreen extends MainStackScreenProps<'BottomTab'> {}
type OBottomScreen = {};
const BottomScreen = forwardRef<OBottomScreen, IBottomScreen>(() => {
  return (
    <Stack.Navigator
      initialRouteName={routerBottomTab.Home}
      detachInactiveScreens
      screenOptions={{
        lazy: true,
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Stack.Screen name={routerBottomTab.Home} component={Home} />
      <Stack.Screen name={routerBottomTab.Short} component={Short} />
      <Stack.Screen name={routerBottomTab.Livestream} component={Livestream} />
      <Stack.Screen name={routerBottomTab.Favorite} component={Favorite} />
      <Stack.Screen name={routerBottomTab.Profile} component={Profile} />
    </Stack.Navigator>
  );
});

export default memo(BottomScreen);
