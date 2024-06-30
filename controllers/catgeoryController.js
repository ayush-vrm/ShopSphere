import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status.send("Name is required")

        const existingCatgeory = await categoryModel.findOne({ name })
        if (existingCatgeory) {
            return res.send({ message: "Category Already Exist" })
        }

        const catgeory = await new categoryModel({
            name,
            slug: slugify(name)
        }).save()

        res.status(201).send({
            success: true,
            message: "Category Added",
            catgeory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in Category",
            success: false,
            error
        })
    }
}

export const updateCateggoryController = async (req,res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        )

        res.status(200).send({
            success : true,
            message : "Catgery Updated Successfully",
            category

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category Updation"
        })
    }
}

export const getCategoryController = async(req,res)=>{
    try {

        const categories = await categoryModel.find({})
        res.status(200).send({
            success :true,
            categories,
            message : "Listed Categories"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in while getting Category"
        })
    }
}


export const getOneCategoryController = async (req,res)=>{
    try {


        const category = await categoryModel.findOne({slug : req.params.slug})

        if(!category){
            return res.status(401).send({
                success : false,
                message : "No such categiry found",
                
            })
        }
        res.status(200).send({
            success : true,
            category,
            message : "Got single Category"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in while getting single Category"
        })
    }
}


export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : "Category deleted Succefully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting Category"
        })
    }
}