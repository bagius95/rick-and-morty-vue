<template>
  <div class="home">
    <div class="header">
      <img src="../assets/Rick_and_Morty.svg.png" alt="Rick and Morty Logo" @click="goToHomePage" />
    </div>
    <div class="character-list">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <input
        type="number"
        v-model="currentPage"
        min="1"
        :max="totalPages"
      />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../services/api'
import CharacterCard from '../components/CharacterCard.vue'

interface Character {
  id: number
  name: string
  status: string
  species: string
  origin: { name: string }
  location: { name: string }
  image: string
}

const characters = ref<Character[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)
const router = useRouter()

const fetchCharacters = async () => {
  try {
    const response = await apiClient.get(`/character/?page=${currentPage.value}`)
    characters.value = response.data.results
    totalPages.value = response.data.info.pages
    router.push({ params: { page: currentPage.value.toString() } })
  } catch (error) {
    console.error('Error fetching characters:', error)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchCharacters()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchCharacters()
  }
}

const goToHomePage = () => {
  router.push('/')
}

onMounted(fetchCharacters)
watch(currentPage, fetchCharacters)
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  margin-bottom: 50px;
}

.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination {
  margin-top: auto;
  margin-bottom: 20px;
}

button {
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
