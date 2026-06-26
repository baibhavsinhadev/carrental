import { useState } from "react";
import { useApp } from "../context/AppContext";
import { toast } from "react-toastify";
import api from "../api/axios";

const Login = () => {

    const { showLogin, setShowLogin, isAuth, setIsAuth } = useApp();

    const [state, setState] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            switch (state) {
                case "login": {
                    const { data } = await api.post("/auth/login", formData);
                    if (data.success) {
                        toast.success(data.message);
                        setIsAuth(true);
                    };
                    break;
                }

                case "register": {
                    const { data } = await api.post("/auth/register", formData);
                    if (data.success) {
                        toast.success(data.message);
                        setIsAuth(true);
                    };
                    break;
                }

                default:
                    toast.error("Unhandle state")
                    break;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Authentication Error");
        } finally {
            setShowLogin(false);
            setFormData({
                name: "",
                email: "",
                password: ""
            });
        };
    };

    return (
        <div onClick={() => setShowLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50 justify-center">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User </span>
                    <span>{state === "login" ? "Login" : "Registration"}</span>
                </p>

                {state !== "login" && (
                    <div className="w-full">
                        <label htmlFor="name">Name</label>

                        <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Enter your name" className="border border-borderColor rounded w-full p-2 mt-1 outline-primary" />
                    </div>
                )}

                <div className="w-full">
                    <label htmlFor="email">Email</label>

                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your email" className="border border-borderColor rounded w-full p-2 mt-1 outline-primary" />
                </div>

                <div className="w-full">
                    <label htmlFor="password">Password</label>

                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter your password" className="border border-borderColor rounded w-full p-2 mt-1 outline-primary" />
                </div>

                {state === "login" ? (
                    <p>Don't have an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span></p>
                )}

                <button className="bg-primary text-white w-full py-2 rounded-md">
                    {state === "login" ? "Login" : "Create account"}
                </button>
            </form>
        </div>
    );
};

export default Login;