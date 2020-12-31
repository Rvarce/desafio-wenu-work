import axios from 'axios'
const apiUrl = process.env.VUE_APP_API_URL
import store from '../store/index.js'

const characterService = {
    async getCharacters (page = 1, status = '', gender = '', name = '') {
        console.log({ page, status, gender, name })
        try {
            const response = await axios.post(`${apiUrl}/api/character`, { page, status, gender, name })
            return response.data.data
        } catch (error) {
            const status = error.response.data.statusCode
            console.log({ status })
            return { status }
        }
    },

    async getFavorites() {
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }
        console.log('token ', token)
        try {
            const response = await axios.get(`${apiUrl}/api/character/getfavorite`, header)
            return response.data
        } catch (error) {
            const status = error.response.data.statusCode
            console.log({ status })
            return { status }
        }
    },

    async saveFavorites(idCharacter) {
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }

        try {
            const response = await axios.post(`${apiUrl}/api/character/savefavorite`, {idCharacter}, header)
            return response.data
        } catch (error) {
            const status = error.response.data.statusCode
            console.log({ status })
            return { status }
        }
    },
    async deleteFavorites(idCharacter) {
        console.log('idCharacter ', idCharacter)
        const token = store.getters.token
        const header = { headers: { Authorization: `bearer ${token}` } }
        console.log('token ', token)

        try {
            const response = await axios.delete(`${apiUrl}/api/character/deletefavorite/${idCharacter}`, header)
            return response
        } catch (error) {
            const status = error.response.data.statusCode
            console.log({ status })
            return { status }
        }
    },
}

export default characterService