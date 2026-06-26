import { Route, Routes } from "react-router-dom";
import { defaultComponents, userComponents } from "./components/components";
import { ownerPages, userPages } from "./pages/pages";
import { useApp } from "./context/AppContext";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify"

const App = () => {

    const { location, showLogin } = useApp();
    const isOwnerPath = location.pathname.startsWith("/owner");

    return (
        <Suspense fallback={<defaultComponents.Loading height="100vh" />}>
            <ToastContainer />
            {!isOwnerPath && <userComponents.Navbar />}
            <defaultComponents.ScrollToTop />
            {showLogin && <defaultComponents.Login />}

            <Routes>
                <Route path="/" element={<userPages.Home />} />
                <Route path="/cars" element={<userPages.Cars />} />
                <Route path="/car/:carId" element={<userPages.CarDetails />} />
                <Route path="/my-bookings" element={<userPages.MyBookings />} />

                <Route path="/owner" element={<ownerPages.Layout />}>
                    <Route index element={<ownerPages.Dashboard />} />
                    <Route path="add-car" element={<ownerPages.AddCar />} />
                    <Route path="manage-cars" element={<ownerPages.ManageCars />} />
                    <Route path="manage-bookings" element={<ownerPages.ManageBookings />} />
                </Route>
            </Routes>

            {!isOwnerPath && <userComponents.Footer />}
        </Suspense>
    );
};

export default App;