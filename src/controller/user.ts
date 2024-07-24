import { UserModel } from "../model/user";
import { Request,Response } from "express";
import jwt from 'jsonwebtoken'

const userRegister = async (req:Request,res:Response) => {
    try{
        const data = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }

        const userDetail = new UserModel(data)
        await userDetail.save()
        res.status(201).json({message:"user created",data:userDetail,succsess:true})
    }catch(err){
        res.status(500).json({message:err})
    }
}                           


const userLogin = async (req:Request,res:Response) => {
    try{
        const{email,password} = req.body
        const user  = await UserModel.findOne({email})
        if(!email){
            return res.status(404).json({message:"user not found",succsess:false})
        }
        if(password !== user?.password){
            return res.status(404).json({message:'wrong password',succsess:false})
        }
        const token = jwt.sign({
            id:user?._id
        },
        process.env.JWT_KEY as string)
        res.status(200).json({message:"user login",data:user,succsess:true,token})                                                          
    }catch(err){
        res.status(500).json({message:err})
    }
}

export {userRegister,userLogin}