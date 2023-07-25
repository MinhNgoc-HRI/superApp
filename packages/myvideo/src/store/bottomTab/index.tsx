import {
  BottomTabActionType,
  BottomTabState,
  BottomTabAction,
  SetBottomTabHeight,
  initBottomTabState,
} from '@src/store/bottomTab/type';
import React, {Dispatch, createContext, useReducer} from 'react';

const bottomTabReducer = (store: BottomTabState, action: BottomTabAction) => {
  switch (action.type) {
    case BottomTabActionType.SetBottomTabHeight:
      return {...store, heightBottom: action.data};
    default:
      return store;
  }
};
export const BottomTabContext = createContext<{
  store: BottomTabState;
  dispatch: Dispatch<BottomTabAction>;
}>({
  store: initBottomTabState,
  dispatch: () => undefined,
});
export const setBottomTabHeight = (value: number): SetBottomTabHeight => {
  return {
    type: BottomTabActionType.SetBottomTabHeight,
    data: value,
  };
};
const BottomTabProvider = (props: any) => {
  const [store, dispatch] = useReducer(bottomTabReducer, initBottomTabState);
  return (
    <BottomTabContext.Provider value={{store, dispatch}}>
      {props.children}
    </BottomTabContext.Provider>
  );
};

export default BottomTabProvider;
