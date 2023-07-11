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
import {ScrollView} from 'react-native-gesture-handler';
const BoxAnimated = Animated.createAnimatedComponent(Box);
export type IPopupTerm = {
  title: string;
  content: string;
  onPress?: () => void;
};
export type OPopupTerm = {
  open: () => void;
  close: () => void;
  getStatus: () => boolean;
};
const PopupTerm = forwardRef<OPopupTerm, IPopupTerm>((props, refPopupTerm) => {
  const {title, content, onPress} = props;
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
      duration: 600,
      easing: Easing.ease,
    });
  }, [active, opacity]);
  useImperativeHandle(
    refPopupTerm,
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
            height={DIMENSION.height * 0.8}
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
            <ScrollView style={styles.contentContainerStyle}>
              <Text size={fontSizeLine(14)} color={'#000'}>
                {content}
              </Text>
            </ScrollView>
            <Box center middle marginTop={heightLize(24)}>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(18)}
                color={'#656874'}>
                Bằng việc đăng nhập, bạn đã đồng ý với
              </Text>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(18)}
                color={'#FFD130'}>
                Điều khoản sử dụng của Myvideo
              </Text>
            </Box>
            <Box margin={[widthLize(24), heightLize(24)]}>
              <TouchRippleSingle
                onPress={() => {
                  onPress?.();
                  close();
                }}>
                <Box
                  radius={10}
                  color={'#D21F3C'}
                  middle
                  center
                  paddingVertical={heightLize(10)}>
                  <Text
                    size={fontSizeLine(16)}
                    lineHeight={fontSizeLine(21)}
                    color={'#fff'}
                    weight="700">
                    Đồng ý
                  </Text>
                </Box>
              </TouchRippleSingle>
            </Box>
          </Box>
        </BoxAnimated>
      </BoxAnimated>
    </Portal>
  );
});

export default memo(PopupTerm);

const styles = StyleSheet.create({
  contentContainerStyle: {
    borderRadius: 10,
    flexGrow: 1,
    marginHorizontal: widthLize(12),
    paddingHorizontal: widthLize(12),
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
