import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Input,
  Box,
  ITextInputBaseProps,
  NumberOrString,
  widthLize,
  heightLize,
  TouchRippleSingle,
  RefInput,
} from 'pmn-rn-component';
import IconClose from '@src/assets/icons/IconClose';
import IconEye from '@src/assets/icons/IconEye';

export interface IInputNG extends ITextInputBaseProps {
  BorderRadius?: number;
  BorderColor?: string;
  BorderWidth?: number;
  ContentPadding?: NumberOrString | NumberOrString[];
  BgColor?: string;
}
export type OInputNG = {};

const InputNG = forwardRef<OInputNG, IInputNG>((props, ref) => {
  const {
    BorderRadius = 10,
    BorderColor = '#FFF',
    BorderWidth = 1,
    ContentPadding = [widthLize(16), heightLize(10)],
    BgColor = '#141414',
    onBlur,
    onFocus,
    secureTextEntry,
    onChangeText,
    ...rest
  } = props;
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const [textEntry, setTextEntry] = useState<boolean>(!!secureTextEntry);
  const refInput = useRef<RefInput>(null);
  const onBlurHandle = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsBlur(false);
      onBlur?.(e);
    },
    [onBlur],
  );
  const onFocusHandle = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsBlur(true);
      onFocus?.(e);
    },
    [onFocus],
  );
  const onChangeTextHandle = useCallback(() => {
    onChangeText?.('');
    refInput?.current?.clear();
  }, [onChangeText]);
  useImperativeHandle(ref, () => ({}));
  return (
    <Box
      padding={ContentPadding}
      radius={BorderRadius}
      borderColor={isBlur ? BorderColor : 'transparent'}
      borderWidth={BorderWidth}
      color={BgColor}
      onTouchStart={() => refInput?.current?.focus()}
      row>
      <Input
        ref={refInput}
        flex={1}
        padding={0}
        onBlur={onBlurHandle}
        onFocus={onFocusHandle}
        secureTextEntry={textEntry}
        onChangeText={onChangeText}
        {...rest}
      />
      {isBlur && (
        <>
          <Box width={widthLize(16)} />
          <TouchRippleSingle onPress={onChangeTextHandle}>
            <Box>
              <IconClose />
            </Box>
          </TouchRippleSingle>
        </>
      )}
      {isBlur && secureTextEntry && (
        <>
          <TouchRippleSingle onPress={() => setTextEntry(state => !state)}>
            <Box>
              <IconEye />
            </Box>
          </TouchRippleSingle>
        </>
      )}
    </Box>
  );
});

export default memo(InputNG);
