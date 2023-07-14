import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as _ from 'lodash';
import type {AlertContent} from './types';
import {
  Box,
  Text,
  TouchRippleSingle,
  fontSizeLine,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import Animated, {
  WithSpringConfig,
  useSharedValue,
  withSpring,
  interpolate,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {DIMENSION} from '@src/common/dimension';

interface IProps {
  value: AlertContent;
  onClose?: (id: number) => void;
}

const BoxAnimated = Animated.createAnimatedComponent(Box);
const springConfig: Omit<WithSpringConfig, ''> = {
  damping: 4,
  mass: 0.1,
  stiffness: 65,
  overshootClamping: true,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const Alert: React.FC<IProps> = ({value, onClose}) => {
  const {id, title, content, actions, cancelable = true} = value;
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
            springConfig,
          ),
        },
      ],
    };
  }, []);
  const open = useCallback(() => {
    setActive(true);
  }, []);
  const close = useCallback(
    (callback?: () => void) => {
      setActive(false);
      if (typeof onClose === 'function') {
        onClose(id);
      }
      if (typeof callback === 'function') {
        callback();
      }
    },
    [id, onClose],
  );
  useEffect(() => {
    open();
  }, [open]);
  useEffect(() => {
    opacity.value = withTiming(active ? 1 : 0, {
      duration: 200,
      easing: Easing.ease,
    });
  }, [active, opacity]);
  const renderButtonAction = (text: string) => {
    return (
      <Box
        middle
        center
        paddingVertical={heightLize(10)}
        marginHorizontal={widthLize(10)}>
        <Text numberOfLines={1} size={16} color="#FFF" weight="normal">
          {text}
        </Text>
      </Box>
    );
  };

  const renderAction = () => {
    if (actions && _.isEmpty(actions)) {
      return (
        <Box middle center>
          <TouchRippleSingle onPress={() => close()}>
            <Box
              radius={10}
              color="#D21F3C"
              paddingVertical={heightLize(10)}
              paddingHorizontal={widthLize(40)}>
              <Text numberOfLines={1} size={16} color="#FFF" weight="normal">
                {'OK'}
              </Text>
            </Box>
          </TouchRippleSingle>
        </Box>
      );
    }

    if (actions?.length === 1) {
      return (
        <Box middle center>
          <TouchRippleSingle
            onPress={() => close(actions && actions[0]?.onPress)}>
            <Box
              radius={10}
              color="#D21F3C"
              paddingVertical={heightLize(10)}
              paddingHorizontal={widthLize(40)}>
              <Text numberOfLines={1} size={16} color="#FFF" weight="normal">
                {actions[0]?.text || ''}
              </Text>
            </Box>
          </TouchRippleSingle>
        </Box>
      );
    }

    if (
      actions &&
      actions.length >= 2 &&
      actions[0] &&
      actions[1] &&
      actions[0]?.text?.length < 13 &&
      actions[1]?.text?.length < 13
    ) {
      return (
        <Box row>
          <Box flex={1} radius={10} color="#D21F3C">
            <TouchRippleSingle onPress={() => close(actions[0].onPress)}>
              {renderButtonAction(actions[0].text)}
            </TouchRippleSingle>
          </Box>
          <Box width={widthLize(10)} />
          <Box flex={1} radius={10} color="#D21F3C">
            <TouchRippleSingle onPress={() => close(actions[1].onPress)}>
              {renderButtonAction(actions[1].text)}
            </TouchRippleSingle>
          </Box>
        </Box>
      );
    }
    return <Box />;
  };
  return (
    <BoxAnimated
      pointerEvents="box-none"
      width={DIMENSION.width}
      height={DIMENSION.height}
      style={[StyleSheet.absoluteFillObject, overlayStyled]}>
      <TouchableWithoutFeedback onPress={() => cancelable && close()}>
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
          color={'#141414'}
          radius={10}
          padding={(widthLize(40), heightLize(20))}>
          <Text
            textAlign="center"
            weight="800"
            size={fontSizeLine(16)}
            lineHeight={fontSizeLine(30)}
            color={'#fff'}>
            {title}
          </Text>
          <Box height={heightLize(20)} />
          <Text
            textAlign="center"
            size={fontSizeLine(16)}
            lineHeight={fontSizeLine(20)}
            color={'#fff'}>
            {content}
          </Text>
          <Box height={heightLize(20)} />
          {renderAction()}
        </Box>
      </BoxAnimated>
    </BoxAnimated>
  );
};

export default Alert;
