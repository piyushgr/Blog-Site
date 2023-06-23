const mongoose=require('mongoose');
const { createtoken } = require('../services/authentication');
const Schema=mongoose.Schema;
const userSchema=new Schema({
     fullname:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
   //   salt:{
   //      type:String,
   //      required:true
   //   },
     password:{
        type:String,
        required:true
     },
     profileImageUrl:{
        type:String,
        default:'/images/default.png'

     },
     role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
     },
},
{timestamps:true});
userSchema.static('matchpassword',async function(email,password){
   const user=await this.findOne({email});
   if(!user) throw new Error("User not found");
   if(user.password!==password) throw new Error("Incorrect Password");
   else{
      const token=createtoken(user);
      return token;
   }
});
const User=mongoose.model('User',userSchema);
module.exports=User;