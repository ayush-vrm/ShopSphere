import express from "express";
import {
    registerController,
    loginController,
    testController,
    resetPasswordController,
    updateUserProfile,
    orderController,
    allOrderController,
    orderStatusController
} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// RegisterRoute
router.post("/register", registerController);

router.post("/login", loginController)

router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.post("/reset-password",resetPasswordController)

router.get("/test",requireSignIn,isAdmin, testController)

router.put("/update-profile",requireSignIn,updateUserProfile)

router.get("/orders",requireSignIn,orderController)

router.get("/all-orders",requireSignIn,isAdmin,allOrderController)

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router