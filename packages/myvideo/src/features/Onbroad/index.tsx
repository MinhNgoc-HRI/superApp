import React, {forwardRef, memo, useCallback} from 'react';
import {RootStackScreenProps} from '@src/navigation/types';
import {Box, heightLize, widthLize, Thumb} from 'pmn-rn-component';
import Carousel from 'react-native-reanimated-carousel';
import {DIMENSION} from '@src/common/dimension';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';
import {StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {PaginationItem} from '@src/features/Onbroad/components/PaginationItem';
import DefaultActionBar from '@src/components/DefaultActionBar';
import {ONBROAD_DATA, OnbroadType} from '@src/mock';
import {PaginationContent} from '@src/features/Onbroad/components/PaginationContent';
interface IOnbroad extends RootStackScreenProps<'Onbroad'> {}

type OOnbroad = {};
const Onbroad = forwardRef<OOnbroad, IOnbroad>(() => {
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
  return (
    <Box color={'#D21F3C'} flex={1}>
      <DefaultActionBar leftIconType="none" background="transparent" />
      <Carousel
        data={ONBROAD_DATA}
        renderItem={renderItem}
        width={DIMENSION.width}
        autoPlay
        loop
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        style={styles.carousel}
      />
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
    </Box>
  );
});

export default memo(Onbroad);

const styles = StyleSheet.create({
  image: {
    width: widthLize(300),
    height: heightLize(332),
  },
  carousel: {
    flex: 1,
  },
});
