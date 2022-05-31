const path=require('path');
const ProductModel=require('../Model/product');
const CartModel=require("../Model/cart");

exports.getShowProducts=(req,res)=>
{
    ProductModel.find()
    .then(product=>
        {
            res.render('User/view_product2',{
               titlePage:"details",
               data:product ,
               path:'/user_product'
            })
        })
    .catch(err=>
        {
            console.log("Data not Fetched",err)
        })
}

exports.getDetails=(req,res)=>
{
    let product_id=req.params.pid;
    console.log("Product id=",product_id);
   ProductModel.findById(product_id)
    .then(product=>
    {
      
            res.render('User/productDetails',{
                titlePage:"details",
                data:product,
                path:'/details/:pid'
            })
    })
    .catch(err=>
        {
            console.log("Product not Found",err);
        })
}

exports.searchProduct=(req,res)=>
{
    const s_text=req.body.searchText;
    console.log("Searching text:",s_text);
    ProductModel.find({p_title:s_text})
    .then(results=>
        {
            console.log("After searching: ",results);
            res.render('User/view_product2',{
                titlePage:"Details",
                data:results,
                path:'/searchProduct'
            })
        })
     .catch(err=>
        {
            console.log("No such Product Found",err)
        })   

} 

exports.postAddToCart=(req,res)=>
{
    const pId=req.body.productId;
    const quantity=req.body.quantity;
    const userId=req.user._id;
    const cartValue=[];
    console.log("After add the cart:Pid:",pId,"Q:",quantity,"Id:",userId);
    CartModel.find({userId:userId,product_id:pId})
    .then(cartData=>
        {
            if(cartData=='')
            {
                ProductModel.findById(pId)
                .then(productForCart=>
                    {
                      cartValue.push(productForCart);
                      const cartProduct=new CartModel({product_id:pId,quantity:quantity,userId:userId,cart:cartValue});
                      cartProduct.save()
                      .then(result=>
                        {
                          console.log('Product added into Cart');
                          res.redirect('/add_to_cart');
                        })
                      .catch(err=>
                        {
                            console.log(err);
                        })
                    })
                    .catch(err=>
                        {
                            console.log("Product can not be added")
                        })
            }
            else
            {
              ProductModel.findById(pId)
              .then(productForCart=>
                {
                    cartValue.push(productForCart);
                    const cartProduct=new CartModel({product_id:pId,quantity:quantity,userId:userId,cart:cartValue});
                    cartProduct.save()
                    .then(result=>
                        {
                            console.log('product added successfully');
                            res.redirect('/add_to_cart');
                        })
                    .catch(err=>
                        {
                            console.log(err);
                        })    
                })
                .catch(err=>
                    {
                        console.log("Product not be added")
                    })
            }
        })
        

}

exports.getCartPage=(req,res)=>
{
    const user_id=req.session.user._id;
    CartModel.find({userId:user_id})
    .then(viewProductCart=>{
        res.render('User/add_to_cart',
        {
          titlePage:'cart',
          path:'/add_to_cart',
          data:viewProductCart  
        });
    })
    .catch(err=>
        {
            console.log(err);
        })
}

exports.getDelete=(req,res)=>
{
    let cart_id=req.params.pid;
    console.log("Cart id=",cart_id);
    CartModel.deleteOne({_id:cart_id})
    .then(results=>
    {
      console.log(results)
      res.redirect('/add_to_cart')
           
    })
    .catch(err=>
        {
            console.log("Error for delete",err);
        })
}