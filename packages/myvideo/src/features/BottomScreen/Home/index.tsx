import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {BottomStackScreenProps} from '@src/navigation/types';
import {Box, Text, fontSizeLine, heightLize, widthLize} from 'pmn-rn-component';
import Header from './components/Header';
import IconCompass from '@src/assets/icons/IconCompass';
import {ScrollView} from 'react-native-gesture-handler';
interface IHome extends BottomStackScreenProps<'Home'> {}
type OHome = {};
const Home = forwardRef<OHome, IHome>((_props, ref) => {
  useImperativeHandle(ref, () => ({}));
  return (
    <Box flex={1} color="#1C1E28">
      {/* Header */}
      <Header />
      {/* header */}
      <Box
        row
        middle
        marginTop={heightLize(12)}
        marginBottom={heightLize(12)}
        marginLeft={widthLize(12)}>
        <Box row>
          <IconCompass />
          <Text
            weight="700"
            size={fontSizeLine(14)}
            lineHeight={fontSizeLine(20)}
            color="#B0B0B8"
            marginLeft={widthLize(4)}>
            Khám phá
          </Text>
        </Box>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingLeft: widthLize(10),
          }}>
          <Text
            weight="700"
            size={fontSizeLine(14)}
            lineHeight={fontSizeLine(20)}
            color="#FFF"
            marginLeft={widthLize(4)}>
            Đề xuất
          </Text>
        </ScrollView>
      </Box>
      <Text size={16}>Home</Text>
    </Box>
  );
});

export default memo(Home);
