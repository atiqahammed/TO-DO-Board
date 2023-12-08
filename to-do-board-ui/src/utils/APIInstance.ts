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
    async (error) => {
        const originalRequest = error.config

        // If the error status is 401,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refresh_token = localStorage.getItem('refreshToken')
                const response = await axios.post('/user/refresh-token', {
                    refreshToken: refresh_token,
                })
                const { accessToken, refreshToken } = response.data

                localStorage.setItem('token', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return axios(originalRequest)
            } catch (error) {
                // Handle refresh token error or redirect to login
            }
        }
    }
)

export default API
