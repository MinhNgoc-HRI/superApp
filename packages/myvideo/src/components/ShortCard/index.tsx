import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {
  Box,
  Text,
  Thumb,
  fontSizeLine,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
export type IShortVideo = {};
export type OShortVideo = {};
const ShortVideo = forwardRef<OShortVideo, IShortVideo>((props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <Thumb
      source={require('../../assets/images/imgShort.png')}
      resizeMode="cover"
      style={styles.img}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', '#000000']}>
        <Box
          paddingBottom={heightLize(16)}
          alignItems="center"
          justifyContent="flex-end"
          width={widthLize(135)}
          height={heightLize(230)}>
          <Box>
            <Text
              numberOfLines={2}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(16)}
              weight="700"
              color="#fff">
              Chuẩn không cần chỉnh #trend
            </Text>
            <Text
              marginTop={heightLize(2)}
              numberOfLines={2}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(16)}
              color="#81838E">
              79K lượt xem
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </Thumb>
  );
});

export default memo(ShortVideo);

const styles = StyleSheet.create({
  img: {
    width: widthLize(135),
    height: heightLize(230),
    borderRadius: 8,
    marginRight: widthLize(8),
  },
  linearGradient: {
    flex: 1,
  },
});
