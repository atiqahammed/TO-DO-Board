import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4500',
})

// Add global request interceptor
API.interceptors.request.use(
    (config) => {
        // Modify request config here, e.g., add headers
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
