<script setup lang="ts">
defineProps<{
  boardName: string
}>()
</script>

<template>
  <header>
    <p class="green">{{ boardName }}</p>
  </header>
</template>

<style scoped></style>
