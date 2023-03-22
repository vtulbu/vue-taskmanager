<script setup lang="ts">
import { useTheme } from '@/stores'
import { storeToRefs } from 'pinia'

const themeStore = useTheme()

const { isDark } = storeToRefs(themeStore)

defineProps<{
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'p'
  text: string | undefined
  boldBody?: boolean
}>()
</script>

<template>
  <component
    v-bind:is="`${$props.as}`"
    v-bind="$attrs"
    :class="{
      xl: $props.as === 'h2',
      l: $props.as === 'h3',
      m: $props.as === 'h4',
      s: $props.as === 'h5',
      bodyL: $props.as === 'p',
      bodyM: boldBody && $props.as === 'p',
      dark: isDark
    }"
  >
    {{ $props.text || '' }}
  </component>
</template>

<style scoped>
* {
  color: var(--black);
  font-weight: 700;
  margin: 0;
}

.xl {
  font-size: 24px;
  line-height: 30px;
}
.l {
  font-size: 18px;
  line-height: 23px;
}
.m {
  font-size: 15px;
  line-height: 19px;
}

.s {
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2.4px;
  color: var(--medium-grey);
}

.bodyL {
  font-size: 13px;
  line-height: 23px;
  font-weight: 500;
  color: var(--dark-grey);
}
.bodyM {
  font-size: 12px;
  line-height: 15px;
  color: var(--dark-grey);
}

.dark {
  color: var(--white);
}
</style>
