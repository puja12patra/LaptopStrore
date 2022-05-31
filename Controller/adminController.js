
const ProductModel=require('../Model/product');
 const path=require('path')
exports.getAddProduct=(req,res)=>
{
    res.render('Admin/add_product',{
        titlePage:"add product",
        path:'/add_product'
    })
}
//collected values from terminal
exports.postFormProduct=(req,res)=>
{
    console.log("Collected value from products=",req.body);
    let p_title=req.body.product_title;
    let p_price=req.body.product_price;
    let p_des=req.body.product_description;
    let p_image=req.file;
    let p_imageUrl=p_image.path;
    
   
    const formData=new ProductModel({p_title:p_title,p_price:p_price,p_des:p_des,p_image:p_imageUrl});

    formData.save()
        .then(results=>
        {
           console.log("Data Saved",results)
        })
        .catch(err=>
        {
            console.log("Data not Saved",err)
        })
        //can be redirect add_product to show_product
    res.redirect('/show_product');
}
//how to fetch data 
 exports.getShowProducts=(req,res)=>
 {
     ProductModel.find()
     .then(product=>
    {  
        res.render('Admin/view_product',{
            titlePage:"details",
              data:product,
              path:'/show_product'
        })

    })
    .catch(err=>{
        console.log("Data not fetched",err);
    })
     
 }
//for edit
 exports.getEditDetails=(req,res)=>
{
    let product_id=req.params.pid;
    console.log("Product id=",product_id);
   ProductModel.findById(product_id)
    .then(product=>
    {
      
            res.render('Admin/edit',{
                titlePage:"details",
                data:product,
                path:'/edit/:pid'
            })
    })
    .catch(err=>
        {
            console.log("Product not Found",err);
        })
}

exports.postEditData=(req,res)=>
{
    console.log("Collected value from edit products=",req.body);
    let edit_title=req.body.edit_title;
    let edit_price=req.body.edit_price;
    let edit_des=req.body.edit_des;
    let edit_id=req.body.prod_id;
    let edit_img=req.file;
    let p_imageUrl=edit_img.path;
    
    //const upDatedData=new ProductModel(edit_title,edit_price,edit_des,edit_id);
   ProductModel.findById(edit_id)
   .then(oldData=>
    {
        oldData.p_title=edit_title;
        oldData.p_price=edit_price;
        oldData.p_des=edit_des;
        oldData.p_image=p_imageUrl;
       
       
        return oldData.save()
   
        .then(results=>
        {
           console.log("Edited data Saved",results)
           res.redirect('/show_product');
        })
        .catch(err=>
        {
            console.log("Edited Data not Saved",err)
        })
       
    })
    .catch(err=>
        {
            console.log("Product not found",err)
        })
}
exports.getDelete=(req,res)=>
{
    let product_id=req.params.pid;
    console.log("Product id=",product_id);
   ProductModel.deleteOne({_id:product_id})
    .then(results=>
    {
      console.log(results)
      res.redirect('/show_product')
           
    })
    .catch(err=>
        {
            console.log("Error for delete",err);
        })
}
exports.postDelete=(req,res)=>
{
    let product_id=req.body.product_id;
    console.log("Product id=",product_id)
    ProductModel.deleteOne({_id:product_id})
    .then(results=>
    {
      console.log(results)
      res.redirect('/show_product')
           
    })
    .catch(err=>
        {
            console.log("Error for delete",err);
        })
}