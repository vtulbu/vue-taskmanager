<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useScreenSize, useSidebar } from '@/stores'
import IconShowSidebarVue from './icons/IconShowSidebar.vue'

const storeSidebar = useSidebar()
const storeScreenSize = useScreenSize()

const { isSidebarOpen } = storeToRefs(storeSidebar)
const { isMobile } = storeToRefs(storeScreenSize)

const toggleSidebar = () => {
  storeSidebar.toggleSidebar()
}
</script>

<template>
  <button @click="toggleSidebar" class="show-sidebar" v-if="!isMobile && !isSidebarOpen">
    <IconShowSidebarVue />
  </button>
</template>

<style scoped>
.show-sidebar {
  width: 56px;
  height: 56px;
  padding: 19px;
  background: var(--main-purple);
  border-radius: 0px 100px 100px 0px;
  position: absolute;
  bottom: 2rem;
  z-index: 1000;
}

.show-sidebar:hover {
  cursor: pointer;
  background-color: var(--main-purple-hover);
}
</style>
