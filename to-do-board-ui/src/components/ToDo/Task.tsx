import { Fragment, useState } from 'react'
import { ITask } from '../../interfaces/iTastItem'
import { resizeText } from '../../utils/resizeText'
import ViewTaskModal from '../modals/ViewTaskModal'
import { formatDate } from '../../utils/formatDate'

function Task(props: { task: ITask; loadTask: any; draftTask: any }) {
    const { task, loadTask, draftTask } = props

    const maxNameSize = 20
    const maxDescriptionSize = 50

    const [showModal, setShowModal] = useState(false)

    const getDateColor = () => {
        const today: any = new Date()
        const expiryDate: any = new Date(task.expiryDate ? task.expiryDate : '')
        if (today > expiryDate) {
            return 'text-[#e22040]'
        }
        const diffTime = Math.abs(today - expiryDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays <= 2) {
            return 'text-[#e3a720]'
        }

        return 'text-[#20b1e3]'
    }

    return (
        <Fragment>
            <ViewTaskModal
                task={task}
                showModal={showModal}
                setShowModal={setShowModal}
                loadTask={loadTask}
                draftTask={draftTask}
            />
            <div className="border-2 border-zinc-800 rounded-md max-w-md bg-green-100 p-2 m-1">
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <h1 className="text-1xl font-bold">
                            {resizeText(task.title ?? '', maxNameSize)}
                        </h1>
                    </div>
                    <div
                        className="flex md:flex md:flex-grow flex-row justify-end space-x-1"
                        onClick={() => setShowModal(true)}
                    >
                        <svg
                            className="w-4 h-4 text-gray-800 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 21 21"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                            />
                        </svg>
                    </div>
                </div>

                <p className="text-sm pb-3 pb-1">
                    {resizeText(task.description ?? '', maxDescriptionSize)}
                </p>

                <p className={`text-sm ${getDateColor()}`}>
                    {formatDate(task.expiryDate)}
                </p>
            </div>
        </Fragment>
    )
}

export default Task
