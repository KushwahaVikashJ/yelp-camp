var mongoose=require("mongoose");
var yelpcamp=require("./models/yelpcamp");
var comment=require("./models/comment");
var campgrounds=[{name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg",description:'blaha blaha'},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'},
    {name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg",description:'blaha blaha'},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'},
    {name:"Mountain hill",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'},
    {name:"River Camp",image:"https://pawnacamp.com/wp-content/uploads/2018/10/Pawna-lake-camping-camp-E-.jpg",description:'blaha blaha'},
    {name:"Fire Camp",image:"https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",description:'blaha blaha'}];
    
function seeddb()
{
    yelpcamp.remove({},function(err){
        if(err){
            console.log('Error');
        }
        else
        {
        console.log('Removed');
            campgrounds.forEach(function(seed){
            yelpcamp.create(seed,function(err,data){
                if(err){
                    console.log(err);
                }
                else
                {
                    console.log('added');
                    comment.create(
                        {
                            text:'this place is great',
                            author:'vikas'
                        },function(err,comment){
                            if(err)
                            {
                                console.log(err);
                            }
                            else{
                                data.comments.push(comment);
                                data.save();
                                console.log('comment added');
                            }
                        });
                }
            }) 
            })
        } 
             
    })
  
}

module.exports=seeddb;