import React, {memo} from 'react';
import {
  Box,
  Text,
  TouchRippleSingle,
  fontSizeLine,
  getOffset,
  widthLize,
} from 'pmn-rn-component';
import IconLogo from '@src/assets/icons/IconLogo';
import IconConnect from '@src/assets/icons/IconConnect';
import IconAdd from '@src/assets/icons/IconAdd';
import IconNoti from '@src/assets/icons/IconNoti';
import IconSearch from '@src/assets/icons/IconSearch';

const Header = () => {
  return (
    <Box
      marginTop={getOffset().top_without_margin + 10}
      row
      middle
      padding={widthLize(16)}>
      <Box flex={1} row center justifyContent="flex-start">
        <IconLogo width={32} height={32} />
        <Text
          size={fontSizeLine(20)}
          weight="800"
          color="#fff"
          marginLeft={widthLize(6)}>
          MyVideo
        </Text>
      </Box>
      <Box flex={1} row center justifyContent="space-around">
        <TouchRippleSingle>
          <IconConnect />
        </TouchRippleSingle>
        <TouchRippleSingle>
          <IconAdd />
        </TouchRippleSingle>
        <TouchRippleSingle>
          <IconNoti />
        </TouchRippleSingle>
        <TouchRippleSingle>
          <IconSearch />
        </TouchRippleSingle>
      </Box>
    </Box>
  );
};

export default memo(Header);
