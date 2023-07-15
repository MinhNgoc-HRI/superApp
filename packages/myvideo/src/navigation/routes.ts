import {
  BottomStackParamList,
  MainStackParamList,
  TopStackParamList,
} from './types';

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
export const routerTopTab: Entries<TopStackParamList> = {
  Suggest: 'Suggest',
  Start: 'Start',
  Entertainment: 'Entertainment',
  Music: 'Music',
  TVShow: 'TVShow',
  Sport: 'Sport',
  Explore: 'Explore',
};
