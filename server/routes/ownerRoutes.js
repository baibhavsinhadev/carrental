import { Router } from "express";
import { checkOwner, deleteCar, fetchDashboardData, getOwnerCars, listNewCar, restoreCar, toggleCarAvailability } from "../controllers/ownerController.js";
import authUser from "../middleware/authUser.js";
import authOwner from "../middleware/authOwner.js";
import upload from "../middleware/multer.js";

const ownerRouter = new Router();

ownerRouter.post("/list", authUser, authOwner, upload.single("image"), listNewCar);

ownerRouter.get("/check", authUser, authOwner, checkOwner);
ownerRouter.get("/cars", authUser, authOwner, getOwnerCars);
ownerRouter.get("/dashboard", authUser, authOwner, fetchDashboardData);

ownerRouter.put("/availability/:carId", authUser, authOwner, toggleCarAvailability);
ownerRouter.put("/delete/:carId", authUser, authOwner, deleteCar);
ownerRouter.put("/restore/:carId", authUser, authOwner, restoreCar);

export default ownerRouter;