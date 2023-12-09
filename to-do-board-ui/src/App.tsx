import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Authentication/Login'
import TaskBoard from './components/TaskBoard/TaskBoard'
import NoPage from './components/NoPage'
import AuthProvider from './provider/AuthProvider'
import { ToastProvider } from 'react-toast-notifications'

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Login />} />
                            <Route path="to-do" element={<TaskBoard />} />
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    )
}

export default App
