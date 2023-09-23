import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
import {Box, Text, fontSizeLine, getOffset, widthLize} from 'pmn-rn-component';
import ShortVideo from '@src/components/ShortVideo';
import IconSearch from '@src/assets/icons/IconSearch';
import {DIMENSION} from '@src/common/dimension';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
const {width} = DIMENSION;
interface IShort extends BottomStackScreenProps<'Short'> {}
type OShort = {};
const Short = forwardRef<OShort, IShort>((_props, ref) => {
  const scrollViewRef = useRef<ScrollView>(null);
  useImperativeHandle(ref, () => ({}));
  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    scrollViewRef.current?.scrollTo({
      y: Math.round(contentOffsetY / scrollViewHeight) * scrollViewHeight,
      animated: true,
    });
  };

  return (
    <Box color="#000" flex={1}>
      <ScrollView ref={scrollViewRef} onScrollEndDrag={onScrollEndDrag}>
        <ShortVideo />
        <ShortVideo />
        <ShortVideo />
        <ShortVideo />
      </ScrollView>
      <Box
        position="absolute"
        width={width}
        paddingTop={getOffset().top_without_margin + 10}>
        <Box row middle>
          <Box flex={1} alignItems="flex-end" paddingHorizontal={widthLize(16)}>
            <Text
              size={fontSizeLine(16)}
              lineHeight={fontSizeLine(21)}
              weight="800"
              color="#FFF">
              Dành cho bạn
            </Text>
          </Box>
          <Box color="#E3E4E5" width={1} />
          <Box
            row
            flex={1}
            justifyContent="space-between"
            paddingHorizontal={widthLize(16)}>
            <Text
              size={fontSizeLine(16)}
              lineHeight={fontSizeLine(21)}
              weight="800"
              color="#B0B0B8">
              Theo dõi
            </Text>
            <IconSearch />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default memo(Short);
