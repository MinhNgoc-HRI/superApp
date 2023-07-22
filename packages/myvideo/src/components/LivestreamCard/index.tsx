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
import LinearGradient from 'react-native-linear-gradient';
import defaultStyles from '@src/common/styles';
import IconLive from '@src/assets/icons/IconLive';
import IconEye from '@src/assets/icons/IconEye';
import IconThreeDots from '@src/assets/icons/IconThreeDots';
export type ILivestreamCard = {
  title?: string;
  singer?: string;
  imgUrl?: string;
  avatarUrl?: string;
  views?: string;
  uploadTime?: string;
};
export type OLivestreamCard = {};
const LivestreamCard = forwardRef<OLivestreamCard, ILivestreamCard>(
  (props, ref) => {
    const {
      title = 'LIVE RUNETERRA | DUO CÙNG VỚI GM AME - KHÔNG LÊN MA',
      singer = 'Hot stream',
      views = '527 lượt xem',
      uploadTime = '10 phút trước',
    } = props;
    useImperativeHandle(ref, () => ({}));
    return (
      <Box width={widthLize(323)} marginRight={widthLize(8)}>
        <Thumb
          source={require('../../assets/images/imgStream.png')}
          resizeMode="cover"
          style={styles.img}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['transparent', '#000000']}
            style={defaultStyles.flex_1}>
            <Box row padding={[widthLize(8), heightLize(8)]}>
              <Box
                row
                center
                color="#D21F3C"
                radius={6}
                padding={[widthLize(8), heightLize(8)]}
                marginRight={widthLize(8)}>
                <IconLive color="#FFF" />
                <Text
                  marginLeft={widthLize(4)}
                  size={fontSizeLine(12)}
                  lineHeight={fontSizeLine(16)}
                  weight="800"
                  color="#FFF">
                  TRỰC TIẾP
                </Text>
              </Box>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 5}}
                colors={['rgba(0,0,0,.6)', 'transparent']}>
                <Box
                  row
                  center
                  color="rgba(0,0,0,.6)"
                  radius={6}
                  padding={[widthLize(8), heightLize(8)]}>
                  <IconEye color="#FFF" />
                  <Text
                    marginLeft={widthLize(4)}
                    size={fontSizeLine(12)}
                    lineHeight={fontSizeLine(16)}
                    weight="800"
                    color="#FFF">
                    {views}
                  </Text>
                </Box>
              </LinearGradient>
            </Box>
          </LinearGradient>
        </Thumb>

        <Box row padding={(widthLize(12), heightLize(12))}>
          <Thumb
            source={require('../../assets/images/imgAvatarStream.png')}
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
              {`${singer} . ${uploadTime}`}
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
  },
);

export default memo(LivestreamCard);

const styles = StyleSheet.create({
  img: {
    width: widthLize(323),
    height: heightLize(188),
    borderRadius: 6,
  },
  avatarStyle: {
    width: widthLize(32),
    height: widthLize(32),
    borderRadius: widthLize(32),
  },
});
