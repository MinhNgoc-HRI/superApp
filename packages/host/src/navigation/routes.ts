import {MainStackParamList} from './types';

type Entries<T> = {
  [K in keyof T]: K;
};

export const routerMain: Entries<MainStackParamList> = {
  Home: 'Home',
  NotFound: 'NotFound',
  PostDetails: 'PostDetails',
};
