// /**
//  * @description BasicForm  自定义列的componentDataSourceType 类型判断获取列的数据源
//  */

// import { FormSchema } from '../types/form'

// /**
//  * @description BasicForm  自定义列的componentDataSourceType 类型判断获取列的数据源
//  */
// const schemaDataHandle = async (schema: FormSchema[]) => {
//   if (schema && schema.length) {
//     const dictionariesKeys: string[] = [] // 字典的key 集合
//     let isHavePosition = false // 职位类型
//     let isHaveDept = false // 部门类型
//     let isHaveIndustry = false // 行业类型
//     let isHasProgramType = false // 程序类型
//     let isHasEvidenceType = false // 证据类型
//     let isHasDiscretionType = false // 裁量类型
//     let isHasDiscretionCalculateType = false // 裁量计算类型
//     let isDocumentModelDataType = false // 文书数据类型
//     let isDocumentModelType = false // 文书类型
//     let isDocumentModelUseWord = false // 文书使用"字"
//     let isApprovalType = false // 文书审批类型
//     let isRoleType = false // 角色类型
//     let isModelType = false // 模型类型
//     let isTipType = false // 提示信息类型
//     let isCaseAttrType = false // 违法行为基本属性类型
//     let isCheckedTargetType = false // 检查对象类型
//     let isCauseTypeEnum = false // 违法行为类型
//     let isCaseTypeEnum = false // 处罚方式
//     let isArchiveType = false // 卷宗类型

//     const enumsNameList: string[] = [] // 枚举name的集合
//     for (const item of schema) {
//       if (item.componentDataSourceType === 'Dictionaries' && item.componentDataSourceName) {
//         // 是字典类的
//         dictionariesKeys.push(item.componentDataSourceName)
//       } else if (item.componentDataSourceType === 'Position') {
//         isHavePosition = true
//       } else if (item.componentDataSourceType === 'Department') {
//         isHaveDept = true
//       } else if (item.componentDataSourceType === 'Industry') {
//         isHaveIndustry = true
//       } else if (item.componentDataSourceType === 'ProgramType') {
//         isHasProgramType = true
//       } else if (item.componentDataSourceType === 'RelaEvidenceType') {
//         isHasEvidenceType = true
//       } else if (item.componentDataSourceType === 'DiscretionType') {
//         isHasDiscretionType = true
//       } else if (item.componentDataSourceType === 'DiscretionCalculateType') {
//         isHasDiscretionCalculateType = true
//       } else if (item.componentDataSourceType === 'documentModelDataType') {
//         isDocumentModelDataType = true
//       } else if (item.componentDataSourceType === 'documentModelType') {
//         isDocumentModelType = true
//       } else if (item.componentDataSourceType === 'documentModelUseWord') {
//         isDocumentModelUseWord = true
//       } else if (item.componentDataSourceType === 'ApprovalType') {
//         isApprovalType = true
//       } else if (item.componentDataSourceType === 'RoleType') {
//         isRoleType = true
//       } else if (item.componentDataSourceType === 'ModelType') {
//         isModelType = true
//       } else if (item.componentDataSourceType === 'EnumsType' && item.componentDataSourceName) {
//         // 枚举
//         enumsNameList.push(item.componentDataSourceName)
//       } else if (item.componentDataSourceType === 'TipType') {
//         isTipType = true
//       } else if (item.componentDataSourceType === 'CaseAttrType') {
//         // 违法行为属性类型
//         isCaseAttrType = true
//       } else if (item.componentDataSourceType === 'CheckedTargetType') {
//         // 违法行为属性类型
//         isCheckedTargetType = true
//       } else if (item.componentDataSourceType === 'CauseTypeEnum') {
//         // 违法行为类型
//         isCauseTypeEnum = true
//       } else if (item.componentDataSourceType === 'CaseType') {
//         // 处罚方式
//         isCaseTypeEnum = true
//       } else if (item.componentDataSourceType === 'ArchiveType') {
//         // 卷宗类型
//         isArchiveType = true
//       }
//     }
//     let dictionariesData: any = []
//     let positionData: any = []

//     if (dictionariesKeys.length) {
//       // 有字典数据源配置
//       dictionariesData = await queryDictionaries({ typeList: dictionariesKeys.join(',') })
//     }
//     if (isHavePosition) {
//       // 查询职位 数据源
//       positionData = await queryPosition()
//     }
//     if (isHaveDept) {
//       departmentData = await queryDepartmentTypes()
//     }
//     if (isHaveIndustry) {
//       industryData = await queryIndustry()
//     }
//     if (isHasProgramType) {
//       programTypeData = await queryProgramTypes()
//     }
//     if (isHasEvidenceType) {
//       evidenceTypeData = await queryAllEvidenceType()
//     }
//     if (isHasDiscretionType) {
//       discretionTypeData = await queryAllDiscretionType()
//     }
//     if (isHasDiscretionCalculateType) {
//       discretionCalculateTypeData = await queryAllDiscretionCalculateType()
//     }
//     if (isDocumentModelDataType) {
//       documentModelDataTypeData = await queryParamTypes(null)
//     }
//     if (isDocumentModelType) {
//       documentModelData = await queryDocumentTypes()
//     }
//     if (isDocumentModelUseWord) {
//       documentModelUseWordData = await queryUseWordTypes(null)
//     }
//     if (isApprovalType) {
//       approvalTypeData = await getApproveType()
//     }
//     if (isRoleType) {
//       const user = useUserStore()
//       const userInfo = user.getUserInfo
//       roleTypeData = await queryRole({ orgId: userInfo.orgId })
//     }
//     if (isModelType) {
//       modelTypeData = await queryModelType({})
//     }
//     if (enumsNameList.length) {
//       enumsTypeData = await queryEnums({ columnNameList: enumsNameList })
//     }
//     if (isTipType) {
//       tipTypeData = await queryTipTypeData({})
//     }
//     if (isCaseAttrType) {
//       caseAttrTypeData = await queryCauseBaseAttrs()
//     }
//     if (isCheckedTargetType) {
//       checkedTargetData = await queryTargetTypes()
//     }
//     // 违法行为类型
//     if (isCauseTypeEnum) {
//       causeTypeData = await queryCauseTypes()
//     }
//     // 处罚方式
//     if (isCaseTypeEnum) {
//       caseTypeData = await queryCaseTypesTree()
//     }
//     // 处罚方式
//     if (isArchiveType) {
//       archiveTypeList = await queryArchiveTypeOptions()
//     }

//     if (
//       isHavePosition ||
//       isHaveDept ||
//       isHaveIndustry ||
//       isHasProgramType ||
//       isHasEvidenceType ||
//       isHasDiscretionType ||
//       isDocumentModelType ||
//       isHasDiscretionCalculateType ||
//       isDocumentModelDataType ||
//       isApprovalType ||
//       isRoleType ||
//       isModelType ||
//       isTipType ||
//       enumsNameList.length ||
//       dictionariesKeys.length ||
//       checkedTargetData.length ||
//       causeTypeData.length ||
//       caseTypeData.length ||
//       archiveTypeList.length
//     ) {
//       for (const item of schema) {
//         if (item.componentDataSourceType === 'Dictionaries' && item.componentDataSourceName) {
//           item.componentProps.options = dictionariesData[item.componentDataSourceName].map((item) => {
//             return {
//               label: item.displayValue,
//               value: item.hiddenValue
//             }
//           })
//         } else if (item.componentDataSourceType === 'Position') {
//           // 处理 职位信息
//           item.componentProps.options = positionData
//           item.componentProps.childrenField = 'list'
//           item.componentProps.keyField = 'id'
//           item.componentProps.labelField = 'name'
//         } else if (item.componentDataSourceType === 'Department') {
//           item.componentProps.options = departmentData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'Industry') {
//           item.componentProps.options = industryData
//           item.componentProps.childrenField = 'childrenList'
//           item.componentProps.keyField = 'id'
//           item.componentProps.labelField = 'industryName'
//           item.componentProps.filterable = true
//         } else if (item.componentDataSourceType === 'ProgramType') {
//           item.componentProps.options = programTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'documentModelDataType') {
//           item.componentProps.options = documentModelDataTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'documentModelType') {
//           item.componentProps.options = documentModelData
//           item.componentProps.childrenField = 'childrenList'
//           item.componentProps.keyField = 'id'
//           item.componentProps.labelField = 'name'
//           item.componentProps.filterable = true
//         } else if (item.componentDataSourceType === 'documentModelUseWord') {
//           item.componentProps.options = documentModelUseWordData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'RelaEvidenceType') {
//           item.componentProps.options = evidenceTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'DiscretionType') {
//           item.componentProps.options = discretionTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'DiscretionCalculateType') {
//           item.componentProps.options = discretionCalculateTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'ApprovalType') {
//           item.componentProps.options = approvalTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'RoleType') {
//           item.componentProps.options = roleTypeData.map((item) => {
//             return {
//               label: item.roleName,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'ModelType') {
//           item.componentProps.options = modelTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'EnumsType' && item.componentDataSourceName) {
//           item.componentProps.options = enumsTypeData.filter((info) => {
//             if (item.componentDataSourceName === info.pojoEntityName && info.enumDescription.split('_')[0] === item.componentDataSourceEnumPrefix) {
//               info.label = info.enumChineseDescription
//               info.value = info.enumCode
//               return info
//             } else if (item.componentDataSourceName === info.pojoEntityName && !item.componentDataSourceEnumPrefix) {
//               info.label = info.enumChineseDescription
//               info.value = info.enumCode
//               return info
//             }
//           })
//         } else if (item.componentDataSourceType === 'TipType') {
//           item.componentProps.options = tipTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'CaseAttrType') {
//           item.componentProps.options = caseAttrTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'CheckedTargetType') {
//           item.componentProps.options = checkedTargetData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'CauseTypeEnum') {
//           item.componentProps.options = causeTypeData.map((item) => {
//             return {
//               label: item.name,
//               value: item.id
//             }
//           })
//         } else if (item.componentDataSourceType === 'CaseType') {
//           item.componentProps.childrenField = 'list'
//           item.componentProps.keyField = 'id'
//           item.componentProps.labelField = 'name'
//           item.componentProps.options = processData(caseTypeData)
//         } else if (item.componentDataSourceType === 'ArchiveType') {
//           item.componentProps.options = archiveTypeList.map((item) => {
//             return {
//               label: item.dossierTypeName,
//               value: item.id
//             }
//           })
//         }
//       }
//     }
//   }
// }

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

// export default schemaDataHandle
