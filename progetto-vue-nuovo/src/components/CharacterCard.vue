<template>
    <div class="character-card">
      <img :src="character.image" :alt="character.name" class="character-image" />
      <div class="character-details">
        <h2>{{ character.name }}</h2>
        <p><strong>Status:</strong> {{ character.status }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Origin:</strong> {{ character.origin.name }}</p>
        <p><strong>Location:</strong> {{ character.location.name }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  interface Character {
    id: number
    name: string
    status: string
    species: string
    origin: { name: string }
    location: { name: string }
    image: string
  }
  
  const { character } = defineProps<{
    character: Character
  }>()
  </script>
  
  <style scoped>
  .character-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    background-color: rgb(80, 80, 80);
    transition: transform 0.3s;
  }
  
  .character-card:hover {
    transform: translateY(-5px);
  }
  
  .character-image {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .character-details {
    text-align: left;
    color: whitesmoke;
  }
  </style>
  