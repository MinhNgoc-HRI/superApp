import {StyleSheet} from 'react-native';
import React, {forwardRef, memo} from 'react';
import {Box, Text, fontSizeLine, heightLize, widthLize} from 'pmn-rn-component';
import {ScrollView} from 'react-native-gesture-handler';
import LivestreamCard from '@src/components/LivestreamCard';
export type ILiveStreams = {};
export type OLiveStreams = {};
const LiveStreams = forwardRef<OLiveStreams, ILiveStreams>(() => {
  return (
    <>
      <Box paddingLeft={widthLize(12)}>
        <Box
          row
          justifyContent="space-between"
          center
          padding={[heightLize(12), heightLize(12), 0, widthLize(12)]}>
          <Text
            size={fontSizeLine(20)}
            lineHeight={fontSizeLine(24)}
            weight="800"
            color="#fff">
            Hot livestream
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
        contentContainerStyle={styles.contentContainerStyle}>
        <LivestreamCard />
        <LivestreamCard />
        <LivestreamCard />
      </ScrollView>
    </>
  );
});
export default memo(LiveStreams);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: widthLize(12),
    paddingBottom: heightLize(12),
  },
});
