import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducers";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);

    const { data: profileData, isLoading: profileIsLoading } = useQuery({
        queryFn: () => getUserProfile({ token: userState.userInfo.token }),
        queryKey: ["profile"],
    });

    const { mutate, isLoading: updateProfileIsLoading } = useMutation({
        mutationFn: ({ name, email, interest, birth, password }) => {
            return updateProfile({
                token: userState.userInfo.token,
                userData: { name, email, interest, birth, ...(password ? { password } : {}) },
                userId: userState.userInfo._id,
            });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile is updated");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    useEffect(() => {
        if (!userState?.userInfo?.token) {
            navigate("/");
        }
    }, [navigate, userState?.userInfo?.token]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: "onChange" });

    // Set value ketika data profil tersedia
    useEffect(() => {
        if (profileData) {
            reset({
                name: profileData.name,
                email: profileData.email,
                interest: profileData.interest || "",
                birth: profileData.birth ? profileData.birth.split("T")[0] : "",
                password: "",
            });
        }
    }, [profileData, reset]);

    const submitHandler = (data) => {
        const { name, email, interest, birth, password } = data;
        mutate({ name, email, interest, birth, password });
    };

    return (
        <MainLayout>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full mt-[120px]">
                <section className="container mx-auto px-5 py-1">
                    <div className="w-full max-w-sm mx-auto rounded-xl p-8 border-2 border-blue-500 bg-white">
                        <ProfilePicture avatar={profileData?.avatar} />
                        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 mt-5">

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="text-gray-700 font-semibold block">Name</label>
                                <input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter name"
                                    className={`w-full mt-2 px-5 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-blue-500"
                                        } text-gray-900`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="text-gray-700 font-semibold block">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    placeholder="Enter email"
                                    className={`w-full mt-2 px-5 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-blue-500"
                                        } text-gray-900`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>


                            {/* Interest */}
                            <div>
                                <label htmlFor="interest" className="text-gray-700 font-semibold block">Interest</label>
                                <select
                                    id="interest"
                                    {...register("interest")}
                                    className="w-full mt-2 px-5 py-3 rounded-lg border border-blue-500 text-gray-900 bg-white"
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
                            </div>


                            {/* Birth */}
                            <div>
                                <label htmlFor="birth" className="text-gray-700 font-semibold block">Birth Date</label>
                                <input
                                    id="birth"
                                    type="date"
                                    {...register("birth")}
                                    className="w-full mt-2 px-5 py-3 rounded-lg border border-blue-500 text-gray-900"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="text-gray-700 font-semibold block">New Password (optional)</label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                    placeholder="Enter new password"
                                    className="w-full mt-2 px-5 py-3 rounded-lg border border-blue-500 text-gray-900"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!isValid || profileIsLoading || updateProfileIsLoading}
                                className="bg-linear-main shadow-inner-shadow-1 hover:opacity-90 text-white font-bold text-lg py-3 w-full rounded-lg transition-all duration-300 disabled:opacity-50"
                            >
                                {updateProfileIsLoading ? "Updating..." : "Update"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default ProfilePage;
