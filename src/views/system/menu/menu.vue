<template>
  <div>
    <n-grid class="mt-4" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <!-- 添加菜单 -->
      <n-gi span="1">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-dropdown trigger="hover" @select="selectAddMenu" :options="addMenuOptions">
                <n-button type="info" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <n-icon size="14">
                        <DownOutlined />
                      </n-icon>
                    </div>
                  </template>
                </n-button>
              </n-dropdown>
              <n-button type="info" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined />
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>
          <div class="w-full menu">
            <n-input type="input" v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  label-field="name"
                  key-field="id"
                  block-line
                  cascade
                  checkable
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="treeData"
                  :expandedKeys="expandedKeys"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                  @update:expanded-keys="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <!-- 编辑菜单 -->
      <n-gi span="2">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-icon size="18">
                <FormOutlined />
              </n-icon>
              <span>编辑菜单{{ treeItem ? `：${treeItem.name}` : '' }}</span>
            </n-space>
          </template>
          <n-alert type="info" closable> 从菜单列表选择一项后，进行编辑</n-alert>
          <n-form :model="state.formData" :rules="rules" ref="formRef" label-placement="left" :label-width="100" v-if="isEditMenu" class="py-4">
            <n-form-item label="类型" path="type">
              <span>{{ '侧边栏菜单' }}</span>
            </n-form-item>
            <n-form-item label="名称" path="name">
              <n-input placeholder="请输入名称" v-model:value="state.formData.name" />
            </n-form-item>
            <n-form-item label="路径" path="path">
              <n-input placeholder="请输入路径" v-model:value="state.formData.path" />
            </n-form-item>
            <n-form-item label="权限代码" path="code">
              <n-input placeholder="请输入权限，多个权限用，分割" v-model:value="state.formData.code" />
            </n-form-item>
            <n-form-item path="auth" style="margin-left: 100px">
              <n-space>
                <n-button type="primary" :loading="subLoading" @click="formSubmit">保存修改</n-button>
                <n-button @click="handleReset">重置</n-button>
                <n-button @click="handleDel">删除</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
    <CreateDrawer ref="createDrawerRef" :tree-item="treeItem" :title="drawerTitle" @handle-ok="onOk" />
  </div>
</template>
<script lang="ts" setup>
  import { useDialog, useMessage } from 'naive-ui'
  import { DownOutlined, AlignLeftOutlined, SearchOutlined, FormOutlined } from '@vicons/antd'
  import { getTreeItem } from '@/utils'
  import CreateDrawer from './CreateDrawer.vue'
  import { deletePermission, queryPermissionTree, savePermission } from '@/api/system/menu'
  import type { IPermissionItem } from '@/api/system/types'

  const rules = {
    name: {
      required: true,
      message: '请输入权限名称',
      trigger: 'change'
    },
    code: {
      required: true,
      message: '请输入权限代码',
      trigger: 'blur'
    },
    path: {
      required: true,
      message: '请输入路径',
      trigger: 'blur'
    }
  }

  const formRef: any = ref(null)
  const createDrawerRef = ref()
  const message = useMessage()
  const dialog = useDialog()

  const treeItemKey = ref<number[]>([])

  const expandedKeys = ref<number[]>([])

  const treeData = ref<IPermissionItem[]>([])

  const defaultValue = () => ({
    parentId: 0,
    name: '',
    code: '',
    path: ''
  })

  const loading = ref(true)
  const subLoading = ref(false)
  const isEditMenu = ref(false)
  const treeItem = ref<IPermissionItem>()
  const pattern = ref('')
  const drawerTitle = ref('')

  const isAddSon = computed(() => {
    return !treeItemKey.value.length
  })

  const addMenuOptions = ref([
    {
      label: '添加顶级菜单',
      key: 'home',
      disabled: false
    },
    {
      label: '添加子菜单',
      key: 'son',
      disabled: isAddSon
    }
  ])

  const state = reactive({
    formData: defaultValue()
  })

  function selectAddMenu(key: string) {
    drawerTitle.value = key === 'home' ? '添加顶栏菜单' : `添加子菜单：${treeItem.value!.name}`
    openCreateDrawer()
  }

  function openCreateDrawer() {
    const { openDrawer } = createDrawerRef.value
    openDrawer()
  }

  function onOk() {
    loadData()
    // const { openDrawer } = createDrawerRef.value
    // openDrawer()
  }

  function selectedTree(keys: number[]) {
    if (keys.length) {
      treeItem.value = getTreeItem(unref(treeData), keys[0])
      treeItemKey.value = keys
      // treeItemTitle.value = treeItem.value!.name
      Object.assign(state.formData, treeItem.value)
      isEditMenu.value = true
    } else {
      isEditMenu.value = false
      treeItemKey.value = []
      treeItem.value = undefined
      // treeItemTitle.value = ''
    }
  }

  function handleDel() {
    dialog.info({
      title: '提示',
      content: `您确定想删除[${treeItem.value!.name}]权限吗?`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deletePermission(treeItem.value!.id!)
        loadData()
        isEditMenu.value = false
        treeItemKey.value = []
        treeItem.value = undefined
        // treeItemTitle.value = ''
        // treeItem.value!.id! = 0
        // treeItemId.value = 0
        message.success('删除成功')
      }
    })
  }

  function handleReset() {
    formRef.value.restoreValidation()
    Object.assign(state.formData, defaultValue())
  }

  function formSubmit() {
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        await savePermission(state.formData)
        message.success('修改成功')
        loadData()
      } else {
        message.error('请填写完整信息')
      }
    })
  }

  function onExpandedKeys(keys: number[]) {
    expandedKeys.value = keys
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = []
    } else {
      expandedKeys.value = unref(treeData).map((item: IPermissionItem) => item.id!)
    }
  }

  onMounted(() => {
    loadData()
  })

  async function loadData() {
    const { list } = await queryPermissionTree()
    const keys = list.map((item: IPermissionItem) => item.id)
    Object.assign(state.formData, keys)
    treeData.value = list
    loading.value = false
  }
</script>
