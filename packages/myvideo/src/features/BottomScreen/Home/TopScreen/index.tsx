import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopStackParamList} from '@src/navigation/types';
import {routerTopTab} from '@src/navigation/routes';
import Explore from '@src/features/BottomScreen/Home/TopScreen/Explore';
import TopTabBar from './components/TopTabBar';
import Suggest from '@src/features/BottomScreen/Home/TopScreen/Suggest';
import Star from '@src/features/BottomScreen/Home/TopScreen/Star';
import Entertainment from '@src/features/BottomScreen/Home/TopScreen/Entertainment';
import Music from '@src/features/BottomScreen/Home/TopScreen/Music';
import TVShow from '@src/features/BottomScreen/Home/TopScreen/TVShow';
import Sport from '@src/features/BottomScreen/Home/TopScreen/Sport';
const Tab = createMaterialTopTabNavigator<TopStackParamList>();
const TopScreem = () => {
  return (
    <Tab.Navigator
      initialRouteName={routerTopTab.Explore}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen name={routerTopTab.Explore} component={Explore} />
      <Tab.Screen name={routerTopTab.Suggest} component={Suggest} />
      <Tab.Screen name={routerTopTab.Star} component={Star} />
      <Tab.Screen name={routerTopTab.Entertainment} component={Entertainment} />
      <Tab.Screen name={routerTopTab.Music} component={Music} />
      <Tab.Screen name={routerTopTab.TVShow} component={TVShow} />
      <Tab.Screen name={routerTopTab.Sport} component={Sport} />
    </Tab.Navigator>
  );
};

export default memo(TopScreem);
