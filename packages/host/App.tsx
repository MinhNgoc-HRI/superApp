import React, {ComponentType} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ScriptManager, Script} from '@callstack/repack/client';

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
  () => import('./src/Chucks'),
);
const App = () => {
  React.useEffect(() => {
    fetch('https://dummyapi.io/data/v1/user?limit=10');
  }, []);
  return (
    <View style={styles.root}>
      <Text>Hello</Text>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <MyChunk text="Chuck" />
      </React.Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
