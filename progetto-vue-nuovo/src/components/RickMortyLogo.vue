<template>
    <div class="logo" @click="goToHomePage">
      <img src="../assets/Rick_and_Morty.svg.png" alt="Rick and Morty Logo" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goToHomePage = () => {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .logo {
    text-align: center;
    margin-top: 50px;
    cursor: pointer;
  }
  
  .logo img {
    max-width: 800px;  
}
  </style>
  