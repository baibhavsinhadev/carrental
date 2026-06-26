import CarCard from "./user/CarCard";
import FeaturedVehicles from "./user/FeaturedVehicles";
import Hero from "./user/Hero";
import Navbar from "./user/Navbar";
import Title from "./user/Title";
import ScrollToTop from "./ScrollToTop";
import Banner from "./user/Banner";
import Testimonial from "./user/Testimonial";
import NewsLetter from "./user/NewsLetter";
import Footer from "./user/Footer";
import Loading from "./Loading";
import OwnerNavbar from "./owner/OwnerNavbar";
import Sidebar from "./owner/Sidebar";
import OwnerTitle from "./owner/OwnerTitle";
import Login from "./Login";

export const userComponents = {
    Navbar,
    Hero,
    CarCard,
    FeaturedVehicles,
    Title,
    Banner,
    Testimonial,
    NewsLetter,
    Footer
};

export const ownerComponents = {
    OwnerNavbar,
    Sidebar,
    OwnerTitle
};

export const defaultComponents = {
    ScrollToTop,
    Loading,
    Login
};