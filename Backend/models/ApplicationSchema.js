const mongoose = require('mongoose');
// const validator=require("validator")

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:32
    },
    email:{
        type:String,
        // validator:[validator,isEmail,"Please provide a valid Email"],
        unique:true,
        required:true
    },
    coverLetter:{
        type:String,
        required:true
    },
    phone:{
      type:Number,
      required:true
    }, 
    address:{
        type:String,
        required:true
      }, 
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }

},{timestamps:true})

const Application=mongoose.model("Application",applicationSchema)

module.exports=Application