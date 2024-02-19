const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    username:{type:String,required:true},
    email: {type:String,required:true, unique:true},
    pass:{type:String,required:true},
    city:{type:String,required:true},
    gender:{type:String,required:true}

},
{
    versionKey:false,
})
const userModel=mongoose.model("user",userSchema);
module.exports={
    userModel,
}