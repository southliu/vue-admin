
import type { FormList } from '#/form';
import type { FormProps } from 'ant-design-vue/lib/form';

/**
 * label布局
 * @param labelCol - 值
 */
export const handleLabelCol = (labelCol: FormList['labelCol']): FormProps['labelCol'] => {
  if (typeof labelCol === 'number') {
    return { style: { width: `${ labelCol }px` } };
  }

  if (typeof labelCol === 'string' && labelCol?.includes('%')) {
    return { style: { width: `${ labelCol }` } };
  }

  return labelCol as FormProps['labelCol'];
};

/**
 * 输入控件布局样式
 * @param wrapperCol - 值
 */
export const handleWrapperCol = (wrapperCol: FormList['wrapperCol']): FormProps['wrapperCol'] => {
  if (typeof wrapperCol === 'number') {
    return { style: { width: `${ wrapperCol }px` } };
  }

  if (typeof wrapperCol === 'string' && wrapperCol?.includes('%')) {
    return { style: { width: `${ wrapperCol }` } };
  }

  return wrapperCol as FormProps['wrapperCol'];
};