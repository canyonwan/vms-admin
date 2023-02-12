import { FormSchema } from '@/components/Form/src/types/form'
import { NCascader } from 'naive-ui'

export const schemasForm: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '商品名称',
    giProps: {
      span: 2
    },
    componentProps: {},
    rules: [{ required: true, message: '请输入商品名称', type: 'string', trigger: ['blur', 'change'] }]
  },
  {
    field: 'desc',
    component: 'NInput',
    label: '商品描述',
    giProps: {
      span: 2
    },
    componentProps: {
      type: 'textarea'
    },
    rules: [{ required: true, message: '请输入商品描述', type: 'string', trigger: ['blur', 'change'] }]
  },
  {
    field: 'price',
    component: 'NInputNumber',
    label: '商品价格',
    componentProps: {
      precision: '2',
      placeholder: '请输入商品价格'
    },
    rules: [{ required: true, message: '请输入商品价格', type: 'number', trigger: ['blur', 'change'] }]
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '商品状态',
    componentProps: {
      options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 }
      ]
    }
  },
  {
    field: 'categoryIds',
    componentSource: shallowRef(NCascader),
    label: '商品分类',
    giProps: { span: 1 },
    componentDataSourceType: 'goodsCategory',
    componentProps: {
      checkable: true,
      placeholder: '请选择商品分类',
      separator: '->',
      checkStrategy: 'all',
      cascade: true
    },
    rules: [{ required: true, message: '请输入商品分类', type: 'array', trigger: ['blur', 'change'] }]
  },
  // {
  //   field: 'twoLevelId',
  //   component: 'NSelect',
  //   label: '二级分类',
  //   giProps: {
  //     span: 1
  //   },
  //   componentProps: {}
  // },
  // {
  //   field: 'threeLevelId',
  //   component: 'NSelect',
  //   label: '三级分类',
  //   giProps: {
  //     span: 1
  //   },
  //   componentProps: {}
  // },
  {
    field: 'cover',
    component: 'NUpload',
    label: '商品主图',
    giProps: {
      span: 2
    },
    componentProps: {
      accept: '.png,.jpg,.jpeg'
    }
  }
]
