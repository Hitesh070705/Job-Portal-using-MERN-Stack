const mongoose = require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        minlength:3,
        maxlength:32
    },
    category:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
        minlength:[6,"Job location must contain atleast 50 characters"]
    },
    fixedSalary:{
      type:Number,
      minlength:4,
      maxlength:9
    }, 
    SalaryFrom:{
        type:Number,
        minlength:4,
        maxlength:9
      },
    SalaryTo:{
        type:Number,
        minlength:4,
        maxlength:9
      },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true
    }
},{timestamps:true})

const Job=mongoose.model("Job",jobSchema)

module.exports=Job