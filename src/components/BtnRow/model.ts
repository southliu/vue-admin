export interface BtnRowList<T = string> {
  label: string;
  value: T;
  permission: string;
  isSlot?: boolean;
}