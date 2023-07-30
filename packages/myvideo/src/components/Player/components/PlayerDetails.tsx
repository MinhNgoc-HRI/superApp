import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {
  Box,
  Text,
  Thumb,
  TouchRippleSingle,
  fontSizeLine,
  getOffset,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import IconDropDown from '@src/assets/icons/IconDropDown';
import IconHeart from '@src/assets/icons/IconHeart';
import IconComment from '@src/assets/icons/IconComment';
import IconDownload from '@src/assets/icons/IconDownload';
import IconShare from '@src/assets/icons/IconShare';
import IconAddTo from '@src/assets/icons/IconAddTo';
import {StyleSheet} from 'react-native';
import Switch from '@src/components/Switch';
import VideoCard from '@src/components/VideoCard';

export type IPlayerDetails = {
  data?: {
    author: string;
    title: string;
    album: string;
    trending: {
      trendingDesc: string;
    };
  };
};
export type OPlayerDetails = {};
const PlayerDetails = forwardRef<OPlayerDetails, IPlayerDetails>(
  (props, ref) => {
    const {data} = props;
    useImperativeHandle(ref, () => ({}));
    return (
      <Box padding={[widthLize(12), heightLize(12)]}>
        <Box row justifyContent="space-between" center>
          <Text
            color="#D21F3C"
            size={fontSizeLine(12)}
            lineHeight={fontSizeLine(18)}
            textDecorationLine="underline"
            textDecorationColor="#D21F3C">
            #1 TRONG DANH MỤC ÂM NHẠC THỊNH HÀNH
          </Text>
          <IconDropDown />
        </Box>
        <Box paddingVertical={heightLize(8)}>
          <Text
            color="#FFF"
            size={fontSizeLine(16)}
            lineHeight={fontSizeLine(21)}
            weight="800">
            {data?.title}
          </Text>
        </Box>
        <Box paddingVertical={heightLize(8)}>
          <Text
            color="#B0B0B8"
            size={fontSizeLine(12)}
            lineHeight={fontSizeLine(18)}>
            750.492 lượt xem . 1 tháng 3, 2022
          </Text>
        </Box>
        <Box
          paddingVertical={heightLize(8)}
          row
          justifyContent="space-between"
          center>
          <Box middle center>
            <IconHeart />
            <Text
              marginTop={heightLize(8)}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(18)}
              color="#B0B0B8">
              123.504
            </Text>
          </Box>
          <Box middle center>
            <IconComment />
            <Text
              marginTop={heightLize(8)}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(18)}
              color="#B0B0B8">
              21.198
            </Text>
          </Box>
          <Box middle center>
            <IconAddTo />
            <Text
              marginTop={heightLize(8)}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(18)}
              color="#B0B0B8">
              Thêm vào
            </Text>
          </Box>
          <Box middle center>
            <IconDownload />
            <Text
              marginTop={heightLize(8)}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(18)}
              color="#B0B0B8">
              Tải xuống
            </Text>
          </Box>
          <Box middle center>
            <IconShare />
            <Text
              marginTop={heightLize(8)}
              size={fontSizeLine(12)}
              lineHeight={fontSizeLine(18)}
              color="#B0B0B8">
              Chia sẻ
            </Text>
          </Box>
        </Box>
        <Box
          row
          center
          justifyContent="space-between"
          paddingVertical={heightLize(16)}
          borderTopWidth={1}
          borderBottomColor="#47474D">
          <Box row center>
            <Box radius={48} middle center>
              <Thumb
                source={require('../../../assets/images/imgAvatar.png')}
                resizeMode="cover"
                style={styles.avatar}
              />
            </Box>
            <Box marginLeft={widthLize(8)}>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(20)}
                color="#FFF"
                weight="800">
                {data?.author}
              </Text>
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(18)}
                color="#81838E">
                3,92Tr người đăng ký
              </Text>
            </Box>
          </Box>
          <TouchRippleSingle
            touchProps={{
              style: styles.folowButton,
            }}>
            <Text
              padding={[widthLize(12), heightLize(6)]}
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              color="#FFF"
              backgroundColor="#272728">
              Đang theo dõi
            </Text>
          </TouchRippleSingle>
        </Box>
        <Box radius={12} color="#141414" marginVertical={heightLize(16)}>
          <Box
            center
            justifyContent="space-between"
            row
            padding={[widthLize(12), heightLize(10)]}>
            <Box row center>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(20)}
                color="#FFF"
                weight="700">
                Bình luận
              </Text>
              <Text
                paddingLeft={widthLize(4)}
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(18)}
                color="#8A8B93">
                12
              </Text>
            </Box>
            <IconDropDown />
          </Box>
          <Box padding={[widthLize(12), heightLize(10)]} row center>
            <Box radius={48} marginHorizontal={widthLize(16)}>
              <Thumb
                source={require('../../../assets/images/imgAvatarStream.png')}
                resizeMode="cover"
                style={styles.avatar}
              />
            </Box>
            <Box>
              <Box center row>
                <Text
                  size={fontSizeLine(12)}
                  lineHeight={fontSizeLine(16)}
                  weight="800"
                  color="#FFF"
                  numberOfLines={1}>
                  Mixi gaming
                </Text>
                <Text
                  size={fontSizeLine(12)}
                  lineHeight={fontSizeLine(16)}
                  color="#8A8B93">
                  . 1 tuần trước
                </Text>
              </Box>
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(16)}
                weight="800"
                color="#FFF"
                numberOfLines={1}>
                Rất mê giọng hát của anh ♥️♥️
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          padding={[widthLize(12), heightLize(6)]}
          row
          justifyContent="space-between">
          <Text
            size={fontSizeLine(20)}
            lineHeight={fontSizeLine(24)}
            color="#FFF"
            weight="800">
            Xem thêm
          </Text>
          <Box row center>
            <Text
              marginRight={widthLize(9)}
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              color="#8A8B93">
              Tự động phát
            </Text>
            <Switch />
          </Box>
        </Box>
        <Box
          paddingTop={heightLize(12)}
          paddingBottom={getOffset().bottom + 10}>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </Box>
      </Box>
    );
  },
);

export default memo(PlayerDetails);
const styles = StyleSheet.create({
  avatar: {
    width: widthLize(48),
    height: widthLize(48),
  },
  folowButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
