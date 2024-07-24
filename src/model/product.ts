import { Schema,model } from "mongoose";

interface Product {
    name:string,
    price:number,
    description:string,
    stock:number
}

const productSchema = new Schema<Product>({
    name : {type:String,required:true},
    price : {type:Number,required:true},
    description : {type:String,required:true},
    stock : {type:Number,required:true}
})

export const ProductModel = model<Product>('Product',productSchema)

