<script setup lang="ts">
  import { useForm } from '@/components/Form'
  import { schemasForm } from '../schemas'
  import type { IGoodsItem } from '@/api/goods/types'
  import { saveGoods } from '@/api/goods/goods'
  import schemaDataHandle from '@/components/Form/src/hooks/custom-form-data-handle'

  const emit = defineEmits(['ok', 'cancel'])
  const props = defineProps<{ goods: IGoodsItem | undefined }>()
  const schemasRef = ref(schemasForm)
  schemaDataHandle(schemasRef.value)

  const [register, { setFieldsValue }] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 2 },
    layout: 'horizontal',
    schemas: schemasForm,
    submitButtonText: '提交',
    buttonPosition: 'end'
  })

  async function submit(options: IGoodsItem) {
    console.log('%c [ options ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', options)
    // 数组转字符串
    options.categoryIds = (options.categoryIds as number[]).join(',')
    const params = {
      ...options,
      id: props.goods?.id
    }
    await saveGoods(params)
    emit('ok')
  }

  function cancel() {
    emit('cancel')
  }

  watch(
    () => props.goods,
    () => {
      if (props.goods) {
        // props.goods.categoryIds = props.goods.categoryIds.split(',').map((item) => Number(item))
        if (props.goods.categoryIds.length > 0) {
          props.goods.categoryIds = (props.goods.categoryIds as string).split(',').map((item) => Number(item))
          // const a: number[] = ((props.goods.categoryIds as string).split(',') as string[]).map((item) => Number(item))
          // props.goods.categoryIds = a as number[]
          // console.log('%c [  ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', a)
        }
        setTimeout(() => {
          setFieldsValue(props.goods!)
        }, 0)
      }
    },
    {
      immediate: true
    }
  )
</script>
<template>
  <basic-form @register="register" @submit="submit" @cancel="cancel" />
</template>
