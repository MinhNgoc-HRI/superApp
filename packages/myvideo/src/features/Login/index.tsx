import React, {forwardRef, memo, useMemo, useRef, useState} from 'react';
import {RootStackScreenProps} from '@src/navigation/types';
import DefaultActionBar from '@src/components/DefaultActionBar';
import {
  Box,
  Text,
  TouchRippleSingle,
  fontSizeLine,
  getOffset,
  heightLize,
  widthLize,
} from 'pmn-rn-component';
import IconLogo from '@src/assets/icons/IconLogo';
import InputNG from '@src/components/Input';
import Icon4G from '@src/assets/icons/Icon4G';
import IconGoogle from '@src/assets/icons/IconGoogle';
import IconFB from '@src/assets/icons/IconFB';
import IconApple from '@src/assets/icons/IconApple';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import defaultStyles from '@src/common/styles';
import PopupTerm, {OPopupTerm} from '@src/features/Login/components/PopupTerm';
import {TERM_DATA} from '@src/mock';
import PopupSendOTP, {OPopupSendOTP} from './components/PopupSendOTP';
interface ILogin extends RootStackScreenProps<'Login'> {}
type OLogin = {};
const Login = forwardRef<OLogin, ILogin>((_props, _ref) => {
  const refPopupTerm = useRef<OPopupTerm>(null);
  const refPopupSendOTP = useRef<OPopupSendOTP>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const FormValidate = useMemo(() => {
    return form.email && form.password;
  }, [form.email, form.password]);
  return (
    <Box flex={1} color={'#000'}>
      <DefaultActionBar background="transparent" colorLeftIcon="#fff" />
      <Box
        paddingHorizontal={widthLize(32)}
        flex={1}
        paddingBottom={getOffset().bottom_without_margin}>
        <KeyboardAwareScrollView
          contentContainerStyle={defaultStyles.flex_1}
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <Box
            middle
            center
            marginTop={heightLize(20)}
            marginBottom={heightLize(46)}>
            <IconLogo />
            <Text
              marginTop={heightLize(10)}
              size={fontSizeLine(20)}
              lineHeight={fontSizeLine(24)}
              weight={'700'}
              color={'#fff'}>
              Đăng nhập
            </Text>
            <Text
              size={fontSizeLine(20)}
              lineHeight={fontSizeLine(24)}
              weight={'700'}
              color={'#fff'}>
              Myvideo và trải nghiệm
            </Text>
          </Box>
          <Box>
            <InputNG
              value={form.email}
              onChangeText={e => setForm(state => ({...state, email: e}))}
              size={fontSizeLine(14)}
              placeholderTextColor={'#8A8B93'}
              placeholder={'Tên đăng nhập / SDT'}
              color={'#FFF'}
            />
            <Box height={heightLize(16)} />
            <InputNG
              value={form.password}
              onChangeText={e => setForm(state => ({...state, password: e}))}
              size={fontSizeLine(14)}
              placeholderTextColor={'#8A8B93'}
              placeholder={'Mật khẩu'}
              color={'#FFF'}
              secureTextEntry
            />
            <Box height={heightLize(16)} />
          </Box>
          <Box>
            <TouchRippleSingle disabled={!FormValidate} delay={2000}>
              <Box
                middle
                center
                paddingVertical={heightLize(10)}
                radius={10}
                color={FormValidate ? '#D21E3C' : '#272728'}>
                <Text
                  size={fontSizeLine(16)}
                  lineHeight={fontSizeLine(21)}
                  weight={'700'}
                  color={FormValidate ? '#fff' : '#47474D'}>
                  Đăng nhập
                </Text>
              </Box>
            </TouchRippleSingle>
          </Box>
          <Box center marginVertical={heightLize(24)}>
            <Text
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(24)}
              color={'#B0B0B8'}>
              hoặc đăng nhập bằng
            </Text>
          </Box>
          <Box row justifyContent="space-around" middle>
            <TouchRippleSingle>
              <Icon4G />
            </TouchRippleSingle>
            <TouchRippleSingle>
              <IconGoogle />
            </TouchRippleSingle>
            <TouchRippleSingle>
              <IconFB />
            </TouchRippleSingle>
            <TouchRippleSingle>
              <IconApple />
            </TouchRippleSingle>
          </Box>
          <Box row middle center flex={1}>
            <Text
              onPress={() => refPopupSendOTP?.current?.open()}
              weight={'700'}
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              color={'#D21F3C'}>
              Đăng ký /
            </Text>
            <Text
              onPress={() => refPopupSendOTP?.current?.open()}
              weight={'700'}
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(20)}
              color={'#D21F3C'}>
              Quên mật khẩu
            </Text>
          </Box>
          <Box center middle>
            <Text
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(18)}
              color={'#656874'}>
              Bằng việc đăng nhập, bạn đã đồng ý với
            </Text>
            <Text
              onPress={() => refPopupTerm.current?.open()}
              size={fontSizeLine(14)}
              lineHeight={fontSizeLine(18)}
              color={'#FFD130'}>
              Điều khoản sử dụng của Myvideo
            </Text>
          </Box>
        </KeyboardAwareScrollView>
      </Box>
      <PopupTerm
        ref={refPopupTerm}
        title={TERM_DATA.title}
        content={TERM_DATA.content}
      />
      <PopupSendOTP
        ref={refPopupSendOTP}
        title={'Đăng ký  /  Quên mật khẩu'}
        content={
          'Tính năng này hiện tại dành cho thuê bao Viettel, để đăng ký/lấy mật khẩu bạn vui lòng soạn:'
        }
        sms={'MK gửi 9062'}
      />
    </Box>
  );
});

export default memo(Login);
