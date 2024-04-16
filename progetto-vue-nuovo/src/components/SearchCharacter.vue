<template>
    <div class="search">
      <input type="text" v-model="searchText" @input="searchCharacters" placeholder="Search characters...">
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  interface Character {
    id: number
    name: string
    status: string
    species: string
    origin: { name: string }
    location: { name: string }
    image: string
  }
  
  const searchText = ref('')
  const characters = ref<Character[]>([])
  const filteredCharacters = ref<Character[]>([])
  
  const searchCharacters = () => {
    if (searchText.value.trim() === '') {
      filteredCharacters.value = characters.value
    } else {
      filteredCharacters.value = characters.value.filter(character =>
        character.name.toLowerCase().includes(searchText.value.toLowerCase())
      )
    }
  }
  
  watch(characters, searchCharacters)
  
  </script>
  
  <style scoped>
  .search {
    margin-bottom: 20px;
  }
  </style>
  