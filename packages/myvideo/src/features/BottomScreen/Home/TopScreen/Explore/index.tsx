import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {TopStackScreenProp} from '@src/navigation/types';
import {Box, heightLize, widthLize, Text, fontSizeLine} from 'pmn-rn-component';
import {ScrollView, RefreshControl} from 'react-native-gesture-handler';
import VideoCard from '@src/components/VideoCard';
import {StyleSheet} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ShortCard from '@src/components/ShortCard';

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
        <Box>
          <VideoCard />
          <Box paddingLeft={widthLize(12)}>
            <Box
              row
              justifyContent="space-between"
              center
              padding={[widthLize(12), heightLize(12)]}>
              <Text
                size={fontSizeLine(20)}
                lineHeight={fontSizeLine(24)}
                weight="800"
                color="#fff">
                Video ngắn
              </Text>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(20)}
                color="#D21F3C">
                Xem thêm
              </Text>
            </Box>
          </Box>
          <ScrollView
            horizontal
            contentContainerStyle={styles.contentContainerHorizo}>
            <ShortCard />
            <ShortCard />
            <ShortCard />
            <ShortCard />
            <ShortCard />
            <ShortCard />
          </ScrollView>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </Box>
      </ScrollView>
    </Box>
  );
});

export default memo(Explore);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  contentContainerHorizo: {
    flexGrow: 1,
    paddingLeft: widthLize(12),
    paddingBottom: heightLize(12),
  },
});
