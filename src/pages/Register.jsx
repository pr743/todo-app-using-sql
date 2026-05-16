import { useState } from "react";
import API from "../Api/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
                "/users/register",
                formData
            );

            setMessage(res.data.message);

            setErrorMessage("");

            setFormData({
                name: "",
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/login");
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
                    Create Account
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
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

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
                        Register
                    </button>

                    <p className="text-center text-gray-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}

export default Register;