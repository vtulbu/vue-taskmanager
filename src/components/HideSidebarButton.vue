<script setup lang="ts">
import { useSidebar } from '@/stores'
import IconHideSidebar from './icons/IconHideSidebar.vue'

const storeSidebar = useSidebar()

const toggleSidebar = () => {
  storeSidebar.toggleSidebar()
}
</script>

<template>
  <button @click="toggleSidebar" class="hide-sidebar">
    <IconHideSidebar />
    Hide Sidebar
  </button>
</template>

<style scoped>
.hide-sidebar {
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: var(--medium-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 6px;
  border-radius: var(--global-border-radius);
  margin: 20px 18px 0;
}

.hide-sidebar:hover {
  cursor: pointer;
  background-color: var(--hover-item-boards);
}

@media (min-width: 768px) {
  .hide-sidebar {
    justify-self: flex-start;
  }
}
</style>
