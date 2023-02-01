<template>
  <basic-form @register="register" @submit="onSubmit" @cancel="cancel" />
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form'
  import { schemasForm } from '../schemas'
  import { saveArticle } from '@/api/cms/article'
  import type { IArticleItem, ISaveArticleParams } from '@/api/cms/types'

  const emit = defineEmits(['ok', 'cancel'])
  const props = defineProps<{ article: IArticleItem }>()

  const [register, { setFieldsValue }] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 2 },
    buttonPosition: 'end',
    layout: 'horizontal',
    schemas: schemasForm,
    submitButtonText: '提交'
  })

  async function onSubmit(options: ISaveArticleParams) {
    if (props.article && props.article.id) {
      Object.assign(options, { id: props.article.id })
    }
    await saveArticle(options)
    emit('ok')
  }

  function cancel() {
    emit('cancel')
  }

  watch(
    () => props.article,
    () => {
      if (props.article)
        setTimeout(() => {
          setFieldsValue(props.article)
        }, 0)
    },
    {
      immediate: true
    }
  )
</script>
