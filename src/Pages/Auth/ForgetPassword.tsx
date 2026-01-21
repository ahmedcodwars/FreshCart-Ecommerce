import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPasswordSchema } from "../../Schemas/ForgetPasswordSchema";
import { forgetPassword } from "../../Api/auth";
import toast from "react-hot-toast";
import { ForgetPasswordData } from '@/Api/auth.types';
import { AxiosError } from 'axios';

const ForgetPassword = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgetPasswordData>({
        resolver: zodResolver(ForgetPasswordSchema)
    })

    const onsubmit = async (data: ForgetPasswordData) => {
        try {
            const res = await forgetPassword(data);
            if (res.data.message === "success")
                toast.success(res.data.message, { duration: 3000, id: "mySuccess" });
            navigate("/auth/reset-code")
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>
            toast.error(
                error.response?.data?.message ?? "Something went wrong",
                { duration: 3000, id: "myError" }
            );
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Forgot Password
                </h2>
                <p className="text-center text-sm text-[#5c6c75] mb-6">
                    Enter your email and we’ll send you a reset link
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.email && <p className="text-red-500 text-[14px]">{errors.email?.message}</p>}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#212121] text-white rounded-xl font-semibold hover:bg-[#000000] transition duration-300 cursor-pointer"
                    >
                        {isSubmitting ? "Loading..." : "Send Reset Link"}
                    </button>
                </form>

                {/* Back to login */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Remember your password?
                    <Link
                        to="/auth/sign-in"
                        className="text-[#088208] cursor-pointer hover:underline ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPassword;
