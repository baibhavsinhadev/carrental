import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { ownerComponents } from "../../components/components";
import { useOwner } from "../../context/OwnerContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

const ManageBookings = () => {

    const { currency } = useApp();
    const { isOwner } = useOwner();
    const [bookings, setBookings] = useState([]);

    // Fetch Bookings 
    const fetchBookings = async () => {
        try {
            const { data } = await api.get("/booking/owner");

            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        }
    };

    const changeBookingStatus = async (bookingId, status) => {
        try {
            const { data } = await api.put(`/booking/status/${bookingId}`, { status });

            if (data.success) {
                toast.success(data.message);
                fetchBookings();
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        }
    };

    useEffect(() => {
        if (isOwner) {
            fetchBookings();
        }
    }, [isOwner]);

    return (
        <div className="px-4 pt-10 md:px-10">
            <ownerComponents.OwnerTitle title="Manage Bookings" subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses" />

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Car</th>
                            <th className="p-3 font-medium max-sm:hidden">Date Range</th>
                            <th className="p-3 font-medium">Total</th>
                            <th className="p-3 font-medium">Payment</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-t border-borderColor text-gray-500">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={booking.car.image} alt="Booking Car Image" className="w-12 h-12 aspect-square rounded-md object-cover" />

                                    <p className="font-medium">
                                        {booking.car.brand} {booking.car.model}
                                    </p>
                                </td>

                                <td className="p-3 max-md:hidden">
                                    {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                                </td>

                                <td className="p-3">{currency}{booking.price}</td>

                                <td className="p-3 max-md:hidden">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">offline</span>
                                </td>

                                <td className="p-3">
                                    {booking.status === "pending" ? (
                                        <select onChange={(e) => changeBookingStatus(booking._id, e.target.value)} className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none">
                                            <option value="pending">Pending</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="confirmed">Confirmed</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{booking.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;