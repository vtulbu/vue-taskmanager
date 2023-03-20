<script setup lang="ts">
import { useTheme } from '@/stores'
import { storeToRefs } from 'pinia'

const storeTheme = useTheme()

const { isDark } = storeToRefs(storeTheme)

defineEmits<{
  (event: 'update:value', ...args: any[]): void
}>()

defineProps<{
  value: string
  labelText?: string
  helperText?: string
  error?: boolean
  placeholder?: string
  textArea?: {
    rows: number
    cols: number
  }
}>()
</script>

<template>
  <div class="textfield-container">
    <label v-if="labelText" class="label-textfield" :class="{ darkLabel: isDark }">{{
      labelText
    }}</label>
    <TextareaPrime
      v-if="Boolean(textArea?.rows)"
      autoResize
      v-bind:rows="textArea?.rows"
      v-bind:cols="textArea?.cols"
      class="textfield"
      v-bind:placeholder="placeholder"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
    <InputTextPrime
      v-if="Boolean(!textArea?.rows)"
      class="textfield"
      v-bind:placeholder="placeholder"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
    <p class="helper-text" :class="{ errorHelper: error }">{{ helperText }}</p>
  </div>
</template>

<style scoped>
.textfield-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.textfield {
  height: 40px;
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  background: none;
}

.helper-text {
  position: absolute;
  right: 16px;
  top: 16px;
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
}

.errorHelper {
  color: var(--red-hover);
}
</style>
