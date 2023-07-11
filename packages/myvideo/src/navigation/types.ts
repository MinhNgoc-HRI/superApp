import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
export type BottomTabParamList = {
  Profile: {
    name: string;
  };
  Gift: undefined;
};
export type MainStackParamList = {
  Onbroad: undefined;
  Login: undefined;
  Home: undefined;
  PostDetails: undefined;
  NotFound: undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};

export type RoutesType = MainStackParamList;
export type RootStackScreenProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;
export type BottomTabNGScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof MainStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
