export interface BottomTabState {
  heightBottom: number;
}
export const initBottomTabState: BottomTabState = {
  heightBottom: 0,
};
export enum BottomTabActionType {
  SetBottomTabHeight,
}
export interface SetBottomTabHeight {
  type: BottomTabActionType.SetBottomTabHeight;
  data: number;
}
export type BottomTabAction = SetBottomTabHeight;
