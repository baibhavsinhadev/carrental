import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const payLoad = {
        id: userId
    };

    return jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

export default generateToken;