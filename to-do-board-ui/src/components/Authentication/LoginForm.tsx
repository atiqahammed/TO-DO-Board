import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
    email: string
    password: string
}

function LoginForm({ loginSubmit }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    return (
        <React.Fragment>
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(loginSubmit)}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        {...register('email', {
                            required: true,
                            maxLength: 100,
                        })}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            maxLength: 100,
                        })}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </React.Fragment>
    )
}

export default LoginForm
