const mongoose=require("mongoose")
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["Job Seeker","Employer"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

//Hashing the Password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)

})
//Comparing the Password
userSchema.methods.comparePassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model("User",userSchema)

module.exports=User