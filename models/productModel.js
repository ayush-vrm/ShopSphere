import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        slug : {
            type : String,
            lowercase : true,
        },
        price : {
            type : Number,
            required : true
        },
        description :{
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        photo : {
            data : Buffer,
            contentType : String
        },
        category : {
            type : mongoose.ObjectId,
            ref : 'Category'
        },
        shipping :{
            type : Boolean
        }
    },
    {
        timestamps : true
    }
)

export default mongoose.model("Product",productSchema)