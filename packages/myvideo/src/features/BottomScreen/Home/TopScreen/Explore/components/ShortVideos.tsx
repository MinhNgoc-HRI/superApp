import {StyleSheet} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {Box, heightLize, widthLize, fontSizeLine, Text} from 'pmn-rn-component';
import {ScrollView} from 'react-native-gesture-handler';
import ShortCard from '@src/components/ShortCard';
export type IShortVideos = {};
export type OShortVideos = {};
const ShortVideos = forwardRef<OShortVideos, IShortVideos>((_props, ref) => {
  useImperativeHandle(ref, () => ({}));
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
        contentContainerStyle={styles.contentContainerStyle}>
        <ShortCard />
        <ShortCard />
        <ShortCard />
        <ShortCard />
        <ShortCard />
        <ShortCard />
      </ScrollView>
    </>
  );
});

export default memo(ShortVideos);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: widthLize(12),
    paddingBottom: heightLize(12),
  },
});
