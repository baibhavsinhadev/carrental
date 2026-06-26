import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { defaultComponents } from "../../components/components";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import api from "../../api/axios";

const CarDetails = () => {

    const { carId } = useParams();
    const { navigate, currency } = useApp();
    const { cars, pickupDate, setPickupDate, returnDate, setReturnDate } = useUser();

    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch car data
    const fetchCarData = async () => {
        setLoading(true);

        try {
            const { data } = await api.get(`/user/car/${carId}`);

            if (data.success) {
                setCarData(data.car);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching Car Data Error")
        } finally {
            setLoading(false)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await api.post("/booking/create", {
                car: carId,
                pickupDate,
                returnDate
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/my-bookings")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Creating Booking Error")
        }
    };

    useEffect(() => {
        fetchCarData();
    }, [carId, cars]);

    if (loading) return <defaultComponents.Loading />;
    if (!carData) {
        return (
            <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold">Car Not Found</h2>
                <p className="text-muted-foreground mt-2 max-w-md">The car you're looking for doesn't exist or may have been removed from our fleet</p>

                <button onClick={() => navigate("/cars")} className="mt-6 bg-primary text-white px-6 py-3 rounded-lg">
                    Browse Cars
                </button>
            </div>
        );
    };

    const carDetails = [
        { icon: assets.users_icon, text: `${carData.seating_capacity} seats` },
        { icon: assets.fuel_icon, text: carData.fuel_type },
        { icon: assets.car_icon, text: carData.transmission },
        { icon: assets.location_icon, text: carData.location }
    ];

    const features = [
        "360 Camera",
        "GPS",
        "Rear View Mirror",
        "Bluetooth",
        "Heated Seats"
    ];

    return carData && (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
            <button onClick={() => navigate("/cars")} className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer">
                <img src={assets.arrow_icon} alt="arrow_icon" className="rotate-180 opacity-65" />
                <span>Back to all cars</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left Side: Car Image & Details */}
                <div className="lg:col-span-2">
                    <img src={carData.image} alt="Car Image" className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md" />

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{carData.brand} {carData.model}</h1>
                            <p className="text-gray-500 text-lg">{carData.category} • {carData.year}</p>
                        </div>

                        <hr className="border-borderColor my-6" />

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {carDetails.map((car, index) => (
                                <div key={index} className="flex flex-col items-center bg-light p-4 rounded-lg">
                                    <img src={car.icon} alt={car.text} className="h-5 mb-2" />
                                    <span>{car.text}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h1 className="text-xl font-medium mb-3">Description</h1>
                            <p className="text-gray-500">{carData.description}</p>
                        </div>

                        <div>
                            <h1 className="text-xl font-medium mb-3">Features</h1>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-500">
                                        <img src={assets.check_icon} alt="check_icon" className="h-4 mr-2" />

                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Booking Form */}
                <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-600">
                    <div className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
                        <p>{currency}{carData.pricePerDay + " "}</p>
                        <p className="text-base text-gray-400 font-normal">per day</p>
                    </div>

                    <hr className="border-borderColor my-6" />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="pickup-date">Pickup Date</label>

                        <input onChange={(e) => setPickupDate(e.target.value)} value={pickupDate} type="date" id="pickup-date" min={new Date().toISOString().split("T")[0]} className="border border-borderColor px-3 py-2 rounded-lg w-full" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="return-date">Return Date</label>

                        <input onChange={(e) => setReturnDate(e.target.value)} value={returnDate} type="date" id="return-date" min={pickupDate || new Date().toISOString().split("T")[0]} className="border border-borderColor px-3 py-2 rounded-lg w-full" required />
                    </div>

                    <button className="w-full bg-primary py-3 font-medium text-white rounded-xl">Book Now</button>

                    <p className="text-center text-sm">No credit card required to reserve</p>
                </form>
            </div>
        </div>
    )
};

export default CarDetails;