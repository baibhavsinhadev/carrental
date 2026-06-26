import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const location = useLocation();
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const checkUserAuth = async () => {
        try {
            const { data } = await api.get("/auth/check");

            if (data.success) {
                setIsAuth(data.isAuth);
            };
        } catch (error) {
            setIsAuth(false);
            console.log(error?.response?.data?.message || "Check User Auth Failed");
        };
    };

    useEffect(() => {
        checkUserAuth();
    }, [])

    const value = {
        navigate, location, showLogin, setShowLogin,
        currency, isAuth, setIsAuth
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be provided within AppProvider");
    };

    return context;
};