<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useTheme } from '@/stores'
import { computed } from 'vue'

const storeBoards = useBoards()
const storeTheme = useTheme()
const { selectedItem } = storeToRefs(storeBoards)
const { isDark } = storeToRefs(storeTheme)

const columns = computed(() => {
  return selectedItem.value?.columns.map((item) => item)
})

defineProps<{
  value: string | null
  label: string
}>()
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <label class="label-textfield" :class="{ darkLabel: isDark }">{{ label }}</label>
    <DropdownPrime
      @change="$emit('update:value', $event.value)"
      :modelValue="value"
      placeholder="Select a Column"
      :options="columns"
      optionLabel="label"
      optionValue="id"
      dataKey="id"
    />
  </div>
</template>

<style scoped></style>
