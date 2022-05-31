exports.getHome=(req,res)=>
{
    res.render('Admin/index',{
        titlePage:"home",
        path:'/'

    })
}