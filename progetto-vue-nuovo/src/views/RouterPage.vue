<template>
    <div class="router-page">
      <h1>Pagina {{ pageNumber }}</h1>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const { pageNumber }: { pageNumber: string } = defineProps()
  </script>
  
  <style scoped>
  .router-page {
    font-size: 24px;
    padding: 20px;
  }
  </style>
  