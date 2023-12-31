import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import API from '../../utils/APIInstance'
import { useToasts } from 'react-toast-notifications'
import { ITask } from '../../interfaces/iTastItem'
import TaskHistory from '../TaskBoard/TaskHistory'

type Inputs = {
    title: string
    description: string
    expiryDate: string
}

export default function ViewTaskModal({
    loadTask,
    task,
    showModal,
    setShowModal,
    draftTask,
}: any) {
    const { addToast } = useToasts()
    const [loading, setLoading] = useState(false)
    const saveTask = (data: any) => {
        const requestBody: ITask = {
            id: task.id,
            categoryId: task.categoryId,
            title: data.title,
            expiryDate: data.expiryDate,
            description: data.description,
        }
        setLoading(true)
        API.post(`/task/update`, requestBody)
            .then(({ data }) => {
                setLoading(false)
                if (data.isSuccess) {
                    setShowModal(false)
                    addToast(`Task Updated`, { appearance: 'success' })
                    reset()
                    loadTask()
                } else {
                    addToast(`Something went wrong`, { appearance: 'error' })
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                addToast(`Something went wrong`, { appearance: 'error' })
            })
    }

    var expiryDate = new Date(task.expiryDate)
    var expiryDateISOString = expiryDate.toISOString().substring(0, 10)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        values: {
            title: task?.title ? task?.title : '',
            description: task?.description ? task?.description : '',
            expiryDate: expiryDateISOString,
        },
    })

    const closeModal = () => {
        const formValues = getValues(['title', 'description', 'expiryDate'])
        const draftTaskItem: ITask = {
            id: task.id,
            categoryId: task.categoryId,
            title: formValues[0],
            expiryDate: formValues[2],
            description: formValues[1],
        }
        draftTask(draftTaskItem)
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <>
                    <form onSubmit={handleSubmit(saveTask)}>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-1xl font-semibold">
                                            Update Task
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className="mb-6">
                                            <label
                                                htmlFor="default-input"
                                                className="block w-[600px] mb-2 text-sm font-medium"
                                            >
                                                Title
                                            </label>
                                            <input
                                                {...register('title', {
                                                    required: true,
                                                    maxLength: 100,
                                                })}
                                                type="text"
                                                id="default-input"
                                                className="border w-[600px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            {errors.title &&
                                                errors.title.type ===
                                                    'required' && (
                                                    <span className="text-red-500">
                                                        This is required
                                                    </span>
                                                )}
                                            {errors.title &&
                                                errors.title.type ===
                                                    'maxLength' && (
                                                    <span className="text-red-500">
                                                        Max length exceeded
                                                    </span>
                                                )}
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                htmlFor="default-input"
                                                className="block w-[600px] mb-2 text-sm font-medium"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                {...register('description', {
                                                    required: true,
                                                    maxLength: 500,
                                                })}
                                                rows={4}
                                                id="default-input"
                                                className="border w-[600px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            {errors.description &&
                                                errors.description.type ===
                                                    'required' && (
                                                    <span className="text-red-500">
                                                        This is required
                                                    </span>
                                                )}
                                            {errors.description &&
                                                errors.description.type ===
                                                    'maxLength' && (
                                                    <span className="text-red-500">
                                                        Max length exceeded
                                                    </span>
                                                )}
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                htmlFor="default-input"
                                                className="block w-[600px] mb-2 text-sm font-medium"
                                            >
                                                Expiry Date
                                            </label>
                                            <input
                                                {...register('expiryDate', {
                                                    required: true,
                                                    maxLength: 500,
                                                })}
                                                type="date"
                                                id="default-input"
                                                className="border w-[600px] border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            {errors.description &&
                                                errors.description.type ===
                                                    'required' && (
                                                    <span className="text-red-500">
                                                        This is required
                                                    </span>
                                                )}
                                            {errors.description &&
                                                errors.description.type ===
                                                    'maxLength' && (
                                                    <span className="text-red-500">
                                                        Max length exceeded
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                    <TaskHistory taskId={task.id} />

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => closeModal()}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className={`bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                                                loading && `disabled`
                                            }`}
                                            type="submit"
                                        >
                                            {loading ? '...Processing' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>{' '}
                    </form>
                </>
            ) : null}
        </>
    )
}
