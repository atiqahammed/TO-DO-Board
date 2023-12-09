import { Fragment, useEffect, useState } from 'react'
import Nav from '../Nav'
import { ICategory } from '../../interfaces/iCategory'
import { ITask } from '../../interfaces/iTastItem'
import CategoryList from './CategoryList'
import NewCategoryModal from '../modals/NewCategoryModal'
import { useAuth } from '../../provider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/APIInstance'

function ToDoMaster() {
    const { token } = useAuth()
    const [categoryList, setCategoryList] = useState<ICategory[]>([])
    const [taskList, setTaskList] = useState<ITask[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true })
        }
    }, [token])

    const loadCategory = () => {
        API.get(`/category/get`)
            .then(({ data }) => {
                if (data.isSuccess) {
                    setCategoryList(data.categoryList)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadTask = () => {
        API.get(`/task/get`)
            .then(({ data }) => {
                if (data.isSuccess) {
                    setTaskList(data.taskList)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const draftTask = (task: ITask) => {
        const index = taskList.findIndex((item) => item.id === task.id)
        const draftList = [...taskList]
        draftList[index] = task
        setTaskList(draftList)
    }

    useEffect(() => {
        loadCategory()
        loadTask()
    }, [])

    return (
        <Fragment>
            <Nav />
            <div className="pl-40 pr-40">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-2xl font-bold mb-5">
                        <h1 className="text-3xl font-bold underline mb-4">
                            Task List
                        </h1>
                    </div>
                    <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1">
                        <NewCategoryModal loadCategory={loadCategory} />
                    </div>
                </div>

                <div className="flex overflow-x-auto bg-grew-200">
                    {categoryList.map((item, index) => {
                        return (
                            <Fragment key={`category-${index}`}>
                                <CategoryList
                                    category={item}
                                    taskList={taskList}
                                    loadTask={loadTask}
                                    draftTask={draftTask}
                                ></CategoryList>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default ToDoMaster
