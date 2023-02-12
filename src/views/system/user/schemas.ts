import { FormSchema } from '@/components/Form/src/types/form'
import { NTreeSelect } from 'naive-ui'

export const schemasForm: FormSchema[] = [
  {
    field: 'phone',
    component: 'NInput',
    label: '手机',
    componentProps: {}
  },
  {
    field: 'realName',
    component: 'NInput',
    label: '真实姓名',
    componentProps: {}
  },
  {
    field: 'password',
    component: 'NInput',
    label: '密码',
    componentProps: {}
  },
  {
    field: 'permissions',
    componentSource: shallowRef(NTreeSelect),
    label: '权限',
    componentDataSourceType: 'permissionTree',
    componentProps: {
      multiple: true,
      options: [],
      checkable: true
    }
  },
  {
    field: 'platform',
    component: 'NSelect',
    label: '平台',
    componentProps: {
      options: [
        { label: '小程序端', value: 1 },
        { label: '管理端', value: 2 }
      ]
    }
  },
  {
    field: 'gender',
    component: 'NSelect',
    label: '性别',
    componentProps: {
      options: [
        { label: '女', value: 0 },
        { label: '男', value: 1 },
        { label: '未知', value: 2 }
      ]
    }
  },
  {
    field: 'avatar',
    component: 'NUpload',
    label: '头像',
    componentProps: {
      accept: '.png,.jpg,.jpeg'
    }
  }
]
