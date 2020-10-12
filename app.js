var express=require("express"),
     app=express(),
     passport=require("passport"),
     passportLocal=require("passport-local"),
     passportLocalMongoose=require("passport-local-mongoose"),
     user=require("./models/user"),
     bodyparse=require("body-parser"),
     flash=require('connect-flash'),
     methodoverride=require("method-override"),
     yelpcamp=require('./models/yelpcamp'),
     comment=require('./models/comment'),
     mongoose=require("mongoose"),
     seeddb=require('./seed');

var commentroutes = require('./routes/comment'),
    campgroundroutes = require('./routes/campground'),
    indexroutes = require('./routes/index');

//app.use('/public', express.static(__dirname+"/public"));
//seeddb();
//mongoose.connect('mongodb://localhost/Yelpcamp_app');
//mongodb+srv://vikas:vikash@bucket-vfxwu.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://vikas:vikash@yelpcamp-umirc.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://vikas:vikash@yelpcamp-umirc.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });


app.set('view engine','ejs');
app.use(bodyparse.urlencoded({extended:true}));
app.use(methodoverride('_method'));
app.use(flash());


//passport configuration
app.use(require("express-session")({
    secret:'Rusty is the best dog',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use(commentroutes);
app.use(campgroundroutes);
app.use(indexroutes);
/*yelpcamp.create({
   name:"Mountain hill",
   image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",
   description:"Hello im the Mountain hill campgrounds"
},function(err,campgrounds){
    if(err){
        console.log("error");
    }
    else
    {
        console.log(campgrounds);
    }
});*/

/*var campgrounds=[{name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg"},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"}]*/

app.listen(5000, process.env.IP, function(){
    console.log("Started");
});