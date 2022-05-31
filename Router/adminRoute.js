const Auth_check=require('../middle-ware/isAuth')
const express=require('express');
const admin_router=express.Router();

const admin_controller=require('../Controller/adminController');

admin_router.get('/add_product',admin_controller.getAddProduct);
admin_router.post('/post_product',admin_controller.postFormProduct);
admin_router.get('/show_product',Auth_check,admin_controller.getShowProducts);

admin_router.get('/edit/:pid',admin_controller.getEditDetails)
admin_router.post('/postEditedValue',admin_controller.postEditData)

admin_router.get('/delete/:pid',admin_controller.getDelete)
admin_router.post('/delete',admin_controller.postDelete)



module.exports=admin_router;