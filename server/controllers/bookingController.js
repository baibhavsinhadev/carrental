import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import checkAvailability from "../utils/checkAvailability.js";

// API to check availability of cars for the given date and location : GET /api/booking/check-availability
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        // Fetch all available cars for the given location
        const cars = await Car.find({ location, isAvailable: true });

        // Check car availabilty for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);

            return {
                ...car._doc,
                isAvailable: isAvailable
            };
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter((car) => car.isAvailable === true);

        res.status(200).json({
            success: true,
            availableCars
        })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Check Availability of Car Failed"
        });
    }
};

// API to create booking : POST /api/booking/create
export const createBooking = async (req, res) => {
    try {
        const { car, pickupDate, returnDate } = req.body;
        const userId = req.userId;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Car is not available"
            });
        };

        const carData = await Car.findById(car);

        // Calculated price based on pickupDate & returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({
            car,
            owner: carData.owner,
            user: userId,
            pickupDate,
            returnDate,
            price
        });

        res.status(201).json({
            success: true,
            message: "Booking Created"
        })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Creating Booking Failed"
        });
    }
};

// API to list user bookings : GET /api/booking/user
export const listUserBookings = async (req, res) => {
    try {
        const userId = req.userId;

        const bookings = await Booking.find({ user: userId }).populate("car").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "List User Booking Failed"
        });
    }
};

// API to get owner bookings : GET /api/booking/owner
export const listOwnerBookings = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (user.role !== "owner") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        };

        const bookings = await Booking.find({ owner: userId }).populate("car user").select("-user.password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "List Owner Booking Failed"
        });
    }
};

// API to update booking status : PUT /api/booking/status/:bookingId
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const userId = req.userId;

        const booking = await Booking.findById(bookingId);
        if (booking.owner.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        };

        booking.status = status
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Update Booking Status Failed"
        });
    }
};