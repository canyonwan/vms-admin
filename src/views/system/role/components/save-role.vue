<template>
  <div>
    <basic-form @register="register" @submit="onSubmit" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form'
  import { schemasForm } from '../schemas'
  import type { IRoleItem } from '@/api/system/types'
  import { saveRole } from '@/api/system/role'
  const emit = defineEmits(['cancel', 'ok'])
  const props = defineProps({
    item: {
      type: Object as PropType<IRoleItem>,
      default: () => {}
    }
  })

  const [register, { setFieldsValue }] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 1 },
    buttonPosition: 'end',
    layout: 'horizontal',
    schemas: schemasForm,
    submitButtonText: '提交'
  })

  async function onSubmit(options: IRoleItem) {
    console.log('%c [ options ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', options)
    if (props.item && props.item.id) {
      Object.assign(options, { id: props.item.id })
    }
    await saveRole(options)
    emit('ok')
  }

  function onCancel() {
    emit('cancel')
  }

  watch(
    () => props.item,
    (val) => {
      if (val) {
        setTimeout(() => setFieldsValue(val), 0)
      }
    },
    {
      immediate: true
    }
  )
</script>
