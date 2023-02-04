export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '角色名称',
    key: 'roleName',
    width: 120
  },
  {
    title: '说明',
    key: 'roleDesc',
    width: 160
  },
  // {
  //   title: '是否默认角色',
  //   key: 'isDefault',
  //   render(row) {
  //     return h(
  //       NTag,
  //       {
  //         type: row.isDefault ? 'success' : 'error'
  //       },
  //       {
  //         default: () => (row.isDefault ? '是' : '否')
  //       }
  //     )
  //   }
  // },
  {
    title: '创建时间',
    key: 'createdAt'
  }
]
