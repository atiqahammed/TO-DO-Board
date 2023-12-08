import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4500',
})

// Add global request interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add global response interceptor
API.interceptors.response.use(
    (response) => {
        // Modify response data here, if needed
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default API
