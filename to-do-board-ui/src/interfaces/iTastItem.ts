import { ICategory } from './iCategory'

export interface ITask {
    id?: string
    title?: string
    description?: string
    categoryId?: string
    expiryDate?: string
}
