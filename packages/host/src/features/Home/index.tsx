import React from 'react';
import {Box, Text, fontSizeLine} from 'pmn-rn-component';
import {Federated} from '@callstack/repack/client';
import {RootStackScreenProps} from '@src/navigation/types';
import ErrorBoundary from '@src/components/ErrorBoundary';
const MyVideo = React.lazy(() => Federated.importModule('myVideo', './App'));

// type ChuckType = {
//   text: string;
// };
// const MyChunk = React.lazy<ComponentType<ChuckType>>(
//   () => import(/* webpackChunkName: "chuck-demo" */ '@src/Chucks'),
// );

interface IHomeScreen extends RootStackScreenProps<'Home'> {}
type OHomeScreen = {};
const HomeScreen = React.forwardRef<OHomeScreen, IHomeScreen>((_props, ref) => {
  React.useImperativeHandle(ref, () => ({}));

  return (
    <Box flex={1}>
      <ErrorBoundary name="My Video">
        <React.Suspense
          fallback={
            <Box flex={1} middle center>
              <Text size={fontSizeLine(16)}>Loading...</Text>
            </Box>
          }>
          <MyVideo />
        </React.Suspense>
      </ErrorBoundary>
    </Box>
  );
});

export default React.memo(HomeScreen);
