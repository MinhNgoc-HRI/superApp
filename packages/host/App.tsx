import React, {ComponentType} from 'react';

import {ScriptManager, Script} from '@callstack/repack/client';
import {Box, Text, fontSizeLine} from 'pmn-rn-component';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  // In dev mode, resolve script location to dev server.
  console.log({caller, scriptId});
  if (__DEV__) {
    console.log({devUrl: Script.getDevServerURL(scriptId)});
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }
  console.log({
    prodUrl: Script.getRemoteURL(
      `http://somewhere-on-the-internet.com/${scriptId}`,
    ),
  });
  return {
    url: Script.getRemoteURL(
      `http://somewhere-on-the-internet.com/${scriptId}`,
    ),
  };
});
type ChuckType = {
  text: string;
};
const MyChunk = React.lazy<ComponentType<ChuckType>>(
  () => import(/* webpackChunkName: "chuck demo" */ './src/Chucks'),
);
const App = () => {
  return (
    <Box flex={1} middle center>
      <Text size={fontSizeLine(16)}>Hello</Text>
      <React.Suspense
        fallback={<Text size={fontSizeLine(16)}>Loading...</Text>}>
        <MyChunk text="Chuck" />
      </React.Suspense>
    </Box>
  );
};

export default App;
