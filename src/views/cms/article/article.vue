<template>
  <n-card>
    <div class="n-layout-page-header">
      <basic-form @register="register" @submit="onSubmit" />
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable ref="tableRef" :columns="columns" :request="loadDataTable" :row-key="(row) => row.id" :actionColumn="actionColumn" scroll-x="1070">
        <template #tableTitle>
          <n-button type="primary" @click="addUser">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加文章
          </n-button>
        </template>
        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>
    <basic-modal @register="modalRegister" style="width: 70%">
      <save-article :article="article!" @ok="onOk" @cancel="onCancel" />
    </basic-modal>
  </n-card>
</template>

<script setup lang="ts">
  import { TableAction } from '@/components/Table'
  import { PlusOutlined } from '@vicons/antd'
  import { columns } from './columns'
  import { deleteArticle, queryArticlePage } from '@/api/cms/article'
  import { useModal } from '@/components/Modal'
  import { useDialog } from 'naive-ui'
  import { IArticleItem } from '@/api/cms/types'
  import SaveArticle from './components/save-article.vue'
  import { useForm } from '@/components/Form'
  import { searchSchemasForm } from './schemas'

  const tableRef = ref()
  const article = ref<IArticleItem>()

  const [register] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 2 },
    layout: 'inline',
    showCancelButton: false,
    schemas: searchSchemasForm,
    submitButtonText: '搜索'
  })

  interface ISearchParams {
    page: number
    size?: number
    title?: string
    publisher?: string
  }

  const searchParams = reactive<ISearchParams>({
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
  const [modalRegister, { openModal, closeModal, setProps }] = useModal({})

  const loadDataTable = async (res: any) => {
    let params = {
      ...unref(searchParams),
      ...res
    }
    return await queryArticlePage(params)
  }

  const reloadTable = (param = {}) => {
    tableRef.value.reload(param)
  }

  function onSubmit(options: IArticleItem) {
    searchParams.title = options.title
    searchParams.publisher = options.publisher
    reloadTable()
  }

  function onEdit(rows: IArticleItem) {
    article.value = rows
    openModal()
    setProps({ title: '编辑文章' })
  }

  const dialog = useDialog()
  function onDelete(row: IArticleItem) {
    dialog.error({
      title: '提示',
      content: `你确定要删除文章[${row.title}]吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await deleteArticle(row.id)
        reloadTable()
      }
    })
  }

  function addUser() {
    article.value = undefined
    openModal()
    setProps({ title: '添加文章' })
  }

  function onOk() {
    closeModal()
    reloadTable()
  }

  function onCancel() {
    closeModal()
  }
</script>
