import { Link, NavLink } from "react-router-dom";
import { assets, menuLinks } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useOwner } from "../../context/OwnerContext";

const Navbar = () => {

    const { location, navigate, setShowLogin, isAuth, setIsAuth, setUser } = useApp();
    const { isOwner, setIsOwner } = useOwner();
    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        try {
            const { data } = await api.post("/auth/logout");

            if (data.success) {
                toast.success(data.message);
                setIsAuth(false);
                setIsOwner(false);
                setUser(null);
            };
        } catch (error) {
            console.log(error.message);
            toast.error(error?.response?.data?.message || "Logout Error");
        };
    };

    const updateToOwner = async () => {
        try {
            const { data } = await api.put("/user/role");

            if (data.success) {
                setIsOwner(true);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error?.response?.data?.message || "Update to owner error");
        };
    };

    return (
        <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`}>
            <Link to="/">
                <img src={assets.logo} alt="Logo" className="h-8" />
            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${showMenu ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                {menuLinks.map((link) => (
                    <NavLink className={({ isActive }) => `relative text-sm font-medium transition-all duration-300  ${isActive ? "text-primary after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-primary" : "text-gray-500 hover:text-primary"}`} key={link.name} to={link.path}>
                        {link.name}
                    </NavLink>
                ))}

                <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
                    <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-gray-700" placeholder="Search cars..." />

                    <img src={assets.search_icon} alt="Search" />
                </div>

                <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
                    {isAuth ? (
                        <>
                            {isOwner ? (
                                <button onClick={() => navigate("/owner")}>Dashboard</button>
                            ) : (
                                <button onClick={updateToOwner}>List Cars</button>
                            )}

                            <button onClick={logout} className="px-8 py-2 bg-primary text-white rounded">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => toast.warn("Login to access!")}>List Car</button>

                            <button onClick={() => setShowLogin(true)} className="px-8 py-2 bg-primary text-white rounded">Login</button>
                        </>
                    )}
                </div>
            </div>

            <button className="sm:hidden" aria-label="Menu" onClick={() => setShowMenu(!showMenu)}>
                <img src={showMenu ? assets.close_icon : assets.menu_icon} alt="Menu Icon" />
            </button>
        </div>
    );
};

export default Navbar;