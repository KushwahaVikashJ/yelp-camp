var express=require("express");
var router=express.Router();
var user=require("../models/user");
var passport=require("passport");

router.get('/',function(req,res){
    res.render("landing");
})


//===Auth Routes====
router.get('/register',function(req,res){
    res.render('register');
})

router.post('/register',function(req,res){
    user.register(new user({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            
            req.flash("error",err.message);
            res.redirect('register');
        }
        else
        {
            passport.authenticate('local')(req,res,function(){
            req.flash("success","Welcome to Yelpcamp "+ user.username);    
            res.redirect('/campgrounds');
            })
        }
    })
})

router.get('/login',function(req,res){
    res.render('login',{message:req.flash("error")});
})

router.post('/login',passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}),function(req,res){});

router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","Logged Out Successfully!");
    res.redirect('/');
})

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    {
        req.flash("error","Please Login First!");
        res.redirect('/login');
    }
}
module.exports=router;