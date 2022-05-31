const express=require('express');
const user_router=express.Router();


const user_controller=require('../Controller/userController');

user_router.get('/user_product',user_controller.getShowProducts);

user_router.get('/details/:pid',user_controller.getDetails);

user_router.post('/searchProduct',user_controller.searchProduct);

 user_router.post('/addToCart',user_controller.postAddToCart);
 user_router.get('/add_to_cart',user_controller.getCartPage);
 
 user_router.get('/delete_cart/:pid',user_controller.getDelete)

 
module.exports=user_router;