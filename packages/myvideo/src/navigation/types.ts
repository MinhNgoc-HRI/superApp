import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
export type BottomStackParamList = {
  Home: undefined;
  Short: undefined;
  Livestream: undefined;
  Favorite: undefined;
  Profile: undefined;
};
export type MainStackParamList = {
  Onbroad: undefined;
  Login: undefined;
  AccountLink: undefined;
  OTP: {
    phone: string;
  };
  NotFound: undefined;
  BottomTab: NavigatorScreenParams<BottomStackParamList>;
};

export type RoutesType = MainStackParamList;
export type MainStackScreenProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;
export type BottomStackScreenProps<T extends keyof BottomStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomStackParamList, T>,
    MainStackScreenProps<keyof MainStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
