import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dummyUserData } from "../assets/assets";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useApp } from "./AppContext";

const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {

    const { isAuth } = useApp();
    const [isOwner, setIsOwner] = useState(false);

    // Fetch Owner Role
    const fetchOwnerRole = async () => {
        try {
            const { data } = await api.get("/owner/check");

            if (data.success) {
                setIsOwner(data.isOwner);
            };
        } catch (error) {
            setIsOwner(false)
            console.log(error?.response?.data?.message || "Fetch Owner Role Failed");
        };
    };

    useEffect(() => {
        fetchOwnerRole();
    }, [isAuth]);

    const value = {
        isOwner, setIsOwner
    };

    return (
        <OwnerContext.Provider value={value}>
            {children}
        </OwnerContext.Provider>
    );
};

export const useOwner = () => {
    const context = useContext(OwnerContext);
    if (!context) {
        throw new Error("useOwner must be provided within OwnerProvider");
    };

    return context;
};