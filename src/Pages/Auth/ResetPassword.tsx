import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "../../Schemas/ResetPasswordSchema";
import { resetPassword } from "../../Api/auth";
import toast from "react-hot-toast";
import { ResetPasswordData } from '@/Api/auth.types';
import { AxiosError } from 'axios';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>({
        resolver: zodResolver(ResetPasswordSchema)
    })

    const onsubmit = async (data: ResetPasswordData) => {
        try {
            const res = await resetPassword(data);
            if (res.data.message === "success")
                toast.success(res.data.message, { duration: 3000, id: "mySuccess" });
            navigate("/auth/sign-in")
        } catch (err) {
            const error = err as AxiosError<{message: string}>
            toast.error(error.response?.data?.message || "Something went wrong", { duration: 3000, id: "myError" })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Reset Password
                </h2>
                <p className="text-center text-sm text-[#5c6c75] mb-6">
                    Create a new password for your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            New Password
                        </label>
                        <input
                            {...register("newPassword")}
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.newPassword && <p className="text-red-500 text-[14px]">{errors.newPassword?.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            Confirm Password
                        </label>
                        <input
                            {...register("rePassword")}
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.rePassword && <p className="text-red-500 text-[14px]">{errors.rePassword?.message}</p>}

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#212121] text-white rounded-xl font-semibold hover:bg-[#000000] transition duration-300 cursor-pointer"
                    >
                        {isSubmitting ? "Loading..." : "Reset Password"}
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

export default ResetPassword;
