import { FormSchema } from '@/components/Form/src/types/form'

export const schemasForm: FormSchema[] = [
  {
    field: 'roleName',
    component: 'NInput',
    label: '角色名称',
    componentProps: {}
  },
  {
    field: 'roleDesc',
    component: 'NInput',
    label: '描述',
    componentProps: {}
  }
]
