import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
export type TopStackParamList = {
  Explore: undefined;
  Suggest: undefined;
  Start: undefined;
  Entertainment: undefined;
  Music: undefined;
  TVShow: undefined;
  Sport: undefined;
};
export type BottomStackParamList = {
  Home: NavigatorScreenParams<TopStackParamList>;
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
export type TopStackScreenProp<T extends keyof TopStackParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<TopStackParamList, T>,
    CompositeScreenProps<
      BottomStackScreenProps<keyof BottomStackParamList>,
      MainStackScreenProps<keyof MainStackParamList>
    >
  >;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
