import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import defaultStyles from '@src/common/styles';
import Navigator from '@src/navigation';
import {Host} from 'react-native-portalize';
import {AlertProvider} from '@src/components/Alert';
import PlayerProvider from '@src/store/player';
import BottomTabProvider from '@src/store/bottomTab';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

const App = () => {
  return (
    <GestureHandlerRootView style={defaultStyles.flex_1}>
      <Host>
        <AlertProvider>
          <BottomTabProvider>
            <PlayerProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Navigator />
              </SafeAreaProvider>
            </PlayerProvider>
          </BottomTabProvider>
        </AlertProvider>
      </Host>
    </GestureHandlerRootView>
  );
};

export default App;
