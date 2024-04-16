<template>
  <div id="app">
    <div class="header" @click="goToHomePage">
      <RickMortyLogo />
    </div>
    <SpeciesFilter :speciesList="speciesList" @filter="applyFilter" />
    <div class="character-list">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
      />
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <input
        type="number"
        v-model="currentPage"
        min="1"
        :max="totalPages"
        @input="fetchCharacters"
      />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import CharacterCard from './components/CharacterCard.vue'
import RickMortyLogo from './components/RickMortyLogo.vue'
import SpeciesFilter from './components/SpeciesFilter.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
const currentPage = ref(1)
const totalPages = ref(1)
const filteredCharacters = ref<Character[]>([])
let speciesList: string[] = []

const fetchCharacters = async () => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}`)
    characters.value = response.data.results
    totalPages.value = response.data.info.pages
    // Aggiorna la lista delle specie
    speciesList = Array.from(new Set(response.data.results.map((character: Character) => character.species)))
    // Applica il filtro iniziale
    applyFilter('')
  } catch (error) {
    console.error('Error fetching characters:', error)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    router.push({ query: { page: currentPage.value } })
    fetchCharacters()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    router.push({ query: { page: currentPage.value } })
    fetchCharacters()
  }
}

const goToHomePage = () => {
  router.push('/')
}

const applyFilter = (species: string) => {
  if (species === '') {
    filteredCharacters.value = characters.value
  } else {
    filteredCharacters.value = characters.value.filter(character => character.species === species)
  }
}

onMounted(fetchCharacters)

watch(currentPage, fetchCharacters)
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  margin-bottom: 20px;
  cursor: pointer;
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
