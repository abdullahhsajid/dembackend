import express, {Express,Request,Response} from 'express'
import monoose from 'mongoose'
import dotenv from 'dotenv'
import { userRegister,userLogin} from './controller/user'
import { createProduct,retrieveProduct,updateProduct,deleteProduct } from './controller/product'
import { auth } from './middleware/auth'
dotenv.config()

const app : Express = express()
const port = 8000
const uri : string = process.env.DB_URL || 'mongodb://localhost:27017/crudapp'

app.use(express.json())

monoose.connect(uri).then(() => {
    console.log("db connected") 
}).catch((err) =>{
    console.log(err)
})

// app.use('/',(req:Request,res:Response) => {
//     res.json({message:"ts world!"})
// })

app.post('/register',userRegister)
app.post('/login',userLogin)

app.post('/create',auth,createProduct)
app.get('/retrieve',auth,retrieveProduct)
app.put('/update/:id',auth,updateProduct)
app.delete('/delete/:id',auth,deleteProduct)

app.listen(port,()=>{
    console.log("server is runnning on :",port)
})
