import React, { Fragment, useEffect, useState } from 'react';
import LoginForm from './Authentication/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import API from '../utils/APIInstance';
import { useToasts } from 'react-toast-notifications';

function Login() {
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const { setToken, token, setRefreshToken } = useAuth();

    const loginSubmit = (data: any) => {
        API.post(`/user/login`, data).then(({data}: any) => {
            if (data.isSuccess) {
                setToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                navigate('/to-do', { replace: true });
            } else {
                addToast(
                    'Invalid Credential. Please try with valid email and password.',
                    { appearance: 'error' }
                )
            }
        })
    }

    useEffect(() => {
        if (token) {
            navigate('/to-do', { replace: true })
        }
    }, [token])

    const [isLogin, setIsLogin] = useState(true)

    return (
        <React.Fragment>
            <section className="bg-white-50 dark:bg-white-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-black-900 dark:text-black"
                    >
                        Task Board
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {isLogin
                                    ? `Sign in to your account`
                                    : `Create a new account`}
                            </h1>
                            {isLogin ? (
                                <LoginForm loginSubmit={loginSubmit} />
                            ) : (
                                <Fragment />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Login
