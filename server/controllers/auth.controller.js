import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from "../mailtrap/emails.js";


export const signup = async (req, res)=>{
  const {email, password, name } = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error ("All field are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false, message: "User already exists"})
        }

        const hasedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hasedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })
        await user.save();

        //jwt token

        generateTokenAndSetCookie(res, user._id);

       await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success:true,
             message:"user created successfully",
             user: {
                ...user._doc,
                password: undefined,
             }
            })
  } catch (error) {
    res.status(400).json({success:false, message:error.message})
  }
}

export const login = async (req, res)=>{
    res.send("login")
}

export const logout = async (req, res)=>{
    res.send("logout")
}