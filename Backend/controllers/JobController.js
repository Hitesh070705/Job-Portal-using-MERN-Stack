const  {ErrorHandler}=require("../middlewares/error")
const Job=require("../models/JobSchema")

async function getalljobs(req,res){
    const jobs=await Job.find({expired:false})
    res.status(200).json({
        success:true,
        jobs
    })
}

async function postjob(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const {title,description,category,country,city,location,fixedSalary,SalaryFrom,SalaryTo}=req.body
    if(!title || !description || !category || !country || !city || !location){
        return new ErrorHandler("Please provide full job details!")
    }
    if((!SalaryFrom || !SalaryTo) && !fixedSalary){
        return new ErrorHandler("Please either provide fixed salary or ranged salary")
    }
    if(SalaryFrom && SalaryTo && fixedSalary){
        return new ErrorHandler("Cannot enter fixed salary and ranged salary together")
    }
    const postedBy=req.user.id
    const job=await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        SalaryFrom,
        SalaryTo,
        postedBy
    })
    res.status(200).json({
        success:true,
        message:"Job Posted successfully",
        job
    })
}

async function getmyjobs(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const myjobs=await Job.find({postedBy:req.user.id})
    res.status(200).json({
        success:true,
        myjobs
    })
}

async function updatejob(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const {id}=req.params
    const job=await Job.findById(id)
    if(!job){
        return new ErrorHandler("Oops! Job not found",404)
    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        job,
        message:"Job Updated Successfully"
    })
}

async function deletejob(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const {id}=req.params
    const job=await Job.findById(id)
    if(!job){
        return new ErrorHandler("Oops! Job not found",404)
    }
    await job.deleteOne()
    res.status(200).json({
        success:true,
        message:"Job Deleted Successfully"
    })
}

module.exports={
    getalljobs,postjob,getmyjobs,updatejob,deletejob
}