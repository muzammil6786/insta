const express = require("express");
const multer = require("multer");

const { pictureModel } = require("../model/picture.model");
const { auth } = require("../middleware/auth.middleware");

const pictureRouter = express.Router();

// adding picture
pictureRouter.post("/", auth, async (req, res) => {
  try {
    const picture = new pictureModel(req.body);
    await picture.save();
    res.status(200).send({ mdg: "picture has been added succesfully" });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

// view picture
pictureRouter.get("/", auth, async (req, res) => {
  try {
    const picture = await pictureModel.find({ userID: req.body.userID });
    res.status(200).send({msg:"picture of user",picture});
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

// patch 
pictureRouter.patch("/:pictureID",auth,async(req,res)=>{
    const {pictureID}=req.params;
    try{
        const picture=await pictureModel.findOne({_id:pictureID});
        if(picture.userID === req.body.userID){
            await pictureModel.findByIdAndUpdate({_id:pictureID},req.body);
            res.status(200).send({msg:`the picture with id ${pictureID}, has been updated `})
        }else{
            res.status(400).send({ msg:"you are not authorized" }); 
        }
    }catch(err){
        res.status(400).send({ msg: err });
    }
})

// delete
pictureRouter.delete("/:pictureID",auth,async(req,res)=>{
    const {pictureID}=req.params;
    try{
        const picture=await pictureModel.findOne({_id:pictureID});
        if(picture.userID === req.body.userID){
            await pictureModel.findByIdAndDelete({_id:pictureID},req.body);
            res.status(200).send({msg:`the picture with id ${pictureID}, has been deleted `})
        }else{
            res.status(400).send({ msg:"you are not authorized" }); 
        }
    }catch(err){
        res.status(400).send({ msg: err });
    }
}) 

module.exports = {
  pictureRouter,
};
