// 外部调BasicForm方法
export interface BasicFormProps extends Element {
  handleReset: () => void;
  handleSubmit: () => void;
  handleValidate: () => Promise<boolean>;
}
