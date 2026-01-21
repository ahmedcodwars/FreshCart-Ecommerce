import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../../Schemas/RegisterSchema";
import { signup } from "../../Api/auth";
import toast from "react-hot-toast";
import { RegisterData } from '@/Api/auth.types';
import { AxiosError } from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema)
    })

    const onsubmit = async (data: RegisterData) => {
        try {
            const res = await signup(data);
            if (res.data.message === "success")
                toast.success(res.data.message, { duration: 3000, id: "mySuccess" });
            navigate("/auth/sign-in")
        } catch (err) {
            const error = err as AxiosError<{message?: string}>
            toast.error(error.response?.data?.message ?? "Something went wrong", { duration: 3000, id: "myError" })
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            Full Name
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.name && <p className="text-red-500 text-[14px]">{errors.name?.message}</p>}
                    </div>

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

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.password && <p className="text-red-500 text-[14px]">{errors.password?.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#5c6c75] mb-1">
                            Confirm Password
                        </label>
                        <input
                            {...register("rePassword")}
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                        />
                        {errors.rePassword && <p className="text-red-500 text-[14px]">{errors.rePassword?.message}</p>}

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#212121] text-white rounded-xl font-semibold hover:bg-[#000000] transition duration-300 cursor-pointer"
                    >
                        {isSubmitting ? "Loading..." : "Register"}
                    </button>
                </form>

                {/* Login */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?
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

export default Register;
