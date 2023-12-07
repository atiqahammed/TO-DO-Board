import { CommonResponse } from './common.model';

export class LoginResponse extends CommonResponse {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    firstName?: string;
    lastName?: string;
}
