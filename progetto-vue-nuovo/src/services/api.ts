import axios from 'axios';

// Creazione di un'istanza Axios con la configurazione di base
const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api', // URL di base dell'API
  headers: {
    'Content-Type': 'application/json', // Tipo di contenuto delle richieste
  },
});

export default apiClient;
