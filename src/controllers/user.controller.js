import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const user = await User.findOne({ userEmail });
        if (user) {
            return res.status(400).json({
                message: "user already exists with this email",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        await User.create({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        return res.status(201).json({
            message: "Account created Successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const userId = req.id;
        console.log("UserId", userId);
        if (!userEmail || !userPassword) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(200).json({
                message: "Incorrect email or Password",
                success: true
            })
        }

        const isPasswordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            userPassword: user.userPassword
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.userName}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}