import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useUser } from "../../context/UserContext";

const OwnerNavbar = () => {

    const { user } = useUser();

    return (
        <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
            <Link to="/">
                <img src={assets.logo} alt="logo" className="h-7" />
            </Link>

            <p>Welcome, {user?.name || "Owner"}</p>
        </div>
    );
};

export default OwnerNavbar;