import { useEffect, useState } from "react";
import { defaultComponents, userComponents } from "../../components/components";
import { assets, dummyMyBookingsData } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import api from "../../api/axios";

const MyBookings = () => {

    const { currency } = useApp();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Bookings
    const fetchBookings = async () => {
        setLoading(true);

        try {
            const { data } = await api.get("/booking/user");

            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching Bookings Error")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [])

    if (loading) return <defaultComponents.Loading />;
    if (bookings.length === 0) {
        return (
            <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold">No Bookings Yet</h2>
                <p className="text-muted-foreground mt-2 max-w-md">You haven't booked any vehicles yet. Explore our collection and reserve your perfect ride in just a few clicks</p>

                <button onClick={() => navigate("/cars")} className="mt-6 bg-primary text-white px-6 py-3 rounded-lg">
                    Browse Cars
                </button>
            </div>
        );
    };

    return bookings.length !== 0 && (
        <div className="px-6 md:px-16 lg:px-24 xl:pl-32 2xl:px-48 mt-16 text-sm max-w-7xl">
            <userComponents.Title title="My Bookings" subtitle="View and manage your all car bookings" align="left" />

            <div>
                {bookings.map((booking, idx) => (
                    <div key={booking._id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12">
                        <div className="md:col-span-1">
                            <div className="rounded-md overflow-hidden mb-3">
                                <img src={booking.car.image} alt="Car Image" className="w-full h-auto aspect-video object-cover" />
                            </div>

                            <p className="text-lg font-medium mt-2">{booking.car.brand} {booking.car.model}</p>

                            <p className="text-gray-500">{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2">
                                <p className="px-3 py-1.5 bg-light rounded">Booking #{idx + 1}</p>

                                <p className={`px-3 py-1.5 text-xs rounded-full ${booking.status === "confirmed" ? "bg-green-400/15 text-green-600" : "bg-red-400/15 text-red-600"}`}>{booking.status}</p>
                            </div>

                            <div className="flex items-start gap-2 mt-3">
                                <img src={assets.calendar_icon_colored} alt="calendar_icon_colored" className="w-4 h-4 mt-1" />

                                <div>
                                    <p className="text-gray-500">Rental Period</p>
                                    <p>{booking.pickupDate.split("T")[0]} To {booking.returnDate.split("T")[0]}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 mt-3">
                                <img src={assets.location_icon_colored} alt="location_icon_colored" className="w-4 h-4 mt-1" />

                                <div>
                                    <p className="text-gray-500">Pickup Location</p>
                                    <p>{booking.car.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1 flex flex-col justify-between gap-6">
                            <div className="text-sm text-gray-500 text-right">
                                <p>Total Price</p>
                                <h1 className="text-2xl font-semibold text-primary">{currency}{booking.price}</h1>
                                <p>Booked on {booking.createdAt.split("T")[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;