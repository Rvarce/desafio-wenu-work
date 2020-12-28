import axios from 'axios'
const apiUrl = process.env.VUE_APP_API_URL


const authService = {}

authService.login = async (mail, password) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/login`, { mail, password })
        return response
    } catch (error) {
        const status = error.response.data.statusCode
        console.log({ status })
        return { status }
    }
}

authService.signup = async (user) => {
    console.log(user)
    try {
        const response = await axios.post(`${apiUrl}/api/user/signup`, user)
        return response
    } catch (error) {
        const status = error.response.data.statusCode
        console.log({ status })
        return { status }
    }
}



export default authService