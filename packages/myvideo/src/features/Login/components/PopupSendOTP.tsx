import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Box,
  Text,
  TouchRippleSingle,
  fontSizeLine,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import {Portal} from 'react-native-portalize';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  interpolateColor,
  withSpring,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import {DIMENSION} from '@src/common/dimension';
import defaultStyles from '@src/common/styles';
const BoxAnimated = Animated.createAnimatedComponent(Box);
export type IPopupSendOTP = {
  title: string;
  content: string;
  sms: string;
  onPress?: () => void;
};
export type OPopupSendOTP = {
  open: () => void;
  close: () => void;
  getStatus: () => boolean;
};
const PopupSendOTP = forwardRef<OPopupSendOTP, IPopupSendOTP>(
  (props, refPopupSendOTP) => {
    const {title, content, onPress, sms} = props;
    const opacity = useSharedValue(0);
    const [active, setActive] = useState<boolean>(false);
    const overlayStyled = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          opacity.value,
          [0, 1],
          ['transparent', 'rgba(0,0,0,0.6)'],
        ),
      };
    }, []);
    const containerStyled = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: interpolate(opacity.value, [0, 0.8, 1], [0, 1, 1]),
          },
          {
            translateY: withSpring(
              interpolate(opacity.value, [0, 0.6, 1], [-180, -20, 0]),
              {
                damping: 20,
                stiffness: 200,
              },
            ),
          },
        ],
      };
    }, []);
    const open = useCallback(() => {
      setActive(true);
    }, []);
    const close = useCallback(() => {
      setActive(false);
    }, []);
    const getStatus = useCallback(() => {
      return active;
    }, [active]);
    useEffect(() => {
      opacity.value = withTiming(active ? 1 : 0, {
        duration: 400,
        easing: Easing.ease,
      });
    }, [active, opacity]);
    useImperativeHandle(
      refPopupSendOTP,
      () => ({
        open,
        close,
        getStatus,
      }),
      [close, getStatus, open],
    );
    return (
      <Portal>
        <BoxAnimated
          pointerEvents="box-none"
          width={DIMENSION.width}
          height={DIMENSION.height}
          style={overlayStyled}>
          <TouchableWithoutFeedback onPress={close}>
            <BoxAnimated
              width={DIMENSION.width}
              height={DIMENSION.height}
              style={[StyleSheet.absoluteFillObject, containerStyled]}
            />
          </TouchableWithoutFeedback>
          <BoxAnimated
            pointerEvents="box-none"
            width={DIMENSION.width}
            height={DIMENSION.height}
            middle
            center
            style={[StyleSheet.absoluteFillObject, containerStyled]}>
            <Box
              width={DIMENSION.width * 0.92}
              //   height={DIMENSION.height * 0.8}
              color={'#141414'}
              radius={10}>
              <Text
                paddingVertical={heightLize(16)}
                textAlign="center"
                weight="800"
                size={fontSizeLine(16)}
                lineHeight={fontSizeLine(40)}
                color={'#fff'}>
                {title}
              </Text>
              <Text
                marginBottom={heightLize(16)}
                paddingHorizontal={widthLize(30)}
                textAlign="center"
                size={fontSizeLine(16)}
                lineHeight={fontSizeLine(20)}
                color={'#fff'}>
                {content}
              </Text>
              <Text
                marginBottom={heightLize(16)}
                paddingHorizontal={widthLize(30)}
                textAlign="center"
                weight="800"
                size={fontSizeLine(18)}
                lineHeight={fontSizeLine(24)}
                color={'#D1213C'}>
                {sms}
              </Text>
              <Box
                row
                paddingHorizontal={widthLize(28)}
                paddingBottom={heightLize(24)}>
                <TouchRippleSingle
                  onPress={close}
                  touchProps={{
                    style: defaultStyles.flex_1,
                  }}>
                  <Box
                    // flex={1}
                    color={'#272728'}
                    radius={10}
                    paddingVertical={heightLize(10)}
                    middle
                    center>
                    <Text
                      textAlign="center"
                      weight="800"
                      size={fontSizeLine(16)}
                      lineHeight={fontSizeLine(21)}
                      color={'#FFF'}>
                      Huỷ
                    </Text>
                  </Box>
                </TouchRippleSingle>
                <Box width={widthLize(10)} />
                <TouchRippleSingle
                  onPress={onPress}
                  touchProps={{
                    style: defaultStyles.flex_1,
                  }}>
                  <Box
                    // flex={1}
                    color={'#D21F3C'}
                    radius={10}
                    paddingVertical={heightLize(10)}
                    middle
                    center>
                    <Text
                      weight="800"
                      size={fontSizeLine(16)}
                      lineHeight={fontSizeLine(21)}
                      color={'#FFF'}>
                      Soạn tin nhắn
                    </Text>
                  </Box>
                </TouchRippleSingle>
              </Box>
            </Box>
          </BoxAnimated>
        </BoxAnimated>
      </Portal>
    );
  },
);

export default memo(PopupSendOTP);
