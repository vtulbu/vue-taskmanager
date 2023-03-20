<script setup lang="ts">
import AddEditBoard from './components/AddEditBoard.vue'
import AddEditTask from './components/AddEditTask.vue'
import HeaderDashboard from './components/HeaderDashboard.vue'
import ShowSidebarButtonVue from './components/ShowSidebarButton.vue'
import SidebarApp from './components/SidebarApp.vue'
import TasksBoard from './components/TasksBoard.vue'
</script>

<template>
  <div class="dashboard-app">
    <HeaderDashboard />
    <SidebarApp />
    <ShowSidebarButtonVue />
    <TasksBoard />
    <AddEditBoard />
    <AddEditTask />
  </div>
</template>

<style scoped>
.dashboard-app {
  height: 100vh;
  width: 100vw;
  background: var(--background-theme);
}
</style>
