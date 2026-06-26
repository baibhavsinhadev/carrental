import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { ownerComponents } from "../../components/components";
import { useApp } from "../../context/AppContext";
import { useOwner } from "../../context/OwnerContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

const ManageCars = () => {

    const { currency, navigate } = useApp();
    const { isOwner } = useOwner();
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        try {
            const { data } = await api.get("/owner/cars")

            if (data.success) {
                setCars(data.cars)
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Fetching Car Error");
        }
    };

    const changeAvailability = async (carId) => {
        try {
            const { data } = await api.put(`/owner/availability/${carId}`);

            if (data.success) {
                toast.success(data.message);
                fetchCars();
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        };
    };

    const deleteCar = async (carId) => {
        try {
            const { data } = await api.put(`/owner/delete/${carId}`);

            if (data.success) {
                toast.success(data.message);
                fetchCars();
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        };
    };

    const restoreCar = async (carId) => {
        try {
            const { data } = await api.put(`/owner/restore/${carId}`);

            if (data.success) {
                toast.success(data.message);
                fetchCars();
            }
        } catch (error) {
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        };
    };

    useEffect(() => {
        if (isOwner) {
            fetchCars();
        }
    }, [isOwner]);

    return (
        <div className="px-4 pt-10 md:px-10">
            <ownerComponents.OwnerTitle title="Manage Cars" subtitle="View all listed cars, update their details, or remove them from the booking platform" />

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Car</th>
                            <th className="p-3 font-medium max-sm:hidden">Category</th>
                            <th className="p-3 font-medium">Price</th>
                            <th className="p-3 font-medium">Status</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cars.map((car) => (
                            <tr key={car._id} className="border-t border-borderColor">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={car.image} alt="Car Image" className="w-12 h-12 aspect-square rounded-md object-cover" />

                                    <div className="max-md:hidden">
                                        <p className="font-medium">{car.brand} {car.model}</p>
                                        <p className="text-xs text-gray-500">{car.seating_capacity} • {car.transmission}</p>
                                    </div>
                                </td>

                                <td className="p-3 max-md:hidden">{car.category}</td>
                                <td className="p-3">{currency}{car.pricePerDay}/day</td>

                                <td className="p-3 max-md:hidden">
                                    <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-500" : "bg-red-100 text-red-600"}`}>
                                        {car.isAvailable ? "Available" : "Unavailable"}
                                    </span>
                                </td>

                                <td className="p-3">
                                    {car.isDeleted ? (
                                        <p onClick={() => restoreCar(car._id)} className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs font-medium cursor-pointer hover:bg-blue-200 transition-colors flex items-center justify-center max-w-24">Restore Car</p>
                                    ) : (
                                        <div className="flex items-center">
                                            <img onClick={() => changeAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="eye_icon" className="cursor-pointer" />

                                            <img onClick={() => deleteCar(car._id)} src={assets.delete_icon} alt="delete_icon" className="cursor-pointer" />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end max-w-3xl mt-4">
                <button onClick={() => navigate("/owner/add-car")} className="bg-primary text-white text-sm rounded-md px-6 py-3">Add New Car</button>
            </div>
        </div>
    );
};

export default ManageCars;