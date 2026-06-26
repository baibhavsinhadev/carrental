import bcrypt from "bcrypt";
import validator from "validator"
import User from "../models/User.js";
import hashingPassword from "../utils/hashingPassword.js";
import generateToken from "../utils/generateToken.js";

// API to register user : POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Required Fields"
            });
        };

        // Validating email & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        };

        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json({
                success: false,
                message: "Password should be 8 character long"
            });
        };

        // Check whether user exists or not
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            });
        };

        // Hash password
        const hashPassword = await hashingPassword(password);

        // Fetch two character of a name
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

        // Creating user data to save in database
        const userData = {
            name,
            email,
            password: hashPassword,
            image: avatar
        };

        const user = await User.create(userData);

        // Generating token
        const token = generateToken(user._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User Registration Successful"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Registration Failed"
        });
    }
};

// API to login user : POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Required Fields"
            });
        };

        // Validating email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        };

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        };

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        };

        // Generate token
        const token = generateToken(user._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login Successful"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Login Failed"
        });
    }
};

// API to check user auth : GET /api/auth/check
export const checkUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            isAuth: true
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            isAuth: false
        })
    }
};

// API to logout user : POST /api/auth/logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Logout Failed"
        });
    }
};