import {widthLize} from 'pmn-rn-component';
import {StyleSheet, Platform} from 'react-native';

export const CELL_SIZE = widthLize(40);
export const CELL_BORDER_RADIUS = 16;
export const DEFAULT_CELL_BG_COLOR = '#141414';
export const NOT_EMPTY_CELL_BG_COLOR = '#FFF';
export const ACTIVE_CELL_BG_COLOR = '#141414';

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontWeight: '700',
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: CELL_SIZE / 2,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#000',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 100,
    // padding: 20,
  },
});

export default styles;
