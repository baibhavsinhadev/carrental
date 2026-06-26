import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import { ownerComponents } from "../../components/components";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useOwner } from "../../context/OwnerContext";

const Dashboard = () => {

    const { currency } = useApp();
    const { isOwner } = useOwner();

    const [dashboardData, setDashboardData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0
    });

    const dashboardCards = [
        {
            title: "Total Cars",
            value: dashboardData.totalCars,
            icon: assets.carIconColored
        },
        {

            title: "Total Bookings",
            value: dashboardData.totalBookings,
            icon: assets.listIconColored
        },
        {

            title: "Pending",
            value: dashboardData.pendingBookings,
            icon: assets.cautionIconColored
        },
        {

            title: "Completed",
            value: dashboardData.completedBookings,
            icon: assets.listIconColored
        }
    ];

    // Fetch Dashboard Data
    const fetchDashboardData = async () => {
        try {
            const { data } = await api.get("/owner/dashboard");

            if (data.success) {
                setDashboardData(data.dashboardData);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching Dashboard Data Error");
        };
    };

    useEffect(() => {
        if (isOwner) {
            fetchDashboardData();
        };
    }, [isOwner]);

    return (
        <div className="px-4 pt-10 md:px-10">
            <ownerComponents.OwnerTitle title="Owner Dashboard" subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
                {dashboardCards.map((card) => (
                    <div key={card.title} className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor">
                        <div>
                            <h1 className="text-xs text-gray-500">{card.title}</h1>
                            <p className="text-lg font-semibold">{card.value}</p>
                        </div>

                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <img src={card.icon} alt={card.title} className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
                <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
                    <h1 className="text-lg font-medium">Recent Bookings</h1>
                    <p className="text-gray-500">Latest customer bookings</p>

                    {dashboardData.recentBookings.map((booking) => (
                        <div key={booking._id} className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                    <img src={assets.listIconColored} alt="listIconColored" className="h-5 w-5" />
                                </div>

                                <div>
                                    <p>{booking.car.brand} {booking.car.model}</p>

                                    <p className="text-sm text-gray-500">
                                        {booking.createdAt.split("T")[0]}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <p className="text-sm text-gray-500">{currency}{booking.price}</p>
                                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">{booking.status}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
                    <h1 className="text-lg font-medium">Monthly Revenue</h1>
                    <p className="text-gray-500">Revenue for current month</p>

                    <p className="text-3xl mt-6 font-semibold text-primary">{currency}{dashboardData.monthlyRevenue}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;