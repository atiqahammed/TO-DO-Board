import { SignupResponse } from './signup.model';

export class LoginResponse extends SignupResponse {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    firstName?: string;
    lastName?: string;
}
