import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Text,
  RefView,
  TouchSingle,
  fontSizeLine,
  getOffset,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import React from 'react';
import {StatusBar, StyleSheet, TextStyle} from 'react-native';
import HeaderTitle from '../Header/HeaderTitle';
import IconArrowLeft from '@src/assets/icons/IconArrowLeft';

interface IProps {
  title?: string;
  titleColor?: string;
  isIconLeftRounded?: boolean;
  leftIconType?: 'IconClose' | 'back' | 'none' | 'wheel';
  sizeLeftIcon?: number;
  colorLeftIcon?: string;
  rightIconType?:
    | 'search'
    | 'IconMessage'
    | 'none'
    | 'threeDots'
    | 'addPeople'
    | 'heart'
    | 'filter'
    | 'share'
    | 'heartBold'
    | 'filterTick'
    | 'trash'
    | 'history';
  sizeRightIcon?: number;
  rightText?: string;
  rightTextStyle?: TextStyle;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  disabled?: boolean;
  barStyle?: 'light-content' | 'dark-content' | 'default';
  background?: string;
  colorRightIcon?: string;
  titleLeft?: string;
  backgroundLeftIcon?: string;
  titleLeftColor?: string;
  sizeTitle?: number;
  textRightUnderLine?: boolean;
  textRightColor?: string;
}

const DefaultActionBar = React.forwardRef<RefView, IProps>(
  (props: IProps, ref) => {
    const {
      title,
      titleColor = '#000',
      isIconLeftRounded = false,
      leftIconType = 'back',
      sizeLeftIcon = 24,

      colorLeftIcon = '#000',
      rightIconType,
      rightText = '',
      rightTextStyle,
      onPressLeft,
      onPressRight,
      disabled,
      barStyle = 'dark-content',
      background = '#fff',
      // sizeRightIcon = 24,
      // colorRightIcon = '#000',
      titleLeft,
      // backgroundLeftIcon = '#fff',
      titleLeftColor = '#000',
      sizeTitle = 24,
      textRightUnderLine = true,
      textRightColor,
    } = props;

    const navigation = useNavigation();
    const renderLeftIcon = () => {
      switch (leftIconType) {
        case 'back':
          return (
            <IconArrowLeft
              width={widthLize(sizeLeftIcon)}
              height={heightLize(sizeLeftIcon)}
              color={colorLeftIcon}
            />
          );
        case 'none':
        default:
          return null;
      }
    };

    const renderRightIcon = () => {
      switch (rightIconType) {
        default:
          return null;
      }
    };
    const handleLeft = () => {
      if (onPressLeft) {
        return onPressLeft();
      }
      return navigation.goBack();
    };

    const handleRight = () => {
      if (onPressRight) {
        onPressRight();
      }
    };

    return (
      <Box style={{backgroundColor: background}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        <Box
          ref={ref}
          paddingTop={getOffset().top}
          row
          width="100%"
          {...props}
          center
          middle
          paddingHorizontal={heightLize(16)}
          justifyContent="space-between">
          <Box flex={0.2}>
            {!titleLeft ? (
              <TouchSingle
                disabled={leftIconType === 'none'}
                onPress={handleLeft}>
                {leftIconType === 'none' ? null : (
                  <Box
                    color={isIconLeftRounded ? '#ffffff' : 'transparent'}
                    width={widthLize(40)}
                    height={heightLize(40)}
                    middle
                    center
                    radius={isIconLeftRounded ? 40 : 0}>
                    {renderLeftIcon()}
                  </Box>
                )}
              </TouchSingle>
            ) : (
              <HeaderTitle
                size={fontSizeLine(sizeTitle)}
                title={titleLeft}
                titleColor={titleLeftColor}
              />
            )}
          </Box>

          <Box middle flex={1}>
            <Text
              size={fontSizeLine(16)}
              lineHeight={fontSizeLine(24)}
              color={titleColor}
              weight="600"
              textAlign="center"
              alignItems="stretch">
              {title || ''}
            </Text>
          </Box>
          <Box flex={0.2}>
            <TouchSingle disabled={disabled} onPressIn={handleRight}>
              {rightIconType === undefined ? (
                <Box color="transparent">
                  <Text
                    size={fontSizeLine(16)}
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    weight="600"
                    color={textRightColor || undefined}
                    textDecorationLine={
                      textRightUnderLine ? 'underline' : 'none'
                    }
                    style={[rightTextStyle, disabled && styles.txtDisabled]}>
                    {rightText}
                  </Text>
                </Box>
              ) : (
                <Box padding={[widthLize(16), heightLize(16)]} center>
                  {renderRightIcon()}
                </Box>
              )}
            </TouchSingle>
          </Box>
        </Box>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  txtDisabled: {
    opacity: 0.5,
  },
});

export default DefaultActionBar;
