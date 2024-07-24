import { ProductModel } from "../model/product";
import { Request,Response } from "express";

const createProduct = async (req:Request,res:Response) => {
    try{
        const data = {
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            stock:req.body.stock
        }
        const productDetail = await ProductModel.create(data)
        await productDetail.save()
        res.status(201).json({message:"product created",data:productDetail,succsess:true})  
    }catch(err){
        res.status(500).json({message:err})
    }
}


const retrieveProduct = async (req:Request,res:Response) => {
    try{
        const productDetail = await ProductModel.find()
        res.status(201).json({message:"product created",data:productDetail,succsess:true})  
    }catch(err){
        res.status(500).json({message:err})
    }
}

const updateProduct = async (req:Request,res:Response) => {
    try{
        const data = {
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            stock:req.body.stock
        }
        const productDetail = await ProductModel.findByIdAndUpdate(req.params.id,data,{new:true})
        res.status(201).json({message:"product updated",data:productDetail,succsess:true})  
    }catch(err){
        res.status(500).json({message:err})
    }
}   

const deleteProduct = async (req:Request,res:Response) => {
    try{
        const productDel = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message:"product deleted",data:productDel,succsess:true})
    }catch(err){
        res.status(500).json({message:err})
    }
}

export {createProduct,retrieveProduct,updateProduct,deleteProduct}