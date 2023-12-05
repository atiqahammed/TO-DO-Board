import { ICategory } from './iCategory'

export interface ITask {
    id?: number
    name?: string
    description?: string
    category?: ICategory
    expiryDate?: string
}
