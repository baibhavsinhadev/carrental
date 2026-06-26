import { createContext, useContext, useEffect, useState } from "react";
import { dummyCarData } from "../assets/assets";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useApp } from "./AppContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { isAuth } = useApp();

    const [cars, setCars] = useState([]);
    const [user, setUser] = useState(null);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    // Fetch User Data
    const fetchUserData = async () => {
        try {
            const { data } = await api.get("/user/data");

            if (data.success) {
                setUser(data.user);
            };
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching User Data Error");
        };
    };

    // Fetch All Cars
    const fetchAllCars = async () => {
        try {
            const { data } = await api.get("/user/cars");

            if (data.success) {
                setCars(data.cars);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching Cars Error");
        }
    };

    useEffect(() => {
        fetchAllCars();
    }, []);

    useEffect(() => {
        if (isAuth) {
            fetchUserData();
        };
    }, [isAuth]);

    const value = {
        cars, setCars, pickupDate, returnDate,
        setReturnDate, setPickupDate, fetchUserData, user,
        setUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be provided within UserProvider");
    };

    return context;
};