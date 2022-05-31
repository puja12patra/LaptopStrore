const mongoose=require('mongoose');
const SchemaReg=mongoose.Schema;

const DetailSchema=new SchemaReg
({
      f_name:
      {
        type:String,
        required:true
      },
      l_name:
      {
        type:String,
        required:true
      },
      mail:
      {
        type:String,
        required:true
      },
      pwd:
      {
        type:String,
        required:true
      }
})
module.exports=mongoose.model('DetailCollection',DetailSchema)