import axios from 'axios'
const apiUrl = process.env.VUE_APP_API_URL
const apiPort = process.env.VUE_APP_API_PORT

const authService = {}

authService.login = async (mail, password) => {
    try {
        const response = await axios.post(`${apiUrl}:${apiPort}/api/user/login`, { mail, password })
        return response
    } catch (error) {
        const status = error.response.data.statusCode
        return { status }
    }
}

authService.signup = async (user) => {
    try {
        const response = await axios.post(`${apiUrl}:${apiPort}/api/user/signup`, user)
        return response
    } catch (error) {
        console.log(error)
        const status = error.response.data.statusCode
        return { status }
    }
}

export default authService
