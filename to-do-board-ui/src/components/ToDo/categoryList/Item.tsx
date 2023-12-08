import { ITask } from '../../../interfaces/iTastItem'
import { resizeText } from '../../../utils/resizeText'

function Item(props: { task: ITask; categoryName: string }) {
    const { task, categoryName } = props

    const maxNameSize = 20
    const maxDescriptionSize = 50

    return (
        <div className="border-2 border-zinc-800 rounded-md max-w-md bg-green-100 p-2 m-1">
            <h1 className="text-1xl font-bold">
                {resizeText(task.title ?? '', maxNameSize)}
            </h1>
            <p className="text-sm">
                {resizeText(task.description ?? '', maxDescriptionSize)}
            </p>
            <p className="text-sm">{categoryName}</p>
            <p className="text-sm">{task.expiryDate}</p>
        </div>
    )
}

export default Item
