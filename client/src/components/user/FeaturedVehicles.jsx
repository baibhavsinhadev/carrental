import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { userComponents } from "../components";
import { assets } from "../../assets/assets";

const FeaturedVehicles = () => {

    const { cars } = useUser();

    return (
        <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
            <div>
                <userComponents.Title title="Featured Vehicles" subtitle="Explore our selection of premium vehicles available for your next adventure" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-18">
                {cars.slice(0, 4).map((car) => (
                    <userComponents.CarCard key={car._id} car={car} />
                ))}
            </div>

            <Link to="/cars" className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18">
                <span>Explore all cars</span>
                <img src={assets.arrow_icon} alt="arrow_icon" />
            </Link>
        </div>
    );
};

export default FeaturedVehicles;