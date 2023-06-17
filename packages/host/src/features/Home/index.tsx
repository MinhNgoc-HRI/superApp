import React, {ComponentType} from 'react';
import {Box, Text, fontSizeLine} from 'pmn-rn-component';
import {Federated} from '@callstack/repack/client';
import {RootStackScreenProps} from '@src/navigation/types';
import Chuck from '@src/Chucks';
import DefaultActionBar from '@src/components/DefaultActionBar';
const MyVideo = React.lazy(() => Federated.importModule('myVideo', './App'));

type ChuckType = {
  text: string;
};
const MyChunk = React.lazy<ComponentType<ChuckType>>(
  () => import(/* webpackChunkName: "chuck-demo" */ '@src/Chucks'),
);

interface IHomeScreen extends RootStackScreenProps<'Home'> {}
type OHomeScreen = {};
const HomeScreen = React.forwardRef<OHomeScreen, IHomeScreen>((_props, ref) => {
  React.useImperativeHandle(ref, () => ({}));
  const [status, setStatus] = React.useState(false);
  return (
    <Box flex={1}>
      <DefaultActionBar title="Home" leftIconType="back" />
      <Text size={fontSizeLine(16)}>Hello</Text>
      <React.Suspense
        fallback={<Text size={fontSizeLine(16)}>Loading...</Text>}>
        <MyChunk text="Chuck" />
        <Chuck text="Chuck-local" />
      </React.Suspense>
      {status && (
        <React.Suspense
          fallback={<Text size={fontSizeLine(16)}>Loading...</Text>}>
          <MyVideo />
        </React.Suspense>
      )}
      <Text size={14} onPress={() => setStatus(e => !e)}>
        install My video
      </Text>
    </Box>
  );
});

export default React.memo(HomeScreen);
