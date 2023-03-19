<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useScreenSize } from '@/stores'
import SwitcherTheme from './SwitcherTheme.vue'
import HideSidebarButton from './HideSidebarButton.vue'
import ContainerBoardsVue from './ContainerBoards.vue'

const storeScreenSize = useScreenSize()

const { isMobile } = storeToRefs(storeScreenSize)
</script>

<template>
  <div class="content-sidebar">
    <ContainerBoardsVue />
    <div>
      <SwitcherTheme />
      <HideSidebarButton v-if="!isMobile" />
    </div>
  </div>
</template>

<style scoped>
.content-sidebar {
  margin: 16px 0;
}

@media (min-width: 768px) {
  .content-sidebar {
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
