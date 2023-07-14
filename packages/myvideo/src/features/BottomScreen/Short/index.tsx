import {Text, View} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
interface IShort extends BottomStackScreenProps<'Short'> {}
type OShort = {};
const Short = forwardRef<OShort, IShort>((_props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <View>
      <Text>Short</Text>
    </View>
  );
});

export default memo(Short);
