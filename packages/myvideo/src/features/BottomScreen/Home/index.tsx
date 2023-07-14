import {Text, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
interface IHome extends BottomStackScreenProps<'Home'> {}
type OHome = {};
const Home = forwardRef<OHome, IHome>(() => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
});

export default memo(Home);
