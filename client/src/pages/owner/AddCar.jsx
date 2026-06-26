import { useState } from "react";
import { ownerComponents } from "../../components/components";
import { assets } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import api from "../../api/axios";

const AddCar = () => {

    const { currency } = useApp();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        category: "",
        transmission: "",
        fuel_type: "",
        seating_capacity: "",
        location: "",
        description: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCar((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("brand", car.brand);
            formData.append("model", car.model);
            formData.append("year", car.year);
            formData.append("category", car.category);
            formData.append("seating_capacity", car.seating_capacity);
            formData.append("fuel_type", car.fuel_type);
            formData.append("transmission", car.transmission);
            formData.append("pricePerDay", car.pricePerDay);
            formData.append("location", car.location);
            formData.append("description", car.description);

            const { data } = await api.post("/owner/list", formData);

            if (data.success) {
                toast.success(data.message);
                setCar({
                    brand: "",
                    model: "",
                    year: "",
                    pricePerDay: "",
                    category: "",
                    transmission: "",
                    fuel_type: "",
                    seating_capacity: "",
                    location: "",
                    description: ""
                });
                setImage(null);
            };
        } catch (error) {
            toast.error(error?.response?.data?.message || "Listing Error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 py-10 md:px-10">
            <ownerComponents.OwnerTitle title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications" />

            <form className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 w-full">
                    <label htmlFor="carImage">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="upload_icon" className="h-14 rounded cursor-pointer" />

                        <input type="file" onChange={(e) => setImage(e.target.files[0])} id="carImage" hidden required accept="image/*" />
                    </label>

                    <p className="text-sm text-gray-500">Upload a picture of your car</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col w-full">
                        <label htmlFor="brand">Brand</label>

                        <input type="text" name="brand" value={car.brand} onChange={handleChange} placeholder="e.g. BMW, Mercedes, Audi..." id="brand" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="model">Model</label>

                        <input type="text" name="model" value={car.model} onChange={handleChange} placeholder="e.g. M4, Benz, A3..." id="model" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label htmlFor="year">Year</label>

                        <input type="text" name="year" value={car.year} onChange={handleChange} placeholder="e.g. 2024..." id="year" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="pricePerDay">Price Per Day ({currency})</label>

                        <input type="number" name="pricePerDay" value={car.pricePerDay} onChange={handleChange} placeholder="2000" id="pricePerDay" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="category">Category</label>

                        <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" name="category" id="category" value={car.category} onChange={handleChange}>
                            <option value="">Select a category</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Van">Van</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label htmlFor="transmission">Transmission</label>

                        <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" name="transmission" id="transmission" value={car.transmission} onChange={handleChange}>
                            <option value="">Select transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="fuel_type">Fuel Type</label>

                        <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" name="fuel_type" id="fuel_type" value={car.fuel_type} onChange={handleChange}>
                            <option value="">Select Fuel Type</option>
                            <option value="Gas">Gas</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="seating_capacity">Seating Capacity</label>

                        <input name="seating_capacity" value={car.seating_capacity} onChange={handleChange} placeholder="0" id="seating_capacity" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" type="number" />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="location">Location</label>

                    <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" name="location" id="location" value={car.location} onChange={handleChange}>
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Houston">Houston</option>
                        <option value="Chicago">Chicago</option>
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="description">Description</label>

                    <textarea name="description" id="description" onChange={handleChange} value={car.description} className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none resize-none" placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine" rows={5} />
                </div>

                <button disabled={loading} className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                        <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
                    ) : (
                        <img src={assets.tick_icon} alt="tick_icon" />
                    )}
                    <span>{loading ? "Listing..." : "List Your Car"}</span>
                </button>
            </form>
        </div>
    );
};

export default AddCar;