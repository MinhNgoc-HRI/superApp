import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {Box} from 'pmn-rn-component';
export type IVideoLoader = {
  loading?: boolean;
};
export type OVideoLoader = {};
const VideoLoader = forwardRef<OVideoLoader, IVideoLoader>((props, ref) => {
  const {loading} = props;
  useImperativeHandle(ref, () => ({}));
  if (!loading) {
    return null;
  }
  return (
    <Box style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </Box>
  );
});

export default memo(VideoLoader);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
