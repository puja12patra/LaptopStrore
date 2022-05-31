const express=require('express');
const home_router=express.Router();

const home_controller=require('../Controller/homeController');

home_router.get('/',home_controller.getHome);






module.exports=home_router;