<template>
  <div>
    <basic-form @register="register" @submit="onSubmit" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form'
  import { schemasForm } from '../schemas'
  import schemaDataHandle from '@/components/Form/src/hooks/custom-form-data-handle'

  const emit = defineEmits(['cancel'])
  const schemasRef = ref(schemasForm)
  schemaDataHandle(schemasRef.value)

  const [register] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 2 },
    buttonPosition: 'end',
    layout: 'horizontal',
    schemas: schemasForm,
    submitButtonText: '提交'
  })

  function onSubmit(options: any) {
    console.log('%c [ options ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', options)
  }

  function onCancel() {
    emit('cancel')
  }
</script>
