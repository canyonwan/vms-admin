<template>
  <n-drawer v-model:show="state.isDrawer" :width="width" :placement="state.placement">
    <n-drawer-content :title="title" closable>
      <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" :label-width="100">
        <n-form-item label="名称" path="categoryName">
          <n-input placeholder="请输入名称" v-model:value="formData.categoryName" />
        </n-form-item>
        <n-form-item label="排序" path="sort">
          <n-input placeholder="请输入排序" v-model:value="formData.sort" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="state.subLoading" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui'
  import type { IGoodsCategoryTreeItem } from '@/api/goods/types'
  import { saveGoodsCategory } from '@/api/goods/goods'

  const rules = {
    categoryName: {
      required: true,
      message: '请输入商品分类名称',
      trigger: 'change'
    },
    sort: {
      required: true,
      message: '请输入排序',
      trigger: 'blur'
    }
  }

  const props = defineProps({
    title: {
      type: String,
      default: '添加顶级菜单'
    },
    width: {
      type: Number,
      default: 450
    },
    treeItem: {
      type: Object as PropType<IGoodsCategoryTreeItem>,
      default: () => {}
    }
  })
  const emit = defineEmits(['handleOk'])

  const message = useMessage()
  const formRef: any = ref(null)
  const defaultValueRef = () => ({
    categoryName: '',
    sort: ''
  })

  const state = reactive({
    isDrawer: false,
    subLoading: false,
    defaultForm: defaultValueRef(),
    placement: 'right',
    alertText: ''
  })
  const formData = ref<IGoodsCategoryTreeItem>({
    id: 0,
    parentId: 0,
    categoryName: '',
    sort: '0'
  })

  function openDrawer() {
    state.isDrawer = true
  }

  function closeDrawer() {
    state.isDrawer = false
  }

  function formSubmit() {
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        formData.value.parentId = props.treeItem?.id || 0
        await saveGoodsCategory(formData.value)
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

  defineExpose({ openDrawer })
</script>
