var express=require("express");
var router=express.Router();
var yelpcamp=require("../models/yelpcamp");
var comment=require("../models/comment");
//Comment Routes

router.get('/campgrounds/:id/comments/new',isLoggedin,function(req,res){
    yelpcamp.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
             res.render('comments/new',{data:foundcampground});         
        }
    })
})

router.post('/campgrounds/:id/comments',isLoggedin,function(req,res){
    yelpcamp.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log("error");
        }
        else{
             comment.create(req.body.comment,function(err,found){
                 if(err){
                     console.log(err);
                 }
                 else
                 {
                     found.author.id=req.user._id;
                     found.author.username=req.user.username;
                     found.save();
                     foundcampground.comments.push(found);
                     foundcampground.save();
                     res.redirect('/campgrounds/'+req.params.id);
                 }
             })         
        }
    })    
})
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