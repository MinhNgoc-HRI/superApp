import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from '@src/navigation/types';
import {routerMain} from '@src/navigation/routes';
import Onbroad from '@src/features/Onbroad';
import Login from '@src/features/Auth/Login';
import AccountLink from '@src/features/Auth/AccountLink';
import OTP from '@src/features/Auth/OTP';
import BottomScreen from '@src/features/BottomScreen';

const Stack = createStackNavigator<MainStackParamList>();
const MainStack: React.FC<any> = () => {
  return (
    <Stack.Navigator
      initialRouteName={routerMain.Onbroad}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
        gestureEnabled: false,
      }}>
      <Stack.Screen name={routerMain.Onbroad} component={Onbroad} />
      <Stack.Screen name={routerMain.Login} component={Login} />
      <Stack.Screen name={routerMain.AccountLink} component={AccountLink} />
      <Stack.Screen name={routerMain.OTP} component={OTP} />
      <Stack.Screen name={routerMain.BottomTab} component={BottomScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
