import { Fragment, useEffect } from 'react'
import Nav from '../Nav'
import { ICategory } from '../../interfaces/iCategory'
import { ITask } from '../../interfaces/iTastItem'
import CategoryList from './categoryList/CategoryList'
import NewCategoryModal from '../modals/NewCategoryModal'
import { useAuth } from '../../provider/AuthProvider'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';

function ToDoMaster() {
    const { token } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true })
        }
    }, [token])

    const categoryList: ICategory[] = [
        {
            id: 1,
            name: 'To do',
        },
        {
            id: 2,
            name: 'In progress',
        },
        {
            id: 3,
            name: 'Done',
        },
        {
            id: 4,
            name: 'Archived',
        },
        {
            id: 5,
            name: 'Test',
        },
    ]

    const task: ITask = {
        id: 2,
        name: 'name dfasdfasdf sdf asdfaaaaaaaa sdf asd fsad fas df asdf sadf asd f sdf',
        description:
            'dgdsfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdfg sdfgsdf gsdfgsd fgsdfg sdfg sdfasd fasdfasdf sadf',
        expiryDate: '34/44/5677',
        category: categoryList[0],
    }

    return (
        <Fragment>
            <Nav />
            <div className="pl-20 pr-20">
                <h1 className="text-3xl font-bold underline mb-4">Task List</h1>

                <NewCategoryModal></NewCategoryModal>

                <div className="flex overflow-x-auto bg-grew-200">
                    {categoryList.map((item, index) => {
                        return (
                            <Fragment key={`category-${index}`}>
                                <CategoryList category={item}></CategoryList>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default ToDoMaster
