import React, {forwardRef, memo, useCallback, useImperativeHandle} from 'react';
import {RootStackScreenProps} from '@src/navigation/types';
import {
  Box,
  heightLize,
  widthLize,
  Thumb,
  getOffset,
  fontSizeLine,
  Text,
  TouchRippleSingle,
} from 'pmn-rn-component';
import Carousel from 'react-native-reanimated-carousel';
import {DIMENSION} from '@src/common/dimension';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';
import {StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {PaginationItem} from '@src/features/Onbroad/components/PaginationItem';
import DefaultActionBar from '@src/components/DefaultActionBar';
import {ONBROAD_DATA, OnbroadType} from '@src/mock';
import {PaginationContent} from '@src/features/Onbroad/components/PaginationContent';
import {routerMain} from '@src/navigation/routes';

interface IOnbroad extends RootStackScreenProps<'Onbroad'> {}
type OOnbroad = {};
const Onbroad = forwardRef<OOnbroad, IOnbroad>((props, ref) => {
  const {navigation} = props;
  const progressValue = useSharedValue(0);
  const renderItem = useCallback(
    (info: CarouselRenderItemInfo<OnbroadType>) => {
      const {item, index} = info;
      return (
        <Box key={index} width={DIMENSION.width} middle center>
          <Thumb
            source={require(`../../assets/images/${item.image}`)}
            style={styles.image}
            resizeMode="contain"
          />
        </Box>
      );
    },
    [],
  );
  useImperativeHandle(ref, () => ({}));
  return (
    <Box color={'#D21F3C'} flex={1} center>
      <DefaultActionBar leftIconType="none" background="transparent" />
      <Box flex={1} marginTop={heightLize(60)}>
        <Carousel
          data={ONBROAD_DATA}
          renderItem={renderItem}
          width={DIMENSION.width}
          autoPlay
          loop
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
        />
      </Box>
      <Box flex={1} row middle center>
        {ONBROAD_DATA.map((item, index) => (
          <PaginationContent
            animValue={progressValue}
            index={index}
            key={index}
            length={ONBROAD_DATA.length}
            value={item}
          />
        ))}
      </Box>
      <Box flex={1} row middle center marginTop={heightLize(24)}>
        {ONBROAD_DATA.map((_page, index) => (
          <PaginationItem
            backgroundColor={'#fff'}
            inActiveBg={'rgba(255, 255, 255, 0.4)'}
            animValue={progressValue}
            index={index}
            key={index}
            length={ONBROAD_DATA.length}
          />
        ))}
      </Box>
      <Box marginBottom={getOffset().bottom_without_margin}>
        <TouchRippleSingle
          onPress={() => navigation.navigate(routerMain.Login)}>
          <Box
            width={widthLize(300)}
            height={heightLize(40)}
            middle
            center
            radius={10}
            color="#141414">
            <Text
              size={fontSizeLine(16)}
              lineHeight={fontSizeLine(21)}
              color="#FFF"
              weight="700">
              Bắt đầu
            </Text>
          </Box>
        </TouchRippleSingle>
      </Box>
    </Box>
  );
});

export default memo(Onbroad);

const styles = StyleSheet.create({
  image: {
    width: widthLize(300),
    height: heightLize(332),
  },
});
