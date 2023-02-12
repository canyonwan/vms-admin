/**
 * @description BasicForm  自定义列的componentDataSourceType 类型判断获取列的数据源
 */

import { queryGoodsCategoryTree } from '@/api/goods/goods'
import { FormSchema } from '../types/form'
import { queryPermissionTree } from '@/api/system/menu'
// import { IGoodsCategoryTreeItem } from '@/api/goods/types'

/**
 * @description BasicForm  自定义列的componentDataSourceType 类型判断获取列的数据源
 */
const schemaDataHandle = async (schema: FormSchema[]) => {
  if (schema && schema.length) {
    // let isGoodsCategoryTree = false // 商品分类tree

    // let goodsCategoryTree: IGoodsCategoryTreeItem[] = []

    // 判断需要什么数据源
    for (const item of schema) {
      switch (item.componentDataSourceType) {
        case 'goodsCategory':
          const { list } = await queryGoodsCategoryTree()
          item.componentProps.options = list
          item.componentProps.valueField = 'id'
          item.componentProps.separator = '->'
          item.componentProps.multiple = true
          item.componentProps.labelField = 'categoryName'
          break
        case 'permissionTree':
          const { list: pList } = await queryPermissionTree()
          item.componentProps.options = pList.map((item) => {
            return {
              label: item.name,
              value: item.id
            }
          })
        default:
          break
      }
      // if (item.componentDataSourceType === 'goodsCategory') {
      //   // isGoodsCategoryTree = true
      //   const { list } = await queryGoodsCategoryTree()
      //   // goodsCategoryTree = list
      //   item.componentProps.options = list.map((item) => {
      //     return {
      //       label: item.categoryName,
      //       value: item.id
      //     }
      //   })
      // }
      // if (item.componentDataSourceType === 'permissionTree') {
      //   const { list } = await queryPermissionTree()
      //   item.componentProps.options = list.map((item) => {
      //     return {
      //       label: item.name,
      //       value: item.id
      //     }
      //   })
      // }
    }
  }
}

// function processData(caseTypeData: any) {
//   if (caseTypeData.length > 0) {
//     for (const c of caseTypeData) {
//       if (c.list && c.list.length > 0) {
//         processData(c.list)
//       } else {
//         delete c.list
//       }
//     }
//   }
//   return caseTypeData
// }

export default schemaDataHandle
