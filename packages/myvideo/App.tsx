import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import defaultStyles from '@src/common/styles';
import Navigator from '@src/navigation';
const App = () => {
  return (
    <GestureHandlerRootView style={defaultStyles.flex_1}>
      <Navigator />
    </GestureHandlerRootView>
  );
};

export default App;
