import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {refNavigation} from './navigationHelper';
import {MainStackParamList} from './types';

const Navigator: React.FC<any> = () => {
  const linking: LinkingOptions<MainStackParamList> = {
    prefixes: ['myvideo://'],
    config: {
      screens: {
        Login: {
          path: 'login',
        },
      },
    },
  };
  return (
    <NavigationContainer ref={refNavigation} linking={linking} independent>
      <MainStack />
    </NavigationContainer>
  );
};
export default Navigator;
