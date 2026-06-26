import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Unauthorized access"
        });
    }
};

export default authUser;