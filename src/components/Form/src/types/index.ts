export type ComponentType =
  | 'NInput'
  | 'NInputGroup'
  | 'NInputPassword'
  | 'NInputSearch'
  | 'NInputTextArea'
  | 'NInputNumber'
  | 'NInputCountDown'
  | 'NSelect'
  | 'NTreeSelect'
  | 'NRadioButtonGroup'
  | 'NRadioGroup'
  | 'NCheckbox'
  | 'NCheckboxGroup'
  | 'NAutoComplete'
  | 'NCascader'
  | 'NDatePicker'
  | 'NMonthPicker'
  | 'NRangePicker'
  | 'NWeekPicker'
  | 'NTimePicker'
  | 'NSwitch'
  | 'NStrengthMeter'
  | 'NUpload'
  | 'NIconPicker'
  | 'NRender'
  | 'NSlider'
  | 'NRate'

/**
 * 组件数据源获取类型
 * Dictionaries 字典中获取
 * Position 获取职位
 * Department 部门类型
 * Industry 行业类型
 * ProgramType 程序类型
 * documentModelDataType 文书数据类型
 * documentModelType 文书类型
 * documentModelUseWord 文书使用"字"
 * RelaEvidenceType 证据类型
 * DiscretionType 裁量类型
 * DiscretionCalculateType 裁量计算类型
 * RoleType 角色类型
 * ModelType 模型类型
 * EnumsType 枚举类型
 * TipType 提示信息类型
 * CheckedTargetType 检查对象
 */

export type ComponentDataSourceType = 'goods' | 'goodsCategory' | 'permissionTree'

/**
 * 自定义表单维护地方使用 上面添加 ComponentDataSourceType 和  ComponentDataSourceTypeData 保持一致
 */
export const ComponentDataSourceTypeData = [
  {
    label: '字典',
    value: 'Dictionaries'
  },
  {
    label: '职位',
    value: 'Position'
  },
  {
    label: '部门类型',
    value: 'Department'
  },
  {
    label: '行业类型',
    value: 'Industry'
  },
  {
    label: '程序类型',
    value: 'ProgramType'
  },
  {
    label: '文书数据类型',
    value: 'documentModelDataType'
  },
  {
    label: '文书类型',
    value: 'documentModelType'
  },
  {
    label: '文书使用"字"',
    value: 'documentModelUseWord'
  },
  {
    label: '证据类型',
    value: 'RelaEvidenceType'
  },
  {
    label: '裁量类型',
    value: 'DiscretionType'
  },
  {
    label: '裁量计算类型',
    value: 'DiscretionCalculateType'
  },
  {
    label: '文书审批类型',
    value: 'ApprovalType'
  },
  {
    label: '角色类型',
    value: 'RoleType'
  },
  {
    label: '模型类型',
    value: 'ModelType'
  },
  {
    label: '枚举类型',
    value: 'EnumsType'
  },
  {
    label: '提示信息类型',
    value: 'TipType'
  }
]
/**
 * 字段的值的类型
 */
export type FieldValueType = 'string' | 'number' | 'arrayString' | 'arrayNumber'
