const multer=require('multer');
const path=require('path');
const {Router, request}=require('express');
const router=Router();
const Blog=require('../models/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    }
  })
  
  const upload = multer({ storage: storage })




  
  router.get('/addnewblog',(req,res)=>{
      res.render("addBlogs",{
          user:req.user
        })
    })
    router.post('/addnewblog',upload.single('coverImage'), async(req,res)=>{
        const {title,body,}=req.body;
        if(req.body.filename===undefined){
           var coverImageUrl='/compulsory.jpg'
        }
        else{
        var coverImageUrl=`/uploads/${req.file.filename}`
        }
        const blog=await Blog.create({
            body,
        title,
        createdBy:req.user._id,
        coverImageUrl

    });
    return res.redirect('/');
    
})
router.get('/more/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id);
    return res.render("blog",{
        user:req.user,
        blog
    })
})
module.exports=router; 