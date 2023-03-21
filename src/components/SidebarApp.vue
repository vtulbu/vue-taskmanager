<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useScreenSize, useSidebar } from '@/stores'
import ContentSidebar from './ContentSidebar.vue'

const storeSideBar = useSidebar()
const storeScreenSize = useScreenSize()

const { isSidebarOpen } = storeToRefs(storeSideBar)
const { isMobile } = storeToRefs(storeScreenSize)
</script>

<template>
  <DialogPrime v-if="isMobile" v-model:visible="isSidebarOpen" modal position="top">
    <ContentSidebar />
  </DialogPrime>
  <SidebarPrime
    v-model:visible="isSidebarOpen"
    v-if="!isMobile"
    v-bind:dismissable="false"
    v-bind:modal="false"
  >
    <ContentSidebar />
  </SidebarPrime>
</template>

<style scoped></style>
