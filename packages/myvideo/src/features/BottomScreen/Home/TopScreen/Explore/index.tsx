import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {TopStackScreenProp} from '@src/navigation/types';
import {Box, heightLize} from 'pmn-rn-component';
import {ScrollView, RefreshControl} from 'react-native-gesture-handler';
import VideoCard from '@src/components/VideoCard';
import {StyleSheet} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ShortVideos from './components/ShortVideos';
import LiveStreams from './components/LiveStreams';

interface IExplore extends TopStackScreenProp<'Explore'> {}
type OExplore = {};
const Explore = forwardRef<OExplore, IExplore>((props, ref) => {
  const tabBarHeight = useBottomTabBarHeight();
  useImperativeHandle(ref, () => ({}));
  return (
    <Box flex={1} color="#1C1E28" paddingTop={heightLize(12)}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#FFF"
            colors={['#FFF']}
            refreshing={false}
          />
        }
        contentContainerStyle={[
          styles.contentContainerStyle,
          {paddingBottom: tabBarHeight},
        ]}>
        <VideoCard />
        <ShortVideos />
        <VideoCard />
        <LiveStreams />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </ScrollView>
    </Box>
  );
});

export default memo(Explore);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
