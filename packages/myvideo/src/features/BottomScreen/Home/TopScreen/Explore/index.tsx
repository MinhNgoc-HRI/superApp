import {Text, View} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {TopStackScreenProp} from '@src/navigation/types';
interface IExplore extends TopStackScreenProp<'Explore'> {}
type OExplore = {};
const Explore = forwardRef<OExplore, IExplore>((props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
});

export default memo(Explore);
