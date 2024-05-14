const express=require("express")
const {getalljobs,postjob,getmyjobs,updatejob,deletejob}=require("../controllers/JobController")

const router=express.Router()

router.get('/getall',getalljobs)
router.post('/post',postjob)
router.get('/getmyjobs',getmyjobs)
router.put("/update/:id",updatejob)
router.delete("/delete/:id",deletejob)

module.exports=router