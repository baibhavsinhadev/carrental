import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

// API to get user data : GET /api/user/data
export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");;

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Get User Data Failed"
        });
    }
};

// API to update user image : PUT /api/user/image
export const updateUserImage = async (req, res) => {
    try {
        const userId = req.userId;
        const image = req.file;

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        };

        const result = await imagekit.upload({
            file: image.buffer,
            fileName: `user-${Date.now()}`,
            folder: "/car-rental/users",
        });

        const imageUrl = result.url;
        await User.findOneAndUpdate(
            { _id: userId },
            { image: imageUrl }
        );

        return res.status(200).json({
            success: true,
            message: "Profile image updated"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Update User Image Failed"
        });
    }
};

// API to update user role : PUT /api/user/role
export const updateUserRole = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");;
        if (user.role === "owner") {
            return res.status(400).json({
                success: false,
                message: "Already an owner"
            });
        };

        await User.findOneAndUpdate(
            { _id: userId },
            { role: "owner" }
        );

        res.status(200).json({
            success: true,
            message: "Now you can list cars"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Update User Role Failed"
        });
    }
};

// API to fetch all non-deleted cars : GET /api/user/cars
export const fetchAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ isDeleted: false });

        res.status(200).json({
            success: true,
            cars
        })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Fetch All Cars Failed"
        });
    }
};

// API to fetch car by id : GET /api/user/car/:carId
export const fetchCarById = async (req, res) => {
    try {
        const { carId } = req.params;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(400).json({
                success: false,
                message: "Car Not Found"
            });
        };

        res.status(200).json({
            success: true,
            car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fetch Car by Id Failed"
        });
    }
};