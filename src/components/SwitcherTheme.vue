<script setup lang="ts">
import { useTheme } from '@/stores'
import { storeToRefs } from 'pinia'

const storeTheme = useTheme()

const { isDark } = storeToRefs(storeTheme)

const toggleTheme = () => {
  storeTheme.toggleTheme()
}
</script>

<template>
  <div class="container-switcher">
    <img src="/icons/icon-light-theme.svg" alt="icon-light" />
    <InputSwitchPrime v-model="isDark" @click="toggleTheme" />
    <img src="/icons/icon-dark-theme.svg" alt="icon-dark" />
  </div>
</template>

<style scoped>
.container-switcher {
  background: var(--background-switcher);
  border-radius: var(--global-border-radius);
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 0;
  justify-content: center;
  margin: 0 16px;
}

.container-switcher div {
  width: 40px;
  height: 20px;
}

@media (min-width: 768px) {
  .container-switcher {
    justify-self: flex-end;
  }
}
</style>
