import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { resetCodeSchema } from "../../Schemas/ResetCodeSchema";
import { verifyResetCode } from "../../Api/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { VerifyResetCodeData } from "@/Api/auth.types";
import { AxiosError } from 'axios';

const ResetCode = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<VerifyResetCodeData>({
        resolver: zodResolver(resetCodeSchema)
    })
    const onsubmit = async (data: VerifyResetCodeData) => {
        try {
            const res = await verifyResetCode(data);
            if (res.data.message === "success") {
                toast.success(res.data.message, { duration: 3000, id: "mySuccess" });
                navigate("/auth/reset-password")
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>
            toast.error(error.response?.data?.message || "Something went wrong", { duration: 3000, id: "myError" })
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Verify Code
                </h2>
                <p className="text-center text-sm text-[#5c6c75] mb-6">
                    Enter the 6-digit code sent to your email
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">

                    {/* Code Inputs */}
                    <div className="flex justify-between gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}

                                value={digit}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replace(/\D/, "")
                                    const newOtp = [...otp];
                                    newOtp[index] = value;

                                    setOtp(newOtp);

                                    if (value && index < 5) {
                                        document.getElementById(`otp-${index + 1}`)?.focus();
                                    }
                                }}
                                id={`otp-${index}`}
                                className="w-12 h-12 text-center text-lg font-semibold border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
                            />
                        ))}
                        <input
                            type="hidden"
                            {...register("resetCode")}
                            value={otp.join("")}
                        />

                    </div>
                    {errors.resetCode && <p className="text-red-500 text-[14px]">{errors.resetCode?.message}</p>}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#212121] text-white rounded-xl font-semibold hover:bg-[#000000] transition duration-300 cursor-pointer"
                    >
                        {isSubmitting ? "Loading..." : "Verify Code"}
                    </button>
                </form>

                {/* Resend */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Didn’t receive the code?
                    <span className="text-[#088208] cursor-pointer hover:underline ml-1">
                        Resend
                    </span>
                </p>

                {/* Back */}
                <p className="text-center text-sm text-gray-600 mt-2">
                    <Link
                        to="/auth/forget-password"
                        className="text-[#088208] cursor-pointer hover:underline"
                    >
                        Back
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetCode;
