const {Router}=require('express');
const User=require('../models/user');
const { escapeXML } = require('ejs');
const router=Router();

router.get('/signin',(req,res)=>{
    return res.render("signin");
})
router.get('/signup',(req,res)=>{
    return res.render("signup");
})

router.post('/signin', async(req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await User.matchpassword(email,password);
    return res.cookie("token",token).redirect("/");
    }
    catch{
        return res.render("signin",{error:"Incorrect Credentials"});
    }
})

router.post('/signup',async (req,res)=>{

    const {fullname,email,password}=req.body;
    await User.create(
        {
            fullname,
            email,
            password
        }
    ).catch((err)=>{
        console.log(err.message);
    })
    
    return res.redirect('/user/signin');
})
router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/user/signin');
    
})

module.exports=router;
