<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="角色权限管理"> 搜索 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        scroll-x="1070"
      >
        <template #tableTitle>
          <n-button type="primary" @click="addUser">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加用户
          </n-button>
        </template>
        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>
    <basic-modal @register="modalRegister" style="width: 70%">
      <save-user />
    </basic-modal>
  </div>
</template>

<script setup lang="ts">
  import { TableAction } from '@/components/Table'
  import { PlusOutlined } from '@vicons/antd'
  import { columns } from './columns'
  import { getUserList } from '@/api/system/user'
  import { useModal } from '@/components/Modal'
  import SaveUser from './components/SaveUser.vue'

  const searchParams = reactive({
    page: 1
  })

  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: !record.status ? '禁用' : '启用',
            type: record.status ? 'success' : 'error',
            onClick: handleMenuAuth.bind(null, record)
          },
          {
            label: '编辑',
            type: 'primary',
            onClick: handleMenuAuth.bind(null, record)
          },
          {
            label: '删除',
            type: 'error',
            onClick: handleMenuAuth.bind(null, record)
          }
        ]
      })
    }
  })
  const [modalRegister, { openModal, setProps }] = useModal({})

  const loadDataTable = async (res: any) => {
    let params = {
      ...unref(searchParams),
      ...res
    }
    return await getUserList(params)
  }

  function handleMenuAuth(rows: any) {
    console.log('%c [ rows ]-87', 'font-size:13px; background:pink; color:#bf2c9f;', rows)
  }

  function addUser() {
    openModal()
    setProps({ title: '添加用户' })
  }
</script>
