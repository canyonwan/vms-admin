import { FormSchema } from '@/components/Form/src/types/form';

export const schemasForm: FormSchema[] = [
  {
    field: 'phone',
    component: 'NInput',
    label: '手机',
    componentProps: {},
  },
  {
    field: 'realName',
    component: 'NInput',
    label: '真实姓名',
    componentProps: {},
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '状态',
    componentProps: {
      options: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
];
