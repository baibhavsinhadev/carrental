import { Router } from "express";
import { fetchAllCars, fetchCarById, getUserData, updateUserImage, updateUserRole } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = new Router();

userRouter.get("/cars", fetchAllCars);
userRouter.get("/car/:carId", fetchCarById);
userRouter.get("/data", authUser, getUserData);

userRouter.put("/role", authUser, updateUserRole);
userRouter.put("/image", authUser, upload.single("image"), updateUserImage);

export default userRouter;