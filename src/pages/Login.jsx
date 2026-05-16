import { useState } from "react";
import API from "../Api/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/users/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            setMessage("Login Successful");

            setErrorMessage("");

            setFormData({
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/todo");
            }, 1000);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message
            );

            setMessage("");

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h1>

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
                        {message}
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 text-sm">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;