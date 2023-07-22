import {StyleSheet} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {
  Box,
  Text,
  Thumb,
  TouchRippleSingle,
  fontSizeLine,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import IconThreeDots from '@src/assets/icons/IconThreeDots';
export type IVideoCard = {
  title?: string;
  singer?: string;
  imgUrl?: string;
  avatarUrl?: string;
  views?: string;
  duration?: string;
  uploadTime?: string;
};
export type OVideoCard = {};
const VideoCard = forwardRef<OVideoCard, IVideoCard>((props, ref) => {
  const {
    title = 'NGƯỜI YÊU TÔI LẠNH LÙNG SẮT ĐÁ | MR. SIRO x THIỆN NỮ 2 | OFF',
    singer = 'Mr.Siro',
    views = '1.2 Tr lượt xem',
    duration = '03:53',
    uploadTime = '1 giờ trước',
  } = props;
  useImperativeHandle(ref, () => ({}));
  return (
    <Box>
      <Box>
        <Thumb
          source={require('../../assets/images/imgVideo.png')}
          resizeMode="cover"
          style={styles.imgStyle}
        />
        <Box
          position="absolute"
          bottom={heightLize(10)}
          right={widthLize(16)}
          padding={[widthLize(4), heightLize(2)]}
          color="rgba(0,0,0,0.6)"
          radius={4}>
          <Text
            color="#FFF"
            numberOfLines={1}
            size={fontSizeLine(12)}
            lineHeight={fontSizeLine(16)}
            weight="600">
            {duration}
          </Text>
        </Box>
      </Box>
      <Box row padding={(widthLize(12), heightLize(12))}>
        <Thumb
          source={require('../../assets/images/imgAvatar.png')}
          resizeMode="cover"
          style={styles.avatarStyle}
        />

        <Box flex={1} paddingHorizontal={widthLize(12)}>
          <Text
            numberOfLines={2}
            size={fontSizeLine(18)}
            lineHeight={fontSizeLine(20)}
            weight="700"
            color="#FFF">
            {title}
          </Text>
          <Text
            marginTop={heightLize(4)}
            numberOfLines={1}
            size={fontSizeLine(12)}
            lineHeight={fontSizeLine(16)}
            weight="600"
            color="#B0B0B8">
            {`${singer} . ${views} . ${uploadTime}`}
          </Text>
        </Box>
        <Box>
          <TouchRippleSingle>
            <IconThreeDots />
          </TouchRippleSingle>
        </Box>
      </Box>
    </Box>
  );
});

export default memo(VideoCard);

const styles = StyleSheet.create({
  imgStyle: {
    height: heightLize(200),
  },
  avatarStyle: {
    width: widthLize(32),
    height: widthLize(32),
    borderRadius: widthLize(32),
  },
});
