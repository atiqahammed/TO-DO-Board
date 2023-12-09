import { Fragment, useEffect, useState } from 'react'
import { IHistory } from '../../interfaces/iHistory'
import API from '../../utils/APIInstance'
import { formatDate } from '../../utils/formatDate'

export default function TaskHistory({ taskId }: any) {
    const [historyList, setHistoryList] = useState<IHistory[]>([])

    useEffect(() => {
        API.get(`/task/get/history/${taskId}`)
            .then(({ data }) => {
                if (data.isSuccess) {
                    setHistoryList(data.taskList)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <Fragment>
            <div className="max-h-20 overflow-y-auto flex flex-col flex-grow">
                {historyList.map((item: IHistory, index: any) => {
                    return (
                        <Fragment key={index}>
                            <div className="pl-6 bold">
                                Has been moved to <b>{item.categoryName}</b> at{' '}
                                {formatDate(item.createdAt)}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
}
