import React from 'react';

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainStack from '@src/navigation';
import defaultStyles from '@src/common/styles';

// ScriptManager.shared.addResolver(async (scriptId, caller) => {
//   // In dev mode, resolve script location to dev server.
//   console.log({caller, scriptId});
//   if (__DEV__) {
//     console.log({devUrl: Script.getDevServerURL(scriptId)});
//     return {
//       url: Script.getDevServerURL(scriptId),
//       cache: false,
//     };
//   }
//   console.log({
//     prodUrl: Script.getRemoteURL(
//       `http://somewhere-on-the-internet.com/${scriptId}`,
//     ),
//   });
//   return {
//     url: Script.getRemoteURL(
//       `http://somewhere-on-the-internet.com/${scriptId}`,
//     ),
//   };
// });
const resolveURL = Federated.createURLResolver({
  containers: {
    myVideo: 'http://localhost:9000/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  console.log({scriptId, caller});
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
      platform: Platform.OS,
    },
  };
});

const App = () => {
  return (
    <GestureHandlerRootView style={defaultStyles.flex_1}>
      <MainStack />
    </GestureHandlerRootView>
  );
};

export default App;
