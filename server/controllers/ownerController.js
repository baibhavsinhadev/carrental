import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// API to check owner auth : GET /api/owner/check
export const checkOwner = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            isOwner: true
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            isOwner: false
        })
    }
};

// API to list new car : POST /api/owner/list
export const listNewCar = async (req, res) => {
    try {
        const { brand, model, year, category, seating_capacity, fuel_type, transmission, pricePerDay, location, description } = req.body;

        const userId = req.userId;
        const image = req.file;

        if (!brand || !model || !year || !category || !seating_capacity || !fuel_type || !transmission || !pricePerDay || !location || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing Required Fields"
            });
        };

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        };

        const result = await imagekit.upload({
            file: image.buffer,
            fileName: `${brand}-${model}-${Date.now()}`,
            folder: "/car-rental/cars",
        });

        const imageUrl = imagekit.url({
            path: result.filePath,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" },
            ]
        });

        const carData = {
            owner: userId,
            brand,
            model,
            image: imageUrl,
            year: Number(year),
            category,
            seating_capacity: Number(seating_capacity),
            fuel_type,
            transmission,
            pricePerDay: Number(pricePerDay),
            location,
            description
        };

        await Car.create(carData);
        res.status(201).json({
            success: true,
            message: "Car listed successfully"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "List New Car Failed"
        });
    }
};

// API to list owner car : GET /api/owner/cars
export const getOwnerCars = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetching Cars from Database
        const cars = await Car.find({ owner: userId });

        res.status(200).json({
            success: true,
            cars
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Get Owner Cars Failed"
        });
    }
};

// API to toggle car availability : PUT /api/owner/availability/:carId
export const toggleCarAvailability = async (req, res) => {
    try {
        const { carId } = req.params;
        const userId = req.userId;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        };

        // Checking if car belongs to the user
        if (car.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to toggle car availability"
            });
        };

        car.isAvailable = !car.isAvailable;
        await car.save();

        res.status(200).json({
            success: true,
            message: "Car availability toggled"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Car Availability Toggle Failed"
        });
    }
};

// API to delete car : PUT /api/owner/delete/:carId
export const deleteCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const userId = req.userId;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        };

        // Checking if car belongs to the user
        if (car.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete car"
            });
        };

        car.isDeleted = true;
        car.isAvailable = false;
        await car.save();

        res.status(200).json({
            success: true,
            message: "Car deleted"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Car Delete Failed"
        });
    }
};

// API to restore car : PUT /api/owner/restore/:carId
export const restoreCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const userId = req.userId;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        };

        // Checking if car belongs to the user
        if (car.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to restore car"
            });
        };

        car.isDeleted = false;
        car.isAvailable = true;
        await car.save();

        res.status(200).json({
            success: true,
            message: "Car restored"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Car Restoration Failed"
        });
    }
};

// API to fetch dashboard data : GET /api/owner/dashboard
export const fetchDashboardData = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetching Cars & Bookings
        const cars = await Car.find({ owner: userId });
        const bookings = await Booking.find({ owner: userId }).populate("car").sort({ createdAt: -1 });
        const pendingBookings = await Booking.find({ owner: userId, status: "pending" });
        const completedBookings = await Booking.find({ owner: userId, status: "confirmed" });

        // Calculate monthly revenue from bookings status is confirmed
        const monthlyRevenue = bookings.slice().filter((booking) => booking.status === "confirmed").reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        };

        res.status(200).json({
            success: true,
            dashboardData
        })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Dashboard Fetching Failed"
        });
    }
};