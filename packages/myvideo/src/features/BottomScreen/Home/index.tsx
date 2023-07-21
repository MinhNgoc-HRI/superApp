import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
import {Box} from 'pmn-rn-component';
import Header from './components/Header';
import TopScreen from './TopScreen';
interface IHome extends BottomStackScreenProps<'Home'> {}
type OHome = {};
const Home = forwardRef<OHome, IHome>((_props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <Box flex={1} color="#1C1E28">
      {/* header */}
      <Header />
      {/* header */}
      {/* top tab */}
      <TopScreen />
      {/* top tab */}
    </Box>
  );
});

export default memo(Home);
