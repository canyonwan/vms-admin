<template>
  <div>
    <basic-form @register="register" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
  import { useForm } from '@/components/Form';
  import { schemasForm } from '../schemas';

  const [register] = useForm({
    inline: true,
    labelWidth: 100,
    gridProps: { cols: 2 },
    buttonPosition: 'end',
    layout: 'horizontal',
    schemas: schemasForm,
    submitButtonText: '提交',
  });

  function onSubmit(options: any) {
    console.log('%c [ options ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', options);
  }
</script>
