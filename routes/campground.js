var express=require("express");
var router=express.Router();
//var multer=require("multer");
//var path=require("path");
var yelpcamp=require("../models/yelpcamp");
var comment=require("../models/comment");
//var fileupload=require("../models/upload");
//router.use('/public',express.static(__dirname+"/public"));

/*var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

var upload=multer({
    storage:Storage
}).single('file');
*/

router.get('/campgrounds',function(req,res){
    yelpcamp.find({},function(err,allcampgrounds){
        if(err)
        {
        console.log("error");
        }
        else
        {

            res.render("campgrounds",{data:allcampgrounds});
        }
    })
})

router.post('/campgrounds',isLoggedin,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={id: req.user._id, username:req.user.username };
    var data={name:name,image:image,description:desc,author:author};
    yelpcamp.create(data,function(err,allcampgrounds){
        if(err)
        {
        console.log("error");
        }
        else
        {
            req.flash("success","Campground added Successfully!")
            res.redirect('campgrounds');
        }
    })
})

router.get('/campgrounds/new',isLoggedin,function(req,res){
    res.render('index/new');
})

router.get('/campgrounds/:id',function(req,res){
    
    yelpcamp.findById(req.params.id).populate('comments').exec(function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
             
             res.render('index/show',{data:foundcampground});         
        }
    })
   
    
});
router.get('/campgrounds/:id/edit',ownership,function(req,res){
        yelpcamp.findById(req.params.id,function(err,foundcampground){
        res.render('index/edit',{data:foundcampground});   
        })
})



router.put('/campgrounds/:id',ownership,function(req,res){
    yelpcamp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
             req.flash("success","Updated Successfully!");
             res.redirect('/campgrounds/'+req.params.id);         
        }
    })    
})
router.delete('/campgrounds/:id',ownership,function(req,res){
    yelpcamp.findByIdAndRemove(req.params.id,req.body.camp,function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
             req.flash("success","Deleted Successfully!");
             res.redirect('/campgrounds');         
        }
    })    
})

function ownership(req,res,next){
    if(req.isAuthenticated())
    {
        yelpcamp.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
            if(foundcampground.author.id.equals(req.user._id)){
             next();   
            }
            else
            {
                req.flash("error","You are not authorized to do it!");    
                res.redirect('back');    
            }
        }
        })
    }
    else
    {
        req.flash("error","Please Login First");
        res.redirect('back');
    }
}

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    {
        req.flash("error","Please Login First");
        res.redirect('/login');
    }
}

module.exports=router;