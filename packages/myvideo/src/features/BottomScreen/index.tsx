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
const Stack = createBottomTabNavigator<BottomStackParamList>();
interface IBottomScreen extends MainStackScreenProps<'BottomTab'> {}
type OBottomScreen = {};
const BottomScreen = forwardRef<OBottomScreen, IBottomScreen>(() => {
  return (
    <Stack.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Stack.Screen name={routerBottomTab.Home} component={Home} />
      <Stack.Screen name={routerBottomTab.Short} component={Short} />
    </Stack.Navigator>
  );
});

export default memo(BottomScreen);
