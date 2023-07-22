import {StyleSheet} from 'react-native';
import React, {forwardRef, useImperativeHandle} from 'react';
import {TouchRippleSingle, Text} from 'pmn-rn-component';
export type IVideoReplayed = {
  isPlayed: boolean;
  onPress: () => void;
};
export type OVideoReplayed = {};
const VideoReplayed = forwardRef<OVideoReplayed, IVideoReplayed>(
  (props, ref) => {
    const {isPlayed, onPress} = props;
    useImperativeHandle(ref, () => ({}));

    if (!isPlayed) {
      return null;
    }
    return (
      <TouchRippleSingle onPress={onPress}>
        <Text />
      </TouchRippleSingle>
    );
  },
);

export default VideoReplayed;

const styles = StyleSheet.create({});
