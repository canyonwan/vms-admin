import { h } from 'vue';
import { NTag } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '手机号',
    key: 'phone',
    width: 140,
  },
  {
    title: '真实姓名',
    key: 'realName',
    width: 140,
  },
  {
    title: '角色',
    key: 'roleIds',
    width: 120,
  },
  {
    title: '性别',
    key: 'gender',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          type: row.gender ? 'success' : 'error',
        },
        {
          default: () => (row.gender ? '男' : '女'),
        }
      );
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? '正常' : '禁用'),
        }
      );
    },
  },
  {
    title: '是否是超管',
    key: 'isSuperAdmin',
    width: 120,
    render(row) {
      return h(
        NTag,
        {
          type: row.isSuperAdmin ? 'success' : 'error',
        },
        {
          default: () => (row.isSuperAdmin ? '是' : '否'),
        }
      );
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 140,
  },
];
