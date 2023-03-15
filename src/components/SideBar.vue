<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar'

// toggle sidebar
const visible = ref(true)
</script>

<template>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible">
      <h2>Sidebar</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = true" />
  </div>
</template>

<style scoped></style>
