import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { userComponents } from "../../components/components";
import { useUser } from "../../context/UserContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const Cars = () => {

    const { cars } = useUser();

    const [searchParams] = useSearchParams();
    const [input, setInput] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);

    const pickupLocation = searchParams.get('pickupLocation');
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');

    const isSearchData = pickupLocation && pickupDate && returnDate;

    const applyFilter = async (params) => {
        if (input === "") {
            return setFilteredCars(cars);
        };

        const filtered = cars.slice().filter((car) => {
            return (
                car.brand.toLowerCase().includes(input.toLowerCase()) || 
                car.model.toLowerCase().includes(input.toLowerCase()) || 
                car.category.toLowerCase().includes(input.toLowerCase()) || 
                car.transmission.toLowerCase().includes(input.toLowerCase())
            );
        });

        setFilteredCars(filtered)
    };

    const searchCarAvailability = async () => {
        try {
            const { data } = await api.post("/booking/check-availability", {
                location: pickupLocation,
                pickupDate,
                returnDate,
            });

            if (data.success) {
                setFilteredCars(data.availableCars);

                if (data.availableCars.length === 0) {
                    toast.info("No cars available");
                }

                return null
            };
        } catch (error) {
            console.log(error.message)
            toast.error(error?.resposne?.data?.message || "Internal Server Error");
        }
    };

    useEffect(() => {
        isSearchData && searchCarAvailability();
    }, []);

    useEffect(() => {
        cars.length > 0 && !isSearchData && applyFilter();
    }, [input, cars]);

    return (
        <>
            <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
                <userComponents.Title title="Available Cars" subtitle="Browse our selection of premium vehicles available for your next adventure" />

                <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
                    <img src={assets.search_icon} alt="search_icon" className="w-4.5 h-4.5 mr-2" />

                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search by make, model, or features..." className="w-full h-full outline-none text-gray-500 placeholder-gray-300" />

                    <img src={assets.filter_icon} alt="filter_icon" className="w-4.5 h-4.5 ml-2" />
                </div>
            </div>

            <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
                <p>Showing {filteredCars.length} Cars</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 max-w-7xl mx-auto">
                    {filteredCars.map((car) => (
                        <userComponents.CarCard key={car._id} car={car} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Cars;