const ProductModel=require('../Model/auth');
const bcrypt=require('bcryptjs');//step-1
exports.getAddReg=(req,res)=>
{
    let message=req.flash('error');//for printing error in msg in Reg form  
    console.log('msg');
    if(message.length>0)
    {
        message=message[0];
    }
    else
    {
        message=null;
    }
    res.render('Auth/reg',{
        titlePage:"reg",
        path:'/reg_details',
        errorMsg:message
    })
}
//collected values from terminal
exports.postFormReg=(req,res)=>
{
    console.log("Collected value from Reg=",req.body);
    let f_name=req.body.f_name;
    let l_name=req.body.l_name;
    let mail=req.body.mail;
    let pwd=req.body.pwd;
    console.log("Collected data from registration form=",f_name,l_name,mail,pwd)
   
    ProductModel.findOne({mail:mail})//step-2 for bcrypt(compare between model email and user email)
    .then(userValue=>
        {
            if(userValue)
            {
                console.log(userValue,"Email already exit");
                req.flash('error','Error::Email already exit,try new')
                return res.redirect('/reg_details')
            }
            return bcrypt.hash(pwd,12)
            .then(hashPwd=>
            {
                const userData=ProductModel({f_name:f_name,l_name:l_name,mail:mail,pwd:hashPwd})
                    return userData.save()
            }).then(results=>
                    {
                        console.log('Registration done')
                        return res.redirect('/log_details');
                    })
                    .catch(err=>
                    {
                        console.log(err)
                    })
        })
        .catch(err=>
        {
                    console.log("Error in findOne",err)
        })
    
}


 exports.getAddLog=(req,res)=>
{
    let message=req.flash('error');
    console.log('msg');
    if(message.length>0)
    {
        message=message[0];
    }
    else
    {
        message=null;
    }
    res.render('Auth/login',{
        titlePage:"login",
        path:'/log_details',
        errorMsg:message,
        cookie_data:req.cookies
    })
}

exports.postFormLog=(req,res)=>
{
  
    const  mail=req.body.mail;
    const pwd=req.body.pwd;
    const checked=req.body.checked;
    console.log("Collected value from login=",mail,pwd)
    ProductModel.findOne({mail:mail})
    .then(userValue=>
        {
            if(!userValue)
            {
                console.log("Invalid email");
                req.flash('error','Error::Invalid email')
                return res.redirect('/log_details')
            }
            bcrypt.compare(pwd,userValue.pwd)
            .then(result=>
                {
                    if(!result)
                    {
                        req.flash('error','Error::Invalid password')
                        console.log("Invalid pwd")
                    }
                    else
                    {
                        console.log('logged in' +result);
                        req.session.isLoggedIn=true;
                       
                        req.session.user=userValue;
                        return req.session.save(err=>
                            {
                                if(err)
                                {
                                    console.log(err)
                                }
                                else if(checked)
                                {
                                    const cookieData={mail:userValue.mail,pwd:pwd}
                                    res.cookie('cookieData',cookieData,
                                    {
                                        expires:new Date(Date.now()+12000000),
                                        httpOnly:true
                                    })
                                }
                                console.log("logged in");

                                return res.redirect('/user_product')
                            })
                    }
                    res.redirect('/log_details')
                })
                .catch(err=>
                    {
                        console.log("Error to compare",err);
                        res.redirect('/log_details')
                    })
            
        })
        .catch(err=>
            {
                console.log("Error to find email",err);
            })
    
}
exports.getLogout=(req,res)=>
{
    
       console.log("Log out");
        req.session.destroy();
        res.redirect('/log_details')
    
}