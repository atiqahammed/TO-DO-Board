import { ICategory } from './iCategory'

export interface ITask {
    id?: string
    name?: string
    description?: string
    category?: ICategory
    expiryDate?: string
}
