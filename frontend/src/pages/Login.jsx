import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!formData.password) return toast.error("Password is required");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) login(formData);
        
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="container px-6 py-12 mx-auto lg:py-20">

                <div className="lg:flex lg:items-center">

                    {/* Left Section */}
                    <div className="lg:w-1/2">
                        <h1 className="fancy-font text-white text-8xl  mb-24">My Diary</h1>

                        <h2 className="mt-6 text-lg opacity-70">
                            Your memories. Your travels. Private and Safe.
                        </h2>

                        <h3 className="mt-4 text-4xl">Start Writing...</h3>
                    </div>

                    {/* Right - Form */}
                    <div className="mt-10 lg:w-1/2 lg:mt-0">
                        <form onSubmit={handleSubmit} className="w-full lg:max-w-xl space-y-6">


                            {/* Email */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-6 h-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input
                                    type="email"
                                    className="w-full py-3 border rounded-lg pl-12 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-6 h-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full py-3 border rounded-lg pl-12 bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />

                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5 opacity-60" /> : <Eye className="w-5 h-5 opacity-60" />}
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full md:w-1/2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="flex items-center gap-2">
                                        {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
                                        {isLoggingIn ? "Loading..." : "Login to your Account"}
                                    </span>
                                </button>


                                <Link to="/signup" className="text-blue-500 hover:underline text-center">
                                    Haven't Registered Yet?
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
