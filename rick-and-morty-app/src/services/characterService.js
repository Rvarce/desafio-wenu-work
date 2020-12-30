import axios from 'axios'
const apiUrl = process.env.VUE_APP_API_URL


const characterService = {}

characterService.getCharacters = async (page = 1, status = '', gender = '', name = '') => {
    console.log({page, status, gender, name})
    try {
        const response = await axios.post(`${apiUrl}/api/character`, {page, status, gender, name})
        return response.data.data
    } catch (error) {
        const status = error.response.data.statusCode
        console.log({ status })
        return { status }
    }
}

characterService.getFavorites = async (user) => {
    console.log(user)
    const token = localStorage.getItem('user_token')
    const header = { headers: { Authorization: `bearer ${token}` } }
    try {
        const response = await axios.post(`${apiUrl}/api/character/getfavorite${idUser}`, user, header)
        return response
    } catch (error) {
        const status = error.response.data.statusCode
        console.log({ status })
        return { status }
    }
}



export default characterService