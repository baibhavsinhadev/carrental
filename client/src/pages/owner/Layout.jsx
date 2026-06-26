import { Outlet } from "react-router-dom";
import { ownerComponents } from "../../components/components";
import { useOwner } from "../../context/OwnerContext";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Layout = () => {

    const { isOwner } = useOwner();
    const { navigate } = useApp();

    useEffect(() => {
        if (!isOwner) {
            navigate("/");
            toast.warn("Not Authorized to access");
        };
    }, [isOwner]);

    return (
        <div className="flex flex-col">
            <ownerComponents.OwnerNavbar />

            <div className="flex">
                <ownerComponents.Sidebar />

                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;