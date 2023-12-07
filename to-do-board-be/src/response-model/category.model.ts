import { CommonResponse } from './common.model';

export class CategoryItem {
    name: string;
    id: string;
}

export class CategoryResponse extends CommonResponse {
    isSuccess?: boolean;
    message?: string;
    errorMessage?: string;
    categoryList?: CategoryItem[];
}
