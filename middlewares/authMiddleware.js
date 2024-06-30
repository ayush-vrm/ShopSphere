import  JWT  from "jsonwebtoken"
import {User}  from "../models/userModels.js";

export const requireSignIn = async (req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user = decode
        next();
    } catch (error) {
       console.log(error)
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user._id)
        if(user.role !==1){
            return res.send({
                success : false,
                msg : "Unauthorised Access"
            })
        }
        else{
            next();
        }
    } catch (error) {
        res.send({
            success : false,
            msg : "Error in admin middleware"
        })
    }
}