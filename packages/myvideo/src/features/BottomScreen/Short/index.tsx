import {Text, View} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
import Player from '@src/components/Player';
interface IShort extends BottomStackScreenProps<'Short'> {}
type OShort = {};
const Short = forwardRef<OShort, IShort>((_props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <View>
      <Text>Short</Text>
      <Player />
    </View>
  );
});

export default memo(Short);
