const express=require("express")
const {handleSignup,handleLogin}=require("../controllers/UserController")

const router=express.Router()


router.post("/signup",handleSignup)


router.post("/login",handleLogin)

router.get("/logout",(req,res)=>{
    res.clearCookie("token").status(201).json({
        success:true,
        message:"User logged out successfully!"
    })
})

router.get("/getUser",(req,res)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })
})

module.exports=router