import { FormSchema } from '@/components/Form/src/types/form'

export const searchSchemasForm: FormSchema[] = [
  {
    field: 'title',
    component: 'NInput',
    label: '标题'
  },
  {
    field: 'publisher',
    component: 'NInput',
    label: '发布者'
  }
]
export const schemasForm: FormSchema[] = [
  {
    field: 'title',
    component: 'NInput',
    label: '标题',
    rules: [{ required: true, message: '请输入标题', type: 'string' }]
  },
  {
    field: 'desc',
    component: 'NInput',
    label: '摘要',
    componentProps: {}
  },
  {
    field: 'content',
    component: 'NInput',
    label: '内容',
    rules: [{ required: true, message: '请输入内容', type: 'string' }],
    componentProps: {
      type: 'textarea'
    }
  }
]
