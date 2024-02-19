const express= require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.Routes")
const {pictureRouter}=require("./routes/picture.Routes")

const app=express()
app.use(express.json())

app.use ("/users",userRouter)
app.use ("/picture",pictureRouter)

app.get("/",(req,res)=>{
    res.send({msg:"Welcome to home page"})
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`connected to port ${process.env.port}`)
        console.log("connected to DB")

    }catch(err){
        console.log(err)
    }
})


