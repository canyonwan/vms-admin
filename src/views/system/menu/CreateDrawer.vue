<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" :label-width="100">
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formData.name" />
        </n-form-item>
        <n-form-item label="路径" path="path">
          <n-input placeholder="请输入路径" v-model:value="formData.path" />
        </n-form-item>
        <n-form-item label="权限代码" path="code">
          <n-input placeholder="请输入权限，多个权限用，分割" v-model:value="formData.code" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
  import { useMessage } from 'naive-ui'
  import { savePermission } from '@/api/system/menu'
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
  export default defineComponent({
    name: 'CreateDrawer',
    props: {
      title: {
        type: String,
        default: '添加顶级菜单'
      },
      width: {
        type: Number,
        default: 450
      },
      treeItem: {
        type: Object as PropType<IPermissionItem>,
        default: () => {}
      }
    },
    emits: ['handleOk'],
    setup(props, { emit }) {
      const message = useMessage()
      const formRef: any = ref(null)
      const defaultValueRef = () => ({
        name: '',
        path: '',
        code: ''
      })

      const state = reactive({
        isDrawer: false,
        subLoading: false,
        defaultForm: defaultValueRef(),
        placement: 'right',
        alertText: '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。'
      })
      const formData = ref<IPermissionItem>({
        parentId: 0,
        name: '',
        path: '',
        code: ''
      })

      function openDrawer() {
        state.isDrawer = true
      }

      function closeDrawer() {
        state.isDrawer = false
      }

      function formSubmit() {
        formRef.value.validate(async (errors) => {
          if (!errors) {
            // update
            formData.value.id = props.treeItem && props.treeItem.id ? props.treeItem.id : undefined
            formData.value.parentId = props.treeItem.parentId
            await savePermission(formData.value)
            message.success('添加成功')
            handleReset()
            closeDrawer()
            emit('handleOk')
          } else {
            message.error('请填写完整信息')
          }
        })
      }

      function handleReset() {
        formRef.value.restoreValidation()
        formData.value = Object.assign(formData.value, defaultValueRef())
      }

      return {
        ...toRefs(state),
        formData,
        formRef,
        rules,
        formSubmit,
        handleReset,
        openDrawer,
        closeDrawer
      }
    }
  })
</script>
