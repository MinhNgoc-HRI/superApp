import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopStackParamList} from '@src/navigation/types';
import {routerTopTab} from '@src/navigation/routes';
import Explore from '@src/features/BottomScreen/Home/TopScreen/Explore';

const Tab = createMaterialTopTabNavigator<TopStackParamList>();
const TopScreem = () => {
  return (
    <Tab.Navigator initialRouteName={routerTopTab.Explore}>
      <Tab.Screen name={routerTopTab.Explore} component={Explore} />
    </Tab.Navigator>
  );
};

export default memo(TopScreem);
