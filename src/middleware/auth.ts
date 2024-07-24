import { UserModel } from "../model/user";
import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload} from 'jsonwebtoken'

const auth = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const authorization  = req.headers['authorization'] as string
        if(!authorization){
            return res.status(404).json({message:"please login",succsess:false})
        }

        const [bearer,token] :string[] = authorization.split(' ')
       
        if(bearer !== 'Bearer'){
            return res.status(404).json({message:"please login",succsess:false})
        }

        const userdecode = jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload
        
        const user = await UserModel.findById(userdecode.id)
        if(!user){
            return res.status(404).json({message:"please login",succsess:false})
        }
        // req.user = user
        next()
        
    }catch(err){
        res.status(500).json({message:err})
    }
} 

export {auth}