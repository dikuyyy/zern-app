<script setup lang="ts">

const props = defineProps<{
  modelValue: boolean,
  title: string;
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
  (e: 'submit'): void;
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emits('update:modelValue', value)
  }
})

const title = computed(() => {
  return props.title;
})

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
</script>

<template>
  <AlertDialog v-model:open="model">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{title}}</AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="description"></slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="emits('submit')">Sure</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>