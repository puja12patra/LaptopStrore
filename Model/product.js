const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;



const ProductSchema=new SchemaVariable({
 
  p_title:
  {
    type:String,
    required:true
  },
  p_price:
  {
    type:String,
    required:true
  },
  p_des:
  {
    type:String,
    required:true
  },
  p_image:
  {
    type:String,
    required:true
  }
})



module.exports=mongoose.model('ProductCollection',ProductSchema)
