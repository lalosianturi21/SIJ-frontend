import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../../services/index/users";
import { useMutation } from '@tanstack/react-query';
import { userActions } from '../../store/reducers/userReducers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from 'react-hook-form';


const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user)

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password, birth, interest }) => {
            return signup({ name, email, password, birth, interest });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));

            toast.success("Registration successful! 🎉 Redirecting to login...", {
                autoClose: 3000,
            });

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage, { autoClose: 3000 });
            console.error(error);
        },
    });

    useEffect(() => {
        if (userState.userInfo) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [navigate, userState.userInfo]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            birth: "",
            interest: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { name, email, password, birth, interest } = data;
        mutate({ name, email, password, birth, interest });
    };

    const password = watch("password");


    return (
        <MainLayout>
            <ToastContainer />
            <div className="w-full mt-[120px]">
                <section className="container mx-auto px-5 py-1">
                    <div className="w-full max-w-sm mx-auto rounded-xl p-8 border-2 border-blue-500 bg-white">
                        <h1 className="text-signup text-center mb-8">
                            Sign Up
                        </h1>

                        <form onSubmit={handleSubmit(submitHandler)}>
                            {/* Name */}
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="name" className="text-gray-700 font-semibold block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 1, message: "Name must be at least 1 character" },
                                    })}
                                    placeholder="Enter name"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 ${errors.name ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.name?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="email" className="text-gray-700 font-semibold block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                    placeholder="Enter email"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.email?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Interest */}
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="interest" className="text-gray-700 font-semibold block">
                                    Interest
                                </label>
                                <select
                                    id="interest"
                                    {...register("interest", { required: "Interest is required" })}
                                    className={`text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border ${errors.interest ? "border-red-500" : "border-blue-500"
                                        }`}
                                >
                                    <option value="">-- Select interest --</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Computer Vision">Computer Vision</option>
                                    <option value="Natural Language Processing">Natural Language Processing</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App Development</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                </select>
                                {errors.interest?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.interest.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="birth" className="text-gray-700 font-semibold block">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="birth"
                                    {...register("birth", { required: "Date of birth is required" })}
                                    className={`text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border ${errors.birth ? "border-red-500" : "border-blue-500"
                                        }`}
                                />
                                {errors.birth?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.birth.message}</p>
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
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    placeholder="Enter password"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.password?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col mb-6 w-full">
                                <label htmlFor="confirmPassword" className="text-gray-700 font-semibold block">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) => value === password || "Passwords do not match",
                                    })}
                                    placeholder="Enter confirm password"
                                    className={`placeholder:text-[#959ead] text-gray-900 mt-3 rounded-lg px-5 py-4 font-semibold block border border-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                                        }`}
                                />
                                {errors.confirmPassword?.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="bg-linear-main shadow-inner-shadow-1 hover:opacity-90 text-white font-bold text-lg py-4 px-8 w-full rounded-lg transition-all duration-300"
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>

                            {/* Login link */}
                            <p className="text-sm font-semibold text-gray-600 mt-6 text-center">
                                Already have an account?{" "}
                                <a href="/login" className="text-purple-600 hover:underline">
                                    Login now
                                </a>
                            </p>
                        </form>
                    </div>
                </section>
            </div>


        </MainLayout>
    )
}

export default RegisterPage
