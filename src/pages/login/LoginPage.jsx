import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../../components/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form';
import { login } from "../../services/index/users";
import { userActions } from '../../store/reducers/userReducers';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => {
            return login({ email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));

            console.log("Login success, showing toast...");
            toast.success("Login successful! 🎉", { autoClose: 3000 });

            setTimeout(() => {
                navigate("/");
            }, 3000);
        },

        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage, { autoClose: 3000 });
            console.error(error);
        },
    });

    useEffect(() => {
        if (userState.userInfo) {
            setTimeout(() => {
                navigate("/");
            }, 3000); // Beri waktu toast untuk muncul
        }
    }, [navigate, userState.userInfo]);


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };


    return (
        <MainLayout>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="w-full mt-[200px] mb-40">
                <section className="container mx-auto px-5 py-1">
                    <div className="w-full max-w-sm mx-auto rounded-xl p-8 border-2 border-blue-500 bg-white">
                        <h1 className="text-signup text-center mb-8">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="email" className="text-gray-700 font-semibold block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email",
                                        },
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        }
                                    })}
                                    placeholder="Enter email"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 
                                        ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.email?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="password" className="text-gray-700 font-semibold block">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Password length must be at least 6 characters",
                                        }
                                    })}
                                    placeholder="Enter password"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 
                                        ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.password?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="bg-linear-main shadow-inner-shadow-1 hover:opacity-90 text-white font-bold text-lg py-4 px-8 w-full rounded-lg transition-all duration-300"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                            <p className="text-sm font-semibold text-[#5a7184]">
                                Do not have an account?{" "}
                                <Link to="/register" className="text-register">
                                    Register now
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default LoginPage
