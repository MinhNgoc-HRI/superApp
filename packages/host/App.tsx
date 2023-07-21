import React from 'react';

import {ScriptManager, Federated, Script} from '@callstack/repack/client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainStack from '@src/navigation';
import defaultStyles from '@src/common/styles';
import {Platform} from 'react-native';
import 'react-native-svg';
import 'react-native-pager-view';
const resolveURL = Federated.createURLResolver({
  containers: {
    myVideo: 'http://localhost:9000/[name][ext]',
    // myVideo:
    //   'https://github.com/ngnm1009/food-app/releases/download/myvideo/[name][ext]',
    // myVideo: 'http://localhost:3000/name=[name][ext]',
  },
});
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }
  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS, // For development
    },
  };
});
/*
lắng nghe khi quá trình tải script hoàn hành
*/
ScriptManager.shared.on('resolved', ({scriptId, caller}) => {
  console.log(`resolved ${scriptId} ${caller}`);
  // do something
});
const App = () => {
  return (
    <GestureHandlerRootView style={defaultStyles.flex_1}>
      <MainStack />
    </GestureHandlerRootView>
  );
};

export default App;
