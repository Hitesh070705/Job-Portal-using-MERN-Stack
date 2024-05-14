const express=require("express")
const {employerGetallApplications,jobseekerGetallApplications,jobseekerDeleteApplication,postApplication}=require("../controllers/ApplicationController")

const router=express.Router()

router.get('/employer/getall',employerGetallApplications)
router.get('/jobseeker/getall',jobseekerGetallApplications)
router.delete('/delete/:id',jobseekerDeleteApplication)
router.post('/post',postApplication)


module.exports=router