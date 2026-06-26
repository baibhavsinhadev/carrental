import { Router } from "express";
import { checkUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import authUser from "../middleware/authUser.js";

const authRouter = new Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authUser, logoutUser);

authRouter.get("/check", authUser, checkUser);

export default authRouter;