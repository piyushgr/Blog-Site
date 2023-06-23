const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const path=require('path');

const app=express();
const PORT=8000 || process.env.PORT;
const userRoutes=require('./routes/user');
const adminRoutes=require('./routes/blog');
const checkforAuthenticationCookie = require('./middlewares/authentication');

const ATLAS_URI="mongodb+srv://themaster:test1234@cluster0.ep5myi0.mongodb.net/?retryWrites=true&w=majority";
const LOCAL_URI="mongodb://0.0.0.0:27017/";
const Blog=require('./models/blog');
mongoose.connect(ATLAS_URI).then(()=>{
     console.log("Mongodb Connected"); 
}).catch((err)=>{
    console.log(err.message);
})

app.set("view engine","ejs");
// app.set("views",path.resolve("./views"));

//middle ware
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get('/',async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    });
})
app.use("/blog",adminRoutes);
app.use("/user",userRoutes);


app.listen(PORT,()=>{
    console.log('listening at port 8000');
})
