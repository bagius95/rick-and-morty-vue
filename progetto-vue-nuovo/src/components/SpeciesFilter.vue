<template>
    <div class="species-filter">
      <select v-model="selectedSpecies" @change="applyFilter">
        <h2>Select species</h2>
        <option value="">All Species</option>
        <option v-for="species in speciesList" :value="species" :key="species">{{ species }}</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue'
  
  const { speciesList }: { speciesList: string[] } = defineProps({
    speciesList: {
      type: Array as () => string[],
      required: true
    }
  })
  
  const emit = defineEmits(['filter'])
  
  const selectedSpecies = ref('')
  
  const applyFilter = () => {
    emit('filter', selectedSpecies.value)
  }
  </script>
  
  <style scoped>
  .species-filter {
    margin-bottom: 20px;
  }
  
  select {
    padding: 5px;
    font-size: 16px;
  }
  </style>
  