import { ComponentDataSourceType, ComponentType, FieldValueType } from './index'
import type { CSSProperties } from 'vue'
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid'
import type { ButtonProps } from 'naive-ui/lib/button'
import { Justify } from 'naive-ui/es/space/src/Space'

export interface FormSchema {
  field: string
  label: string
  labelMessage?: string
  labelMessageStyle?: object | string
  defaultValue?: any
  fieldValueType?: FieldValueType // 字段值的类型
  component?: ComponentType
  componentSource?: any // 组件源
  componentProps?: object
  componentDataSourceType?: ComponentDataSourceType // 组件本身需要的数据源
  componentDataSourceName?: string // 当组件数据源为字典时， 需要查询的字典名称
  componentDataSourceEnumPrefix?: string // 枚举prefix, 用于筛选枚举集合
  slot?: string
  rules?: object | object[]
  giProps?: GridItemProps
  isFull?: boolean
  suffix?: string
}

export interface FormProps {
  model?: Recordable
  labelWidth?: number | string
  schemas?: FormSchema[]
  inline: boolean
  layout?: string // 按钮的布局
  size: string
  labelPlacement: string // 显示的位置'left' | 'top'
  isFull: boolean // 填满宽度
  buttonPosition?: Justify

  disabled: boolean // 表单禁用
  showLabel: boolean // 是否显示label
  showRequireMark?: boolean // 是否显示必填
  requireMarkPlacement: string // * 位置 'left' | 'right'

  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  submitButtonText?: string
  resetButtonText?: string
  gridProps: GridProps
  giProps?: GridItemProps
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  submitOnReset?: boolean
  baseGridStyle?: CSSProperties
  showCancelButton?: boolean
  cancelButtonText?: string
}

export interface FormActionType {
  submit: () => Promise<any>
  cancel: () => Promise<any>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setFieldsValue: (values: Recordable) => Promise<void>
  clearValidate: (name?: string | string[]) => Promise<void>
  getFieldsValue: () => Recordable
  resetFields: () => Promise<void>
  validate: (nameList?: any[]) => Promise<any>
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]
