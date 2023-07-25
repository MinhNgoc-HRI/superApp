import LottieView from 'lottie-react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {clamp} from 'react-native-awesome-slider/src/utils';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {springConfig, videoInfo, VIDEO_MIN_HEIGHT} from './utils';
import {palette} from '../ReAnimatedPlayer/palette';
import {DIMENSION} from '@src/common/dimension';
import {
  PlayerContext,
  setPlayerPaused,
  setPlayerPoint,
} from '@src/store/player';
import ReAnimatedPlayer, {VideoPlayerRef} from '../ReAnimatedPlayer';
import {
  Text,
  heightLize,
  fontSizeLine,
  Thumb,
  widthLize,
  Box,
} from 'pmn-rn-component';
import IconClose from '@src/assets/icons/IconClose';
import {BottomTabContext} from '@src/store/bottomTab';
const BoxAnimated = Animated.createAnimatedComponent(Box);
const {height, isIos, width} = DIMENSION;
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const sliderTranslateY = 6;
const VIDEO_DEFAULT_HEIGHT = width * (9 / 16);
/* android tùy loại mới work..đéo hiểu kiểu gì   */
const StatusBarHeight = isIos
  ? 0
  : StatusBar?.currentHeight
  ? StatusBar?.currentHeight - 5
  : 5;

export const Player = ({
  videoTranslateY,
}: {
  videoTranslateY: Animated.SharedValue<number>;
}) => {
  const insets = useSafeAreaInsets();
  const insetsRefs = useRef(insets);
  const {store: storeBT} = useContext(BottomTabContext);
  const btheight = useMemo(
    /* +5 để thêm khoảng trống giữa video khi ở snapshot(1) và bottom tab   */
    () => storeBT?.heightBottom + 5 || 0,
    [storeBT?.heightBottom],
  );
  const {store, dispatch} = useContext(PlayerContext);
  const DISMISS_POINT = height - btheight;
  const SNAP_POINT = [
    0,
    height + StatusBarHeight - VIDEO_MIN_HEIGHT - btheight,
  ];
  const diasbled = Boolean(store.snapPoint > SNAP_POINT[0]);
  const paused = Boolean(store.paused || store.snapPoint === -1);

  const fullViewHeight = height - VIDEO_DEFAULT_HEIGHT - insets.top;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const snapPoints = [fullViewHeight, height - insets.top];
  const isTapPaused = useRef(paused);

  const sheetTranslationY = useSharedValue(0);
  const panTranslationY = useSharedValue(0);
  const videoScale = useSharedValue(1);
  const videoTransY = useSharedValue(0);

  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const videoHeight = useSharedValue(VIDEO_DEFAULT_HEIGHT);
  const videoWidth = useSharedValue(width);
  const isFullScreen = useSharedValue(false);
  const panIsVertical = useSharedValue(false);
  const snapPointIndex = useSharedValue(store.snapPoint);

  const pageStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;
    return {
      transform: [
        {
          translateY: clamp(y, 0, height - btheight),
        },
      ],
      backgroundColor: isFullScreen.value ? '#000' : 'transparent',
    };
  }, [panTranslationY, sheetTranslationY]);

  const getVideoContainerStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;
    return {
      backgroundColor: isFullScreen.value ? '#000' : 'rgb(33, 33, 33)',
      opacity: interpolate(y, [SNAP_POINT[1], DISMISS_POINT], [1, 0]),
    };
  }, [panTranslationY, sheetTranslationY]);

  const customAnimationStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;

    const targetHeight = videoHeight.value * ((height - y) / height);

    let targetWidth = videoWidth.value;

    if (targetHeight < VIDEO_MIN_HEIGHT) {
      const widthScale = clamp((height - y) / y, 0, 1);
      targetWidth = videoWidth.value * widthScale;
    }

    return {
      transform: [
        {
          scale: videoScale.value,
        },
        {
          translateY: videoTransY.value,
        },
      ],
      height: isFullScreen.value
        ? width
        : clamp(targetHeight, 67.5, VIDEO_DEFAULT_HEIGHT),
      width: isFullScreen.value
        ? height - insetsRefs.current?.top - insetsRefs.current?.bottom
        : clamp(targetWidth, 120, width),
    };
  }, [panTranslationY, sheetTranslationY]);
  const getContentStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;
    return {
      opacity: interpolate(
        y,
        [VIDEO_MIN_HEIGHT, height - VIDEO_DEFAULT_HEIGHT],
        [1, 0],
      ),
      backgroundColor: interpolateColor(
        y,
        [VIDEO_MIN_HEIGHT, height - VIDEO_DEFAULT_HEIGHT],
        ['rgb(33, 33, 33)', 'transparent'],
      ),
    };
  }, [panTranslationY, sheetTranslationY]);
  const getBackdropStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;
    return {
      opacity: interpolate(
        y,
        [VIDEO_MIN_HEIGHT, height - VIDEO_DEFAULT_HEIGHT],
        [0, 1],
      ),
      backgroundColor: interpolateColor(
        y,
        [VIDEO_MIN_HEIGHT, height - VIDEO_DEFAULT_HEIGHT],
        ['rgb(33, 33, 33)', 'transparent'],
      ),
    };
  }, [panTranslationY, sheetTranslationY]);

  const getViewBackdropStyle = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;

    return {
      opacity: interpolate(y, [-100, height - VIDEO_DEFAULT_HEIGHT], [1, 0]),
    };
  }, [panTranslationY, sheetTranslationY]);

  const videoThumbInfo = useAnimatedStyle(() => {
    const y = panTranslationY.value + sheetTranslationY.value;

    const opacity = interpolate(
      y,
      [VIDEO_DEFAULT_HEIGHT + VIDEO_MIN_HEIGHT, height - VIDEO_MIN_HEIGHT],
      [0, 1],
    );
    return {
      opacity: isFullScreen.value ? 0 : opacity,
    };
  });
  const playAnimated = useDerivedValue(() => {
    return paused ? 0.5 : 0;
  }, [paused]);
  const playAnimatedProps = useAnimatedProps(() => {
    return {
      progress: withTiming(playAnimated.value),
    };
  });

  const translationBySnapPointIndex = useCallback(
    (snapIndex: number) => {
      'worklet';
      snapPointIndex.value = snapIndex;

      switch (snapIndex) {
        case -1:
          sheetTranslationY.value = videoTranslateY.value = withSpring(
            DISMISS_POINT,
            springConfig,
          );
          break;
        default:
          sheetTranslationY.value = videoTranslateY.value = withSpring(
            SNAP_POINT[snapIndex],
            springConfig,
          );
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DISMISS_POINT, SNAP_POINT],
  );

  useEffect(() => {
    translationBySnapPointIndex(store.snapPoint);
  }, [store.snapPoint, translationBySnapPointIndex]);

  const renderBubble = useCallback(() => {
    return (
      <Thumb
        source={require('../../assets/images/imgVideo.png')}
        style={styles.snapshot}
        resizeMode="cover"
      />
    );
  }, []);

  /**
   * on pan event
   */
  const onHandlerEndOnJS = (point: number) => {
    dispatch(setPlayerPoint(point));
  };
  const onStartOnJS = () => {
    videoPlayerRef.current?.toggleControlViewOpacity(false);
  };
  /**
   * Toggle player full screen state on <Video> component
   */
  const enterFullScreen = () => {
    videoPlayerRef.current?.toggleFullSreen(true);
  };

  const exitFullScreen = () => {
    videoPlayerRef.current?.toggleFullSreen(false);
  };
  const panGesture = Gesture.Pan()
    .onStart(({velocityY, velocityX}) => {
      panIsVertical.value = Math.abs(velocityY) > Math.abs(velocityX);
      runOnJS(onStartOnJS)();
    })
    .onUpdate(({translationY}) => {
      if (!panIsVertical.value) {
        return;
      }
      if (isFullScreen.value) {
        if (translationY > 0 && Math.abs(translationY) < 100) {
          videoScale.value = clamp(0.9, 1 - Math.abs(translationY) * 0.008, 1);
          videoTransY.value = translationY;
        }
      } else {
        if (
          translationY < 0 &&
          Math.abs(translationY) < 40 &&
          snapPointIndex.value === 0
        ) {
          videoScale.value = Math.abs(translationY) * 0.012 + 1;
        }
        panTranslationY.value = translationY;
        videoTranslateY.value = sheetTranslationY.value + translationY;
      }
    })
    .onEnd(({velocityY, translationY}, success) => {
      if (!panIsVertical.value) {
        return;
      }
      videoPlayerRef.current?.toggleControlViewOpacity(false);

      if (isFullScreen.value) {
        if (translationY >= 100) {
          runOnJS(exitFullScreen)();
        }
      } else {
        if (-translationY >= 40 && snapPointIndex.value === 0) {
          runOnJS(enterFullScreen)();
        }
        const dragToss = 0.2;
        const endOffsetY =
          sheetTranslationY.value +
          panTranslationY.value +
          velocityY * dragToss;

        if (
          !success &&
          endOffsetY < SNAP_POINT[SNAP_POINT.length - 1] &&
          store.snapPoint < endOffsetY
        ) {
          return;
        }
        let destSnapPoint = SNAP_POINT[0];
        let pointIndex = 0;

        if (snapPointIndex.value === 1 && translationY > 0) {
          const y =
            sheetTranslationY.value + panTranslationY.value + velocityY * 0.05;
          if (y > DISMISS_POINT - VIDEO_MIN_HEIGHT / 2) {
            destSnapPoint = DISMISS_POINT;
            pointIndex = -1;
          } else {
            destSnapPoint = SNAP_POINT[1];
            pointIndex = 1;
          }
        } else {
          pointIndex = SNAP_POINT.findIndex(point => {
            const distFromSnap = Math.abs(point - endOffsetY);
            return distFromSnap < Math.abs(destSnapPoint - endOffsetY);
          });

          if (pointIndex > -1) {
            destSnapPoint = SNAP_POINT[pointIndex];
          } else {
            pointIndex = 0;
          }
        }

        snapPointIndex.value = pointIndex;

        const finalSheetValue = sheetTranslationY.value + panTranslationY.value;
        panTranslationY.value = 0;

        sheetTranslationY.value = videoTranslateY.value = finalSheetValue;
        sheetTranslationY.value = videoTranslateY.value = withSpring(
          destSnapPoint,
          springConfig,
        );
        runOnJS(onHandlerEndOnJS)(pointIndex);
      }
      videoTransY.value = 0;
      videoScale.value = withTiming(1);
    });

  const foldVideo = () => {
    videoPlayerRef.current?.toggleControlViewOpacity(false);
    translationBySnapPointIndex(1);
    dispatch(setPlayerPoint(1));
  };
  return (
    <>
      <BoxAnimated
        pointerEvents={'none'}
        color={palette.B(1)}
        style={[styles.backdrop, getViewBackdropStyle]}
      />
      <BoxAnimated
        pointerEvents={store.snapPoint === 1 ? 'box-none' : 'auto'}
        padding={[insets.top, 0, insets.left, insets.right]}
        style={[styles.pageView, pageStyle]}>
        <GestureDetector gesture={panGesture}>
          <BoxAnimated style={getVideoContainerStyle}>
            <BoxAnimated style={[styles.videoThumbInfo, videoThumbInfo]}>
              <Box>
                <Text
                  size={12}
                  numberOfLines={1}
                  color="#FFF">{`${videoInfo.author} - ${videoInfo.title}`}</Text>
                <Text
                  marginTop={heightLize(2)}
                  numberOfLines={1}
                  size={fontSizeLine(12)}
                  lineHeight={fontSizeLine(16)}
                  color={palette.G4(1)}>
                  {videoInfo.author}
                </Text>
              </Box>

              <TouchableWithoutFeedback
                onPress={() => {
                  dispatch(setPlayerPaused(!paused));
                }}>
                <AnimatedLottieView
                  animatedProps={playAnimatedProps}
                  source={require('../../assets/json/lottie-play.json')}
                  style={styles.playIcon}
                />
              </TouchableWithoutFeedback>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(setPlayerPoint(-1));
                }}>
                <IconClose color="rgb(228, 228, 228)" width={30} height={30} />
              </TouchableOpacity>
            </BoxAnimated>
            <ReAnimatedPlayer
              source={{uri: videoInfo.source}}
              playWhenInactive
              posterResizeMode="cover"
              ignoreSilentSwitch="ignore"
              headerBarTitle={`${videoInfo.author} - ${videoInfo.title}`}
              onTapBack={foldVideo}
              paused={paused}
              onPausedChange={state => {
                dispatch(setPlayerPaused(state));
              }}
              onTapPause={state => {
                isTapPaused.current = state;
              }}
              onTapMore={() => {
                // optionsModalRef.current?.present();
              }}
              onToggleAutoPlay={(state: boolean) => {
                console.log(`onToggleAutoPlay state: ${state}`);
              }}
              videoDefaultHeight={VIDEO_DEFAULT_HEIGHT}
              ref={videoPlayerRef}
              sliderProps={{
                renderBubble: renderBubble,
                bubbleTranslateY: -60,
                bubbleWidth: 120,
                bubbleMaxWidth: 120,
                disable: diasbled,
              }}
              videoHeight={videoHeight}
              customAnimationStyle={customAnimationStyle}
              onCustomPanGesture={panGesture}
              style={{marginBottom: sliderTranslateY}}
              resizeMode="cover"
              isFullScreen={isFullScreen}
              disableControl={diasbled}
              onPostProgress={() => console.log('onProgress')}
              onPostSeek={() => console.log('onSeek')}
            />
          </BoxAnimated>
        </GestureDetector>
        <BoxAnimated color="rgb(33, 33, 33)" style={[styles.sliderTranslate]} />
        <BoxAnimated
          width={width}
          // color="rgb(33, 33, 33)"
          pointerEvents={store.snapPoint === 1 ? 'none' : 'auto'}
          style={[styles.flex1, getContentStyle]}>
          <ScrollView contentContainerStyle={styles.flex1}>
            <TouchableHighlight
              underlayColor={palette.G5(0.6)}
              onPress={() => {
                console.log('title press');
              }}>
              <Box style={[styles.titleContainer]}>
                <Text
                  color="#FFF"
                  size={fontSizeLine(16)}
                  lineHeight={fontSizeLine(24)}
                  style={
                    styles.title
                  }>{`${videoInfo.author} - ${videoInfo.title}`}</Text>
              </Box>
            </TouchableHighlight>
          </ScrollView>
          <BoxAnimated
            pointerEvents={store.snapPoint === SNAP_POINT[0] ? 'none' : 'none'}
            style={[styles.backdrop, getBackdropStyle]}
          />
        </BoxAnimated>
      </BoxAnimated>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    minHeight: height,
  },
  authors: {
    justifyContent: 'space-between',
    marginTop: 12,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },

  title: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    justifyContent: 'center',
    minHeight: 60,
  },
  pageView: {
    flex: 1,
    width: '100%',
    position: 'absolute',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -sliderTranslateY,
  },
  snapshot: {
    width: 120,
    height: 67,
  },
  sliderTranslate: {
    height: sliderTranslateY,
    marginTop: -sliderTranslateY,
    zIndex: -1,
    elevation: -1,
  },
  videoThumbInfo: {
    marginBottom: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    width: width - 160,
    bottom: 4,
  },
  playIcon: {
    height: 30,
    width: 30,
  },
  avatarStyle: {
    width: widthLize(32),
    height: widthLize(32),
    borderRadius: widthLize(32),
  },
});
