const express=require('express');
const appServer=express();
//Multer is a node js middleware for handling multipart
const multer=require('multer')//for image upload,we have to import multer
const path=require('path');

const flash=require('connect-flash');


//step-1: import the session 1st(express-session & mongodb-session)
const session=require('express-session');
const mongodb_session=require('connect-mongodb-session')(session)

const cookieParser=require('cookie-parser');
const userModel=require("./Model/auth")

const admin_Routing=require('./Router/adminRoute');
const user_Routing=require('./Router/userRoute');
const home_Routing=require('./Router/homeRoute');
const auth_Routing=require('./Router/authRoute')

const mongoose=require('mongoose');
const dbDriver='mongodb+srv://Luci12patra:Luci12patra@cluster0.5b3kn.mongodb.net/NewProject?retryWrites=true&w=majority'

const csurf=require('csurf');
//step-2 :store the session
const storeValue=new mongodb_session({
    uri:'mongodb+srv://Luci12patra:Luci12patra@cluster0.5b3kn.mongodb.net/NewProject',
    collection:'my-session'
})
const csurfProtection=csurf();

appServer.use(cookieParser());
//step-3 : need to use the session

appServer.use(express.static(path.join(__dirname,'Public')))

appServer.use(express.urlencoded());//for value collection

appServer.set('view engine','ejs');
appServer.set('views','View');

appServer.use(flash()); //use flash

 
 //for image upload use image upload path
 appServer.use('/uploaded_image',express.static(path.join(__dirname,'uploaded_image')))
 const fileStorage=multer.diskStorage({
     destination:(req,file,callback)=>
     {
         callback(null,'uploaded_image')
     },
     filename:(req,file,callback)=>{
         callback(null,file.originalname)
     }
 });
const fileFilter=(req,file,callback)=>
{
    if(file.mimetype.includes("png")||
       file.mimetype.includes("jpg")||
       file.mimetype.includes("jpeg"))
       {
           callback(null,true)
       }
    else
    {
        callback(null,false)
    }   

}
//use the multer
appServer.use(multer({storage:fileStorage,
    fileFilter:fileFilter,limits:{fieldsize:1024*1024*5}}).single('p_image'));//p_image is name attribute

    appServer.use(session({secret:'secret-key',resave:false,saveUninitialized:false,store:storeValue}))

    appServer.use((req,res,next)=>
    {
        if(!req.session.user)
        {
            return next();
        }
        userModel.findById(req.session.user._id)
        .then(userValue=>
            {
                req.user=userValue;
                console.log('User details=',req.user)
                next();
            })
            .catch(err=> console.log("user not found",err));
     })
      appServer.use(csurfProtection);//for use of csurf
     appServer.use((req,res,next)=>
     {
         res.locals.isAuthenticated=req.session.isLoggedIn;
         res.locals.csrf_token=req.csrfToken();
         next();
     })


appServer.use(admin_Routing)
appServer.use(user_Routing)
appServer.use(home_Routing)
appServer.use(auth_Routing);

mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log("Mongoose  connected")
    appServer.listen(4000,()=>
    {
         console.log("Server Connected!");
     })
})
.catch(err=>
    {
        console.log("Mongoose not connected", err)
    })