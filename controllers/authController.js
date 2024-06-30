import { comparepassword, hashpassword } from "../helper/authHelper.js";
import orderModel from "../models/orderModel.js";
import { User } from "../models/userModels.js";
import JWT from "jsonwebtoken"


export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address,securityAns } = req.body

        if (!name) return res.send({ message: "Name is required" });
        if (!email) return res.send({ message: "email is required" });
        if (!password) return res.send({ message: "Password is required" });
        if (!phone) return res.send({ message: "Phone Number is required" });
        if (!address) return res.send({ message: "Address is required" });
        if (!securityAns) return res.send({ message: "Security Answer is required" });

        const chkUser = await User.findOne({ email });

        if (chkUser) {
           return res.status(200).send({
                success: false,
                message: "User already registered please login"
            })
        }
        
        const hashedpassword = await hashpassword(password)
        const user = await new User({
            name,
            email,
            password : hashedpassword,
            phone,
            address,
            securityAns
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered Successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }


}

export const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body

        // if(!email) return res.json({message : "Invalid Email"})
        // if(!password) return res.json({message : "Invalid Password"})
        if(!email || !password){
            return res.status(500).json({
                success : false,
                message:"Invalid email or password"
            })
        }

        const findUser = await User.findOne({email});
        // console.log("from Backend", findUser)
        if(!findUser){
            return res.json({
                success : false,
                message : "User not registered",
            })
        }

        const matchUser = await comparepassword(password,findUser.password);

        if(!matchUser){
            return res.status(200).send({
                success : false,
                message : "Invalid Password"
            })
        }

        const token = JWT.sign({_id:findUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        
        res.status(200).send({
            success : true,
            message : "User LoggedIn Succefully",
            user :{
                _id : findUser._id,
                name : findUser.name,
                email : findUser.email,
                phone : findUser.phone,
                address : findUser.address,
                role : findUser.role
            },
            token
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in login",
            error
        })
    }
}


export const resetPasswordController = async(req,res)=>{
    try {
        const {email,securityAns,newPassword} = req.body

        if(!email) return res.status(404).send({message: "Email is required"})
        if(!securityAns) return res.status(404).send({message: "security answer is required"})
        if(!newPassword) return res.status(404).send({message: "New Password is required"})

        const user = await User.findOne({email,securityAns})

        if(!user){
            return res.send({
                success : false,
                message : "Wrong Email or answer"
            })
        }

        const hashedpassword = await hashpassword(newPassword)
        await User.findOneAndUpdate(user._id,{password : hashedpassword})
        res.status(200).send({
            success : true,
            message : "Password reset Successfully"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Forgot Password",
            error
        })
    }
}

export const updateUserProfile = async (req,res) =>{
    try {
        const {name,phone,password,address} = req.body
        const user = await User.findById(req.user._id)

        const hashedPassword = password?await hashpassword(password) : undefined

        const updateUser = await  User.findByIdAndUpdate(user._id,{
            name : name || user.name,
            phone : phone || user.phone,
            address : address || user.address,
            password : hashedPassword || user.password
        },{new:true})

        res.send({
            success : true,
            message : "Profile Updated Successfully",
            updateUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Updating User Profile",
            error
        })
    }
}

// Getting orders from specific user
export const orderController = async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer : req.user._id}).populate("product","-photo").populate("buyer","name")
        res.send({
            success : true,
            message : "Got ALL Orders",
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in getting orders",
            error
        })
    }
}

// Getting all orders fron all user
export const allOrderController = async(req,res)=>{
    try {
        const orders = await orderModel.find().populate("product","-photo").populate("buyer","name").sort({createdAt : -1})
        res.send({
            success : true,
            message : "Got ALL Orders",
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in getting orders",
            error
        })
    }
}

// Updating order status
export const orderStatusController = async(req,res)=>{
    try {
        const {orderId} = req.params
        const {status}= req.body

        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.json(order)
        
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Error in updating orders status",
            error
        })
    }
}

export const testController = async(req,res)=>{
    res.send("test Protected route")
}


