import axios from 'axios'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem('token'))
    const [refreshToken, setRefreshToken_] = useState(
        localStorage.getItem('refreshToken')
    )

    // Function to set the authentication token
    const setToken = (newToken) => {
        setToken_(newToken)
        localStorage.setItem('token', newToken)
    }

    const logout = () => {
        setRefreshToken('')
        setToken('')
    }

    const setRefreshToken = (newToken) => {
        setRefreshToken_(newToken)
        localStorage.setItem('refreshToken', newToken)
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            localStorage.setItem('token', token)
        } else {
            delete axios.defaults.headers.common['Authorization']
            localStorage.removeItem('token')
        }
    }, [token])

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            setRefreshToken,
            logout,
        }),
        [token]
    )

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
