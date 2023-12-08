import { Fragment, useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces/iCategory'
import { ITask } from '../../../interfaces/iTastItem'
import { resizeText } from '../../../utils/resizeText'
import Item from './Item'
import API from '../../../utils/APIInstance'
import { useToasts } from 'react-toast-notifications'

function CategoryList(props: {
    category: ICategory
    taskList: ITask[]
    loadTask: any
}) {
    const { category, taskList, loadTask } = props
    const { addToast } = useToasts()

    const maxNameSize = 20

    const allowDrop = (event: any) => {
        event.preventDefault()
    }

    const drag = (ev: any) => {
        ev.dataTransfer.setData('text', ev.target.id)
    }

    const drop = (ev: any) => {
        ev.preventDefault()

        if (
            ev &&
            ev.target &&
            ev.target.id &&
            ev.target.id.includes('category__')
        ) {
            const targetId = ev.target.id
            const categoryId = targetId.replace('category__', '')
            var data = ev.dataTransfer.getData('text')
            const taskId = data.replace('task__', '')

            let task = taskList.find((item) => item.id == taskId)
            const updatedTask = {
                id: taskId,
                title: task?.title,
                description: task?.description,
                categoryId: categoryId,
                expiryDate: task?.expiryDate,
            }

            ev.target.appendChild(document.getElementById(data))
            API.post('/task/update', updatedTask)
                .then(({ data }) => {
                    if (data.isSuccess) {
                        addToast(`Task Category Updated`, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                    }
                })
                .catch((error: any) => {
                    console.log(error)
                })
        }
    }

    return (
        <div
            id={`category__${category.id}`}
            onDrop={drop}
            onDragOver={allowDrop}
            className="rounded-md min-w-[25%] max-w-md bg-slate-50 p-2 m-1 pb-20"
        >
            <h1 className="text-2xl font-bold mb-5">
                {resizeText(category.name ?? '', maxNameSize)}
            </h1>

            {taskList.map((task, index) => {
                if (task.categoryId == category.id) {
                    return (
                        <div
                            key={index}
                            id={`task__${task.id}`}
                            draggable={true}
                            onDragStart={drag}
                        >
                            <Item
                                task={task}
                                categoryName={category.name}
                            ></Item>
                        </div>
                    )
                } else {
                    return <Fragment />
                }
            })}
        </div>
    )
}

export default CategoryList
