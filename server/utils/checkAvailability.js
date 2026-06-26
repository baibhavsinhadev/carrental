import Booking from "../models/Booking.js";

// Function to check availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
    });

    return bookings.length === 0;
};

export default checkAvailability;