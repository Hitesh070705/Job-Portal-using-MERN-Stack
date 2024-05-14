const  {ErrorHandler}=require("../middlewares/error")
const Application=require("../models/ApplicationSchema")
const Job=require("../models/JobSchema")
const cloudinary=require("cloudinary")

async function employerGetallApplications(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const id=req.user.id
    const applications=await Application.find({"employerID.user":id})
    res.status(200).json({
        success:true,
        applications
    })
}

async function jobseekerGetallApplications(req,res){
    const {role}=req.user
    if(role==='Employer'){
        return ErrorHandler("Employer is not allowed to access this resource",400)
    }
    const id=req.user.id
    const applications=await Application.find({"applicantID.user":id})
    res.status(200).json({
        success:true,
        applications
    })
}

async function jobseekerDeleteApplication(req,res){
    const {role}=req.user
    if(role==='Job Seeker'){
        return ErrorHandler("Job Seeker is not allowed to access this resource",400)
    }
    const {id}=req.params
    const application=await Application.findById(id)
    if(!application){
        return new ErrorHandler("Oops! Job not found",404)
    }
    await application.deleteOne()
    res.status(200).json({
        success:true,
        message:"Application Deleted Successfully"
    })
}

async function postApplication(req,res){
    const {role}=req.user
    if(role==='Employer'){
        return ErrorHandler("Employer is not allowed to access this resource",400)
    }
    if(!req.files || Object.keys(req.files).length==0){
        return new ErrorHandler("Resume File required",400)
    }
    const {resume}=req.files
    const allowedFormats=["image/jpg","image/png","image/webp"]
    if(!allowedFormats.includes(resume.mimetype)){
        return new ErrorHandler("Invalid File type. Please upload your resume in a PNG,JPG OR WEBP format")
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        resume.tempFilePath
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Cloudinary Error")
        return new ErrorHandler("Failed to uplload resume",400)
    }
    const {name,email,coverLetter,phone,address,jobID}=req.body
    const applicantID={
        user:req.user.id,
        role:"Job Seeker"
    }
    const jobDetails=await Job.findById(jobID)
    if(!jobDetails){
        return new ErrorHandler("Oops! Job not found!",404)
    }
    const employerID={
        user:jobDetails.postedBy,
        role:"Employer"
    }
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return new ErrorHandler("Please fill all fields! ",400)
    }
    const application=await Application.create({
        name,email,coverLetter,phone,address,applicantID,employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url    
        }
    })
    res.status(200).json({
        success:true,
        message:"Application submitted succesfully!"
    })
}

module.exports={employerGetallApplications,jobseekerGetallApplications,jobseekerDeleteApplication,postApplication}