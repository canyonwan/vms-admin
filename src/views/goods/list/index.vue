<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="商品搜索"> 搜索 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable :columns="columns" :request="loadDataTable" :row-key="(row) => row.id" ref="actionRef" :actionColumn="actionColumn" scroll-x="1070">
        <template #tableTitle>
          <n-button type="primary" @click="addGoods">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加商品
          </n-button>
        </template>
        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>
    <basic-modal @register="modalRegister" style="width: 70%">
      <save-goods :goods="goods" @ok="onOk" @cancel="onCancel" />
    </basic-modal>
  </div>
</template>

<script setup lang="ts">
  import { TableAction } from '@/components/Table'
  import { PlusOutlined } from '@vicons/antd'
  import { columns } from './columns'
  import { useModal } from '@/components/Modal'
  import { useDialog } from 'naive-ui'
  import { deleteGoods, queryGoodsPage } from '@/api/goods/goods'
  import { IGoodsItem } from '@/api/goods/types'
  import SaveGoods from '@/views/goods/list/components/SaveGoods.vue'

  const actionRef = ref()
  const goods = ref<IGoodsItem>()
  const searchParams = reactive({
    page: 1,
    name: '',
    price: ''
  })

  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: IGoodsItem) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: record.status ? '下架' : '上架',
            type: record.status ? 'error' : 'success',
            onClick: onChangeStatus.bind(null, record)
          },
          {
            label: '编辑',
            type: 'primary',
            onClick: onEdit.bind(null, record)
          },
          {
            label: '删除',
            type: 'error',
            onClick: onDelete.bind(null, record)
          }
        ]
      })
    }
  })
  const [modalRegister, { openModal, setProps, closeModal }] = useModal({})

  const loadDataTable = async (res: any) => {
    let params = {
      ...unref(searchParams),
      ...res
    }
    return await queryGoodsPage(params)
  }

  function reloadTable() {
    actionRef.value.reload()
  }

  function onChangeStatus(rows: IGoodsItem) {
    console.log('%c [ rows ]-90', 'font-size:13px; background:pink; color:#bf2c9f;', rows)
  }

  function onOk() {
    reloadTable()
    closeModal()
  }

  function onCancel() {
    closeModal()
  }

  function onEdit(rows: IGoodsItem) {
    goods.value = rows
    openModal()
    setProps({ title: '编辑商品' })
  }

  const dialog = useDialog()
  function onDelete(row: IGoodsItem) {
    dialog.error({
      title: '提示',
      content: `你确定要删除商品[${row.name}]吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteGoods(row.id!)
        reloadTable()
      }
    })
  }

  function addGoods() {
    goods.value = undefined
    openModal()
    setProps({ title: '添加商品' })
  }
</script>
