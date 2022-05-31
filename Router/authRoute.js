const express=require('express');
const auth_router=express.Router();

const auth_controller=require('../Controller/authController');

auth_router.get('/reg_details',auth_controller.getAddReg);
auth_router.post('/post_details',auth_controller.postFormReg);

auth_router.get('/log_details',auth_controller.getAddLog);
auth_router.post('/post_logindetails',auth_controller.postFormLog);

auth_router.get('/log_out',auth_controller.getLogout);

module.exports=auth_router;