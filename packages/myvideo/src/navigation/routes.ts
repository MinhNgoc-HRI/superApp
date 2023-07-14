import {BottomStackParamList, MainStackParamList} from './types';

type Entries<T> = {
  [K in keyof T]: K;
};

export const routerMain: Entries<MainStackParamList> = {
  Onbroad: 'Onbroad',
  Login: 'Login',
  AccountLink: 'AccountLink',
  OTP: 'OTP',
  NotFound: 'NotFound',
  BottomTab: 'BottomTab',
};
export const routerBottomTab: Entries<BottomStackParamList> = {
  Home: 'Home',
  Short: 'Short',
  Livestream: 'Livestream',
  Profile: 'Profile',
  Favorite: 'Favorite',
};
