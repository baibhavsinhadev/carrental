import User from "../models/User.js";

const authOwner = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
        };

        if (user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Owner access required."
            });
        };

        next();
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Unauthorized access"
        });
    }
};

export default authOwner;