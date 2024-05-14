require('dotenv').config()
const express=require("express")
const path=require('path')
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const cors=require("cors")
const cookieParser=require('cookie-parser')
const {connectToMongoDb}=require("./connect")
const {checkAuthentication}=require("./middlewares/auth")
const {errorMiddleware}=require("./middlewares/error")

const userRoute=require("./routes/userRoutes")
const jobRoute=require("./routes/jobRoutes")
const applicationRoute=require("./routes/applicationRoutes")

const app=express()
const PORT=process.env.PORT || 8000

connectToMongoDb(process.env.MONGO_URL).then(res=>console.log("Mongodb Connection Successfull !"))


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())      
app.use(checkAuthentication)   
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// app.use(express.static(path.resolve("./public")))


app.use('/user',userRoute)
app.use('/job',jobRoute)
app.use('/application',applicationRoute)
app.use(errorMiddleware)


app.listen(PORT , ()=>{
    console.log(`Server started at PORT ${PORT}`)
})