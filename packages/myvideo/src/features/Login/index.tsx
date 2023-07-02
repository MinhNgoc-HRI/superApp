import {Text, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import {RootStackScreenProps} from '@src/navigation/types';

interface ILogin extends RootStackScreenProps<'Login'> {}
type OLogin = {};
const Login = forwardRef<OLogin, ILogin>((_props, _ref) => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
});

export default memo(Login);
