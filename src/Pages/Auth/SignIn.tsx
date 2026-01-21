import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "../../Api/auth";
import { SignInSchema } from "../../Schemas/SignInSchema";
import toast from "react-hot-toast";
import { SignInData } from '@/Api/auth.types';
import { AxiosError } from 'axios';
const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema)
  });

  const onsubmit = async (data: SignInData) => {
    try {
      const res = await signIn(data);
      localStorage.setItem("user", res.data.token)
      if (res.data.user) {
        localStorage.setItem("userName", res.data.user.name)
      }
      if (res.data.message === "success")
        toast.success(res.data.message, { duration: 3000, id: "mySuccess" });
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>
      toast.error(error.response?.data?.message || "Something went wrong", { duration: 3000, id: "myError" })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#5c6c75] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-[14px]">{errors.email?.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#5c6c75] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c6c75]"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-[14px]">{errors.password?.message}</p>}

          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#088208] " />
              Remember me
            </label>
            <Link to="/auth/forget-password" type="button" className="text-[#088208] cursor-pointer hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 bg-[#212121] text-white rounded-xl font-semibold hover:bg-[#000000] transition duration-300 cursor-pointer"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <Link to="/auth/register" className="text-[#088208] cursor-pointer hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
