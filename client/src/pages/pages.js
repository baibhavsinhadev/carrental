import { lazy } from "react";

// User Pages Import
const Home = lazy(() => import("./user/Home"));
const Cars = lazy(() => import("./user/Cars"));
const CarDetails = lazy(() => import("./user/CarDetails"));
const MyBookings = lazy(() => import("./user/MyBookings"));

// Owner Pages Import
const Layout = lazy(() => import("./owner/Layout"));
const Dashboard = lazy(() => import("./owner/Dashboard"));
const AddCar = lazy(() => import("./owner/AddCar"));
const ManageBookings = lazy(() => import("./owner/ManageBookings"));
const ManageCars = lazy(() => import("./owner/ManageCars"));

export const userPages = {
    Home,
    Cars,
    CarDetails,
    MyBookings
};

export const ownerPages = {
    Layout,
    Dashboard,
    AddCar,
    ManageBookings,
    ManageCars
};