import slugify from "slugify"
import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import fs from 'fs'
import dotenv from 'dotenv'
import orderModel from "../models/orderModel.js"

dotenv.config()

export const createProductController = async (req, res) => {
   try {
    const {
        name,
        slug,
        description,
        price,
        quantity,
        category,
        shipping } = req.fields

    const {photo} = req.files

        if(!name || !description || !price || !quantity || !category ) {
            return res.send({
                success : false,
                message : "Fill all the required fileds"
            })
        }

        if(photo && photo.size > 1000000 ){
            res.send({message : "Photo is required and should be less than 1 mb"})
        }

        const product = new productModel({...req.fields,slug :slugify(name)});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()

        res.send({
            success :true,
            message : "Product Saved Successfully",
            product
        })
    
   } catch (error) {
        console.log(error)
        res.send({
            success: false,
            error,
            message: "Error in Creating Products"
        })
   }
}


export const getProductsController = async (req,res)=>{
    try {

        const products = await productModel.find({}).select("-photo").sort({createdAt : - 1}).populate("category")
        res.send({
            success : true,
            message : "Listed Products",
            countTotal : products.length,
            products
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            error,
            message: "Error in getting Products"
        })
    }
}

export const getSingleProductController = async (req,res ) =>{
    try {

        const product = await productModel.findOne({slug : req.params.slug}).select("-photo").populate("category")

        if(!product){
            return res.status(401).send({
                success : false,
                message : "No such product found",
                
            })
        }

        res.status(201).send({
            success : true,
            message : "Got Single Product",
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting single Products"
        })
    }
}

export const productPhotoController = async(req,res) =>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")

        if(product.photo.data){
            res.set("Content-type",product.photo.contentType)
            return res.status(201).send(product.photo.data)
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting Product Photo"
        })
    }
}

export const deleteProductController = async (req,res) =>{
    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success : true,
            message : "Product deleted Succefully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting Product Photo"
        })
    }
}

export const updateProductController = async ( req,res)=>{
    try {
        const {
            name,
            slug,
            description,
            price,
            quantity,
            category,
            shipping } = req.fields
    
        const {photo} = req.files

        if(!name || !description || !price || !quantity || !category ) {
            return res.send({
                success : false,
                message : "Fill all the required fileds"
            })
        }

        if(photo && photo.size > 1000000 ){
            res.send({message : "Photo is required and should be less than 1 mb"})
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true})
            
            if(photo){
                product.photo.data = fs.readFileSync(photo.path)
                product.photo.contentType = photo.type
            }
    
            await product.save()
    
            res.send({
                success :true,
                message : "Product Updated Successfully",
                product
            })
        
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in Update product",
        });
    }
}

export const productFilterController = async (req,res)=>{
    try {
        const {checked} = req.body
        let args = {}
        if(checked?.length>0) args.category = checked
        const products = await productModel.find(args)
        
        res.send({
            success : true,
            products
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in Update product",
        });
    }
}

export const productCountController = async(re,res)=>{
    try {

        const total = await productModel.find({}).estimatedDocumentCount()
        res.send({
            success:true,
            total
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in getting total count",
        });
    }
}


export const productListController = async (req,res) =>{
    try {
        const perpage = 7
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1)*perpage).limit(perpage).sort({createdAt:-1})

        res.send({
            success : true,
            products
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in getting Product List",
        });
    }
}

export const searchProductController = async (req,res)=>{
    try {
        const {keyword} = req.params
        const result = await productModel.find({
            $or:[
                {name : { $regex : keyword, $options : "i"}},
                {description : { $regex : keyword, $options : "i"}}
            ]
        }).select("-photo")

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in Product Search Api",
        });
    }
}

export const categoryProductController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug : req.params.slug})
        const products = await productModel.find({category}).populate('category')

        
        res.send({
            success : true,
            products,
            category
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        success: false,
        error,
        message: "Error in category Product Search Api",
        });
    }
}

export const paymentController =async (req,res)=>{
    try {
        const {cart} = req.body
        const order = new orderModel({
            product : cart,
            buyer : req.user._id,
            payment : "Success"
        }).save()
        res.json({ok:true})
        
    } catch (error) {
        console.log("Error in make Payment Controller",error)
    }
}

