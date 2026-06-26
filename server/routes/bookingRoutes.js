import { Router } from "express";
import { checkAvailabilityOfCar, createBooking, listOwnerBookings, listUserBookings, updateBookingStatus } from "../controllers/bookingController.js";
import authUser from "../middleware/authUser.js";
import authOwner from "../middleware/authOwner.js";

const bookingRouter = new Router();

bookingRouter.post("/create", authUser, createBooking);
bookingRouter.post("/check-availability", checkAvailabilityOfCar);

bookingRouter.get("/user", authUser, listUserBookings);
bookingRouter.get("/owner", authUser, authOwner, listOwnerBookings);

bookingRouter.put("/status/:bookingId", authUser, authOwner, updateBookingStatus);

export default bookingRouter;