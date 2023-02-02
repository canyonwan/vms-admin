import { ComponentType } from './types/index'

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return '请输入'
  if (['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(component)) return '请选择'
  return ''
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker']

function genType() {
  return [...DATE_TYPE, 'RangePicker']
}

/**
 * 时间字段
 */
export const dateItemType = genType()

export function defaultType(component) {
  if (component === 'NInput') return ''
  if (component === 'NInputNumber') return null
  return ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(component) ? '' : undefined
}
/**
 * 动态引入组件
 * @param key
 * @returns
 */
export function getComponentByKey(key: string) {
  if (key === 'SelectRegion') {
    const viewsModules = import.meta.glob('/src/components/select-region/select-region.vue')
    return viewsModules['/src/components/select-region/select-region.vue']
  } else if (key === 'NUpload') {
    const viewsModules = import.meta.glob('/src/components/Upload/src/basic-upload.vue')
    return viewsModules['/src/components/Upload/src/basic-upload.vue']
  } else if (key === 'SelectLawEnforce') {
    // 选择执法人员
    const viewsModules = import.meta.glob('/src/components/select-law-enforce/select-law-enforce.vue')
    return viewsModules['/src/components/select-law-enforce/select-law-enforce.vue']
  }
  // else if (key == 'NTreeSelect') {
  //   const viewsModules = import.meta.glob('/node_modules/naive-ui/lib/tree-select/src/TreeSelect')
  //   return viewsModules['naive-ui/lib/tree-select/src/TreeSelect']
  // }
  return ''
}
