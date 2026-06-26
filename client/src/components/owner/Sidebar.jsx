import { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

const Sidebar = () => {

    const { user, fetchUserData } = useUser();

    const [image, setImage] = useState("");

    const updateImage = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);

            const { data } = await api.put('/user/image', formData);

            if (data.success) {
                toast.success(data.message);
                setImage("");
                fetchUserData();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Authentication Error");
        }
    };

    return (
        <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
            <div className="group relative">
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"} alt={user?.name} className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto border border-borderColor" />

                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden accept="image/*" />

                    <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
                        <img src={assets.edit_icon} alt="edit_icon" />
                    </div>
                </label>
            </div>

            {image && (
                <button onClick={updateImage} className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary">
                    <span>Save</span>
                    <img src={assets.check_icon} alt="check_icon" width={13} />
                </button>
            )}

            <p className="mt-2 text-base max-sm:hidden">{user?.name}</p>

            <div className="w-full">
                {ownerMenuLinks.map((link) => (
                    <NavLink key={link.path} to={link.path} end={link.path === "/owner"} className={({ isActive }) => `relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${isActive ? "bg-primary/10 text-primary" : "text-gray-600"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? link.coloredIcon : link.icon} alt="sidebar link" />

                                <span className="max-sm:hidden">{link.name}</span>

                                <div className={`${isActive && "bg-primary"} w-1.5 h-8 rounded-l right-0 absolute`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;