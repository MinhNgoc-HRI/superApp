import React, {useEffect} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
export interface SwitcherMethod {
  getValue: boolean;
}
export interface SwitcherOptions {
  onTurnOn?: () => void;
  onTurnOff?: () => void;
  on?: boolean;
}
const Switch = React.forwardRef<SwitcherMethod, SwitcherOptions>(
  ({on = false, onTurnOn, onTurnOff}: SwitcherOptions, ref) => {
    const _circleOffsetx = React.useMemo(() => new Animated.Value(0), []);
    const [status, setStatus] = React.useState<boolean>(false);
    React.useImperativeHandle(
      ref,
      () => ({
        getValue: status,
      }),
      [status],
    );
    const _onToggle = () => {
      if (status) {
        setStatus(false);
        if (onTurnOff) {
          onTurnOff();
        }
      } else {
        onTurnOn?.();
        setStatus(true);
      }
    };
    useEffect(() => {
      setStatus(on);
    }, [on]);
    useEffect(() => {
      Animated.timing(_circleOffsetx, {
        toValue: status ? 21 : 2,
        duration: 200,
        useNativeDriver: false,
      }).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
      <TouchableOpacity
        onPress={_onToggle}
        activeOpacity={1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.container,
          backgroundColor: status ? '#D21F3C' : '#B0B0B8',
        }}>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.circle,
            backgroundColor: '#fff',
            left: _circleOffsetx,
          }}
        />
      </TouchableOpacity>
    );
  },
);

export default React.memo(Switch);

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 40,
    borderRadius: 10,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    zIndex: 1,
    top: (20 - 16) / 2,
    height: 16,
    width: 16,
    borderRadius: 16,
  },
});
