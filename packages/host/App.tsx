import React from 'react';

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {Box, Text, fontSizeLine} from 'pmn-rn-component';
import {Platform} from 'react-native';

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
  console.log('starting script');
  let url;
  console.log({scriptId, caller});
  if (caller === 'main') {
    console.log('main');
    url = Script.getDevServerURL(scriptId);
  } else {
    console.log('not main');
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }
  console.log({url, nameUrl: caller});
  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});
// type ChuckType = {
//   text: string;
// };
// const MyChunk = React.lazy<ComponentType<ChuckType>>(
//   () => import(/* webpackChunkName: "chuck-demo" */ './src/Chucks'),
// );
const MyVideo = React.lazy(() => Federated.importModule('myVideo', './App'));

const App = () => {
  return (
    <Box flex={1} middle center>
      <Text size={fontSizeLine(16)}>Hello</Text>
      {/* <React.Suspense
        fallback={<Text size={fontSizeLine(16)}>Loading...</Text>}>
        <MyChunk text="Chuck" />
      </React.Suspense> */}
      <React.Suspense
        fallback={<Text size={fontSizeLine(16)}>Loading...</Text>}>
        <MyVideo />
      </React.Suspense>
    </Box>
  );
};

export default App;
