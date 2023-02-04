<template>
  <div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable :columns="columns" :request="loadDataTable" :row-key="(row: IRoleItem) => row.id" ref="actionRef" :actionColumn="actionColumn">
        <template #tableTitle>
          <n-button type="primary" @click="onSaveRole">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加角色
          </n-button>
        </template>

        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <basic-modal @register="modalRegister" style="width: 70%">
      <save-role @cancel="onCancel" @ok="onOk" :item="role" />
    </basic-modal>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="editRoleTitle">
      <div class="py-3 menu-list">
        <n-tree
          label-field="name"
          key-field="id"
          block-line
          checkable
          :virtual-scroll="true"
          :data="treeData"
          :expandedKeys="expandedKeys"
          :checked-keys="checkedKeys"
          style="max-height: 950px; overflow: hidden"
          @update:checked-keys="onCheckedTree"
          @update:expanded-keys="onExpandedKeys"
        />
      </div>
      <template #action>
        <n-space>
          <n-button type="info" ghost icon-placement="left" @click="packHandle"> 全部{{ expandedKeys.length ? '收起' : '展开' }} </n-button>

          <n-button type="info" ghost icon-placement="left" @click="checkedAllHandle"> 全部{{ checkedAll ? '取消' : '选择' }} </n-button>
          <n-button type="primary" :loading="formBtnLoading" @click="confirmForm">提交</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { useDialog, useMessage } from 'naive-ui'
  import { BasicTable, TableAction } from '@/components/Table'
  import { bindRolePermissions, deleteRole, getRoleList, queryBoundMenus } from '@/api/system/role'
  import { columns } from './columns'
  import { PlusOutlined } from '@vicons/antd'
  import { getTreeAll } from '@/utils'
  import type { IPermissionItem, IRoleItem } from '@/api/system/types'
  import { queryPermissionList } from '@/api/system/menu'
  import { useModal } from '@/components/Modal'
  import SaveRole from './components/save-role.vue'

  const message = useMessage()
  const actionRef = ref()
  const role = ref<IRoleItem>()
  const showModal = ref(false)
  const formBtnLoading = ref(false)
  const checkedAll = ref(false)
  const editRoleTitle = ref('')
  const roleId = ref()
  const treeData = ref<IPermissionItem[]>([])
  const expandedKeys = ref<number[]>([])
  const checkedKeys = ref<number[]>([])

  const [modalRegister, { openModal, closeModal, setProps }] = useModal({})

  const params = reactive({
    page: 1
  })

  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: IRoleItem) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: '菜单权限',
            type: 'info',
            onClick: handleMenuAuth.bind(null, record)
          },
          {
            label: '编辑',
            type: 'primary',
            onClick: handleEdit.bind(null, record)
          },
          {
            label: '删除',
            type: 'error',
            onClick: handleDelete.bind(null, record)
          }
        ]
      })
    }
  })

  const loadDataTable = async (res: any) => {
    let _params = {
      ...unref(params),
      ...res
    }
    return await getRoleList(_params)
  }

  function reloadTable() {
    actionRef.value.reload()
  }

  async function confirmForm(e: any) {
    e.preventDefault()
    formBtnLoading.value = true
    await bindRolePermissions({
      roleId: roleId.value,
      permissionIds: checkedKeys.value.join(',')
    })
    formBtnLoading.value = false
    message.success('绑定成功')
    showModal.value = false
  }

  function handleEdit(record: IRoleItem) {
    role.value = record
    setProps({ title: '编辑角色' })
    openModal()
  }

  const dialog = useDialog()
  function handleDelete(record: IRoleItem) {
    dialog.info({
      title: '提示',
      content: `您确定想删除[${record.roleName}]角色吗?`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteRole(record.id!)
        message.success('删除成功')
        reloadTable()
      }
    })
  }

  function handleMenuAuth(record: IRoleItem) {
    editRoleTitle.value = `分配 ${record.roleName} 的菜单权限`
    roleId.value = record.id!
    showModal.value = true
    getBoundMenu()
  }

  async function getBoundMenu() {
    const { list } = await queryBoundMenus(roleId.value)
    checkedKeys.value = list.map((item: number) => item)
  }

  function onCheckedTree(keys: number[]) {
    checkedKeys.value = keys
    // checkedKeys.value = [checkedKeys.value, ...keys]
  }

  function onExpandedKeys(keys: number[]) {
    expandedKeys.value = keys
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = []
    } else {
      expandedKeys.value = treeData.value.map((item: IPermissionItem) => item.id) as []
    }
  }

  function checkedAllHandle() {
    if (!checkedAll.value) {
      checkedKeys.value = getTreeAll(treeData.value)
      checkedAll.value = true
    } else {
      checkedKeys.value = []
      checkedAll.value = false
    }
  }

  onMounted(() => loadPermissionData())

  async function loadPermissionData() {
    const { list } = await queryPermissionList()
    expandedKeys.value = list.map((item) => item.id!)
    treeData.value = list
  }

  function onSaveRole() {
    setProps({ title: '新增角色' })
    openModal()
    role.value = undefined
  }

  function onOk() {
    reloadTable()
    closeModal()
  }

  function onCancel() {
    closeModal()
  }
</script>
