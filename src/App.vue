<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import AddEditBoard from './components/AddEditBoard.vue'
import AddEditTask from './components/AddEditTask.vue'
import HeaderDashboard from './components/HeaderDashboard.vue'
import ShowSidebarButtonVue from './components/ShowSidebarButton.vue'
import SidebarApp from './components/SidebarApp.vue'
import TasksBoard from './components/TasksBoard.vue'
import { useRouteListener } from './stores'
import DeleteModal from './components/DeleteModal.vue'

const storeRouteListener = useRouteListener()
const { isRouterReady } = storeToRefs(storeRouteListener)
const isLoading = ref(true)

watchEffect(() => {
  if (isRouterReady.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
})
</script>

<template>
  <div class="dashboard-app">
    <div v-if="isLoading" class="loading-spinner">
      <ProgressSpinnerPrime />
    </div>
    <HeaderDashboard />
    <SidebarApp />
    <ShowSidebarButtonVue />
    <TasksBoard />
    <AddEditBoard />
    <AddEditTask />
    <DeleteModal />
  </div>
</template>

<style scoped>
.dashboard-app {
  height: 100vh;
  width: 100vw;
  background: var(--background-theme);
}

.loading-spinner {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-theme);
  z-index: 10000;
}
</style>
