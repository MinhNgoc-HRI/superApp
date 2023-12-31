import type {StackScreenProps} from '@react-navigation/stack';

export type MainStackParamList = {
  Home: undefined;
  PostDetails: undefined;
  NotFound: undefined;
};

export type RoutesType = MainStackParamList;
export type RootStackScreenProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
