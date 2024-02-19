const mongoose= require("mongoose")

const pictureSchema= mongoose.Schema({
    quote:{type:String,required:true},
    photo: {type:String,required:true},
    device:{type:String,required:true},
    commentsCount:{type:String,required:true},
    userID:{type:String,required:true}

},
{
    versionKey:false,
})
const pictureModel=mongoose.model("picture",pictureSchema);
module.exports={
    pictureModel,
}