import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {MainStackScreenProps} from '@src/navigation/types';
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
import Input from '@src/components/Input';
import {routerMain} from '@src/navigation/routes';

interface IAccountLink extends MainStackScreenProps<'AccountLink'> {}
type OAccountLink = {};
const AccountLink = forwardRef<OAccountLink, IAccountLink>((props, ref) => {
  const {navigation} = props;
  const [phone, setPhone] = useState<string>('');
  useImperativeHandle(ref, () => ({}));
  const getOTPHandle = useCallback(() => {
    if (phone) {
      navigation.navigate(routerMain.OTP, {
        phone,
      });
    }
  }, [navigation, phone]);
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
          Vui lòng cập nhật số điện thoại của bạn để xác nhận tài khoản
        </Text>
        <Box marginVertical={heightLize(20)}>
          <Input
            value={phone}
            onChangeText={e => setPhone(e)}
            size={fontSizeLine(16)}
            keyboardType="number-pad"
            color="#FFF"
          />
        </Box>
        <TouchRippleSingle onPress={getOTPHandle}>
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
              Lấy mã OTP
            </Text>
          </Box>
        </TouchRippleSingle>
      </Box>
    </Box>
  );
});

export default AccountLink;
