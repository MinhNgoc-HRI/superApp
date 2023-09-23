import {StyleSheet} from 'react-native';
import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useState,
} from 'react';
import {DIMENSION} from '@src/common/dimension';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {videoInfo} from '@src/components/Player/utils';
import {
  Box,
  Text,
  Thumb,
  TouchRippleSingle,
  fontSizeLine,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import LottieView from 'lottie-react-native';
import Animated, {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import TapControler from '@src/components/ReAnimatedPlayer/TapControler';
import {Slider, SliderThemeType} from 'react-native-awesome-slider';
import {BottomTabContext} from '@src/store/bottomTab';
import IconHeart from '@src/assets/icons/IconHeart';
import IconComment from '@src/assets/icons/IconComment';
import IconShare from '@src/assets/icons/IconShare';
import IconThreeDots from '@src/assets/icons/IconThreeDots';
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const BoxAnimated = Animated.createAnimatedComponent(Box);
const {width, height} = DIMENSION;
const controlAnimteConfig = {
  duration: 200,
};
export type IShortVideo = {
  showOnStart?: boolean;
  controlTimeout?: number;
  theme?: SliderThemeType;
};
export type OShortVideo = {};
const ShortVideo = forwardRef<OShortVideo, IShortVideo>((props, ref) => {
  const {
    showOnStart,
    controlTimeout = 2000,
    theme = {
      minimumTrackTintColor: 'rgba(234, 51, 35,1)',
      maximumTrackTintColor: '#BABABA',
      cacheTrackTintColor: '#FFF',
      bubbleBackgroundColor: '#000',
      disableMinTrackTintColor: 'rgba(234, 51, 35,1)',
    },
  } = props;
  const {store} = useContext(BottomTabContext);
  const [paused, setPaused] = useState<boolean>(true);
  const progress = useSharedValue(0);
  const max = useSharedValue(100);
  const min = useSharedValue(0);
  const controlViewOpacity = useSharedValue<number>(showOnStart ? 1 : 0);
  const playAnimated = useDerivedValue(() => {
    return paused ? 0.5 : 0;
  }, [paused]);

  const playAnimatedProps = useAnimatedProps(() => {
    return {
      progress: withTiming(playAnimated.value),
    };
  });
  const play = () => {
    setPaused(false);
  };

  const pause = () => {
    setPaused(true);
  };
  const togglePlayOnJS = () => {
    paused ? play() : pause();
  };

  const setControlTimeout = () => {
    'worklet';
    controlViewOpacity.value = withDelay(controlTimeout, withTiming(0));
  };
  const clearControlTimeout = () => {
    'worklet';
    cancelAnimation(controlViewOpacity);
  };
  const showControlAnimation = () => {
    'worklet';
    controlViewOpacity.value = withTiming(1, controlAnimteConfig);
    setControlTimeout();
  };
  const resetControlTimeout = () => {
    'worklet';
    clearControlTimeout();
    setControlTimeout();
  };
  const checkTapTakesEffect = () => {
    'worklet';
    resetControlTimeout();
    if (controlViewOpacity.value === 0) {
      showControlAnimation();
      return false;
    }
    return true;
  };
  const onPauseTapHandler = () => {
    'worklet';
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }
    runOnJS(togglePlayOnJS)();
  };
  const singleTapHandler = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      if (controlViewOpacity.value === 0) {
        controlViewOpacity.value = withTiming(1, controlAnimteConfig);
        setControlTimeout();
      } else {
        controlViewOpacity.value = withTiming(0, controlAnimteConfig);
      }
    }
  });
  const onProgress = (data: OnProgressData) => {
    const {currentTime: cTime} = data;
    progress.value = cTime;
  };
  const onLoad = (data: OnLoadData) => {
    max.value = data.duration;
  };
  const controlViewStyles = useAnimatedStyle(() => {
    return {
      opacity: controlViewOpacity.value,
    };
  });
  const contentViewStyles = useAnimatedStyle(() => {
    const opacity = interpolate(controlViewOpacity.value, [0, 1], [1, 0]);
    return {
      opacity: opacity,
      display: opacity ? 'flex' : 'none',
    };
  });
  const gesture = Gesture.Race(singleTapHandler);
  useImperativeHandle(ref, () => ({}), []);
  return (
    <Box width={width} height={height}>
      <Video
        paused={paused}
        source={{
          uri: videoInfo.source,
        }}
        style={styles.video}
        onProgress={onProgress}
        onLoad={onLoad}
        progressUpdateInterval={500}
      />
      <GestureDetector gesture={gesture}>
        <BoxAnimated
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          middle
          center
          style={controlViewStyles}>
          <Box padding={5} color="rgba(0,0,0,0.3)" middle center radius={48}>
            <TapControler onPress={onPauseTapHandler} style={styles.pause}>
              <AnimatedLottieView
                animatedProps={playAnimatedProps}
                source={require('../../assets/json/lottie-play.json')}
              />
            </TapControler>
          </Box>
        </BoxAnimated>
      </GestureDetector>
      <BoxAnimated
        position="absolute"
        left={0}
        right={0}
        bottom={store.heightBottom + heightLize(20)}
        style={controlViewStyles}>
        <Slider
          theme={theme}
          progress={progress}
          disable
          minimumValue={min}
          maximumValue={max}
          thumbWidth={0}
          sliderHeight={1}
        />
      </BoxAnimated>

      <BoxAnimated
        pointerEvents="box-none"
        position="absolute"
        left={0}
        right={0}
        bottom={store.heightBottom + heightLize(20)}
        style={contentViewStyles}>
        <Box
          row
          alignItems="flex-end"
          paddingHorizontal={widthLize(16)}
          pointerEvents="box-none">
          <Box flex={1}>
            <Text
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              color="#FFF">
              Như thế nào thì đẹp mọi người ơi #tinhot
            </Text>
          </Box>
          <Box>
            <Box middle center marginBottom={heightLize(12)}>
              <IconHeart color="#FFF" />
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(16)}
                color="#FFF">
                2k
              </Text>
            </Box>
            <Box middle center marginBottom={heightLize(12)}>
              <IconComment color="#FFF" />
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(16)}
                color="#FFF">
                12k
              </Text>
            </Box>
            <Box middle center marginBottom={heightLize(12)}>
              <IconShare color="#FFF" />
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(16)}
                color="#FFF">
                Chia sẻ
              </Text>
            </Box>
            <Box middle center marginBottom={heightLize(12)}>
              <IconThreeDots color="#FFF" />
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(16)}
                color="#FFF">
                Thêm
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          padding={[widthLize(14), heightLize(16)]}
          row
          justifyContent="space-between"
          center>
          <Box row>
            <Thumb
              source={require('../../assets/images/imgAvatar.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Box>
              <Text
                size={fontSizeLine(14)}
                lineHeight={fontSizeLine(20)}
                color="#FFF"
                weight="700">
                Hot beauty
              </Text>
              <Text
                size={fontSizeLine(12)}
                lineHeight={fontSizeLine(18)}
                color="#B0B0B8">
                79K người đăng ký
              </Text>
            </Box>
          </Box>
          <TouchRippleSingle
            touchProps={{
              style: styles.btnFollow,
            }}
            onPress={() => console.log('press')}>
            <Text
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              weight="700"
              color="#FFF">
              Theo dõi
            </Text>
          </TouchRippleSingle>
        </Box>
      </BoxAnimated>
    </Box>
  );
});

export default memo(ShortVideo);

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height,
  },
  pause: {
    width: widthLize(48),
    height: widthLize(48),
    overflow: 'hidden',
  },
  avatar: {
    width: widthLize(36),
    height: widthLize(36),
    borderRadius: 48,
    overflow: 'hidden',
    marginRight: widthLize(8),
  },
  btnFollow: {
    backgroundColor: '#D21F3C',
    borderRadius: 10,
    paddingHorizontal: widthLize(12),
    paddingVertical: heightLize(6),
    overflow: 'hidden',
  },
});
