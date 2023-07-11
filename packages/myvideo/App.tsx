import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import defaultStyles from '@src/common/styles';
import Navigator from '@src/navigation';
import {Host} from 'react-native-portalize';
const App = () => {
  return (
    <GestureHandlerRootView style={defaultStyles.flex_1}>
      <Host>
        <Navigator />
      </Host>
    </GestureHandlerRootView>
  );
};

export default App;
