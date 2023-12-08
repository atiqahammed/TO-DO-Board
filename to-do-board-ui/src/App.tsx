import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import ToDoMaster from './components/ToDo/ToDoMaster'
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
                            <Route path="to-do" element={<ToDoMaster />} />
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    )
}

export default App
