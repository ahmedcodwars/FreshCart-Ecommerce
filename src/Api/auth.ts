import axios from "axios";
import { ForgetPasswordData, SignInData, RegisterData, VerifyResetCodeData, ResetPasswordData, AuthApiResponse } from "./auth.types";

const Api = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1"
})
export const signIn = (data: SignInData) => Api.post<AuthApiResponse>("/auth/signin", data);
export const signup = (data: RegisterData) => Api.post<AuthApiResponse>("/auth/signup", data);
export const forgetPassword = (data: ForgetPasswordData) => Api.post<AuthApiResponse>("/auth/forgotPasswords", data);
export const verifyResetCode = (data: VerifyResetCodeData) => Api.post<AuthApiResponse>("/auth/verifyResetCode", data);
export const resetPassword = (data: ResetPasswordData) => Api.put<AuthApiResponse>("/auth/resetPassword", data);

