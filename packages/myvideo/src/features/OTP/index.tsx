import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import {RootStackScreenProps} from '@src/navigation/types';
import {
  Box,
  heightLize,
  widthLize,
  Text,
  fontSizeLine,
  TouchRippleSingle,
} from 'pmn-rn-component';
import DefaultActionBar from '@src/components/DefaultActionBar';
import ImgPhone from '@src/assets/icons/ImgPhone';
import CodeInputAnimated from '@src/components/CodeInputAnimated';
import {useCountdown} from '@src/hooks/useCountdown';
import {AlertProvider} from '@src/components/Alert';

interface IOTP extends RootStackScreenProps<'OTP'> {}
type OOTP = {};
const OTP = forwardRef<OOTP, IOTP>((props, ref) => {
  const {phone} = props.route.params;
  useImperativeHandle(ref, () => ({}));
  const [count, {startCountdown, resetCountdown}] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });
  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box flex={1} color="#000">
      <DefaultActionBar
        title="Liên kết tài khoản"
        leftIconType="back"
        background="transparent"
        titleColor="#fff"
        colorLeftIcon="#fff"
      />
      <Box center paddingVertical={heightLize(20)}>
        <ImgPhone />
      </Box>
      <Box paddingHorizontal={widthLize(30)}>
        <Text
          textAlign="center"
          size={fontSizeLine(14)}
          lineHeight={fontSizeLine(20)}
          color="#fff">
          {`Vui lòng nhập mã OTP đã được gửi về số điện thoại ${phone}`}
        </Text>
        <Box marginVertical={heightLize(20)}>
          <CodeInputAnimated />
        </Box>
        <Text
          onPress={() => {
            resetCountdown();
            startCountdown();
          }}
          weight="700"
          textAlign="center"
          marginBottom={heightLize(20)}
          size={fontSizeLine(14)}
          lineHeight={fontSizeLine(20)}
          color="#fff">
          {`Gửi lại OTP ${count ? `(${count}s)` : ''} `}
        </Text>
        <TouchRippleSingle
          onPress={() =>
            AlertProvider.show({
              title: 'Alert',
              content: 'Message',
              // cancelable: false,
              actions: [
                // {
                //   text: 'OK',
                //   onPress: () => {},
                // },
                // {
                //   text: 'Cancel',
                //   onPress: () => {},
                // },
              ],
            })
          }>
          <Box
            middle
            center
            radius={10}
            color="#D21F3C"
            paddingVertical={heightLize(10)}>
            <Text
              weight="800"
              size={fontSizeLine(16)}
              lineHeight={fontSizeLine(20)}
              color="#FFF">
              Xác nhận
            </Text>
          </Box>
        </TouchRippleSingle>
      </Box>
    </Box>
  );
});

export default OTP;
