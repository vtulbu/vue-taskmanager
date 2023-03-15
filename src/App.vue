<script setup lang="ts">
import { ref } from 'vue'
import HeaderDashboard from './components/HeaderDashboard.vue'
import Sidebar from './components/SideBar.vue'
import Button from 'primevue/button'

const toggleTheme = ref(localStorage.getItem('theme') === 'dark')

const changeTheme = () => {
  console.log('theme', toggleTheme)
  if (toggleTheme.value) {
    document.getElementById('theme-link')?.setAttribute('href', '/themes/dark.css')
  } else {
    document.getElementById('theme-link')?.setAttribute('href', '/themes/light.css')
  }
  toggleTheme.value = !toggleTheme.value
  localStorage.setItem('theme', toggleTheme.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="dashboard-app">
    <HeaderDashboard boardName="test" />
    <Sidebar />
    <Button icon="pi pi-arrow-right" @click="changeTheme">Change</Button>
  </div>
</template>

<style scoped>
.dashboard-app {
  height: 100vh;
  width: 100vw;
}
</style>
