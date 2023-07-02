import {MainStackParamList} from './types';

type Entries<T> = {
  [K in keyof T]: K;
};

export const routerMain: Entries<MainStackParamList> = {
  Onbroad: 'Onbroad',
  Login: 'Login',
  Home: 'Home',
  NotFound: 'NotFound',
  PostDetails: 'PostDetails',
};
