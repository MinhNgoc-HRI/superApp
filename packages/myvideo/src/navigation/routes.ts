import {MainStackParamList} from './types';

type Entries<T> = {
  [K in keyof T]: K;
};

export const routerMain: Entries<MainStackParamList> = {
  Onbroad: 'Onbroad',
  Login: 'Login',
  Home: 'Home',
  AccountLink: 'AccountLink',
  OTP: 'OTP',
  NotFound: 'NotFound',
  PostDetails: 'PostDetails',
  BottomTab: 'BottomTab',
};
