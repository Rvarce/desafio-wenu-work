import axios from 'axios'
const apiUrl = process.env.VUE_APP_API_URL
const apiPort = process.env.VUE_APP_API_PORT
import store from '../store/index.js'

const characterService = {
    async getCharacters(page = 1, status = '', gender = '', name = '') {
        try {
            const response = await axios.post(`${apiUrl}:${apiPort}/api/character`, { page, status, gender, name })
            return response.data.data
        } catch (error) {
            const status = error.response.data.statusCode
            return { status }
        }
    },

    async getFavorites() {
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }
        try {
            const response = await axios.get(`${apiUrl}:${apiPort}/api/character/getfavorite`, header)
            return response.data
        } catch (error) {
            const status = error.response.data.statusCode
            return { status }
        }
    },

    async saveFavorites(idCharacter) {
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }
        try {
            const response = await axios.post(`${apiUrl}:${apiPort}/api/character/savefavorite`, { idCharacter }, header)
            return response.data
        } catch (error) {
            const status = error.response.data.statusCode
            return { status }
        }
    },
    async deleteFavorites(idCharacter) {
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }
        try {
            const response = await axios.delete(`${apiUrl}:${apiPort}/api/character/deletefavorite/${idCharacter}`, header)
            return response
        } catch (error) {
            const status = error.response.data.statusCode
            return { status }
        }
    },
}

export default characterService