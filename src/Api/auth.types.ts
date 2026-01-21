export interface SignInData {
    email: string,
    password: string
}
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    rePassword: string;
}

export interface ForgetPasswordData {
    email: string;
}

export interface VerifyResetCodeData {
    resetCode: string;
}

export interface ResetPasswordData {
    newPassword: string;
    rePassword: string;
}

export interface AuthApiResponse {
    message: string;
    token: string;
    user?: {
        name: string
    }
}