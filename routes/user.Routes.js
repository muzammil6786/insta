const express=require("express")
const {userModel}= require("../model/user.Model")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
const {blacklistModel}=require("../model/blacklist.model")

const userRouter=express.Router()
// adding user 
userRouter.post("/register",(req,res)=>{
    const {username,email,pass,city,gender}=req.body;
    try{
        bcrypt.hash(pass,8,async(err,hash)=>{
            if(hash){
                const user=new userModel({username,email,pass:hash,city,gender});
                await user.save();
                res.status(200)
                res.send({msg:"new user has been registered"})

            }
            else{
                res.status(404)
                res.send({msg:err})
            }
        })
    }
    catch(err){
        res.status(404)
        res.send({msg:err})
    }
})

// login user

userRouter.post("/login",async(req,res,)=>{
    const {email,pass}=req.body;
    try{
        const user =await userModel.findOne({email});
        if(!user){
            res.status(200).send({msg:"user not found"})
        }
        try{
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const accessToken=jwt.sign({id:user._id},"muz",{expiresIn:"1d"});
                    const refreshtoken=jwt.sign({id:user._id},"khan",{expiresIn:"7d"});
                    res.cookie("token",accessToken);
                    res.status(200).send({msg:"Login successful",accessToken,refreshtoken});
                }else{
                    res.status(400).send({msg:"Please check your password"})
                }
            });
        }
    
    catch(err){
        res.status(400).send({msg:err})
    }
    }catch(err){
        res.status(400).send({msg:err})
    }
})

// logout 
userRouter.get("/logout",async(req,res)=>{
    try{
        const token=req.cookies.token;
        console.log(token)
        const blackToken=new blacklistModel({token});
        await blackToken.save();
        res.status(200).send({msg:"Logout is successful"})
    }catch(err){
        res.status(400).send({msg:err}) 
    }
})



module.exports={
    userRouter
}