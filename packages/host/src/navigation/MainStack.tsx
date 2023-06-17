import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from '@src/navigation/types';
import {routerMain} from '@src/navigation/routes';
import Home from '@src/features/Home';

const Stack = createStackNavigator<MainStackParamList>();
const MainStack: React.FC<any> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
        gestureEnabled: false,
      }}>
      <Stack.Screen name={routerMain.Home} component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;
