import { CommonResponse } from './common.model';

export class TaskItem {
    title: string;
    id: string;
    expiryDate: string;
    categoryId: string;
    description: string;
}

export class TaskResponse extends CommonResponse {
    isSuccess?: boolean;
    message?: string;
    errorMessage?: string;
    taskList?: TaskItem[];
}
