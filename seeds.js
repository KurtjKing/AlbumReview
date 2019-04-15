var mongoose = require("mongoose");
var review = require("./models/review");
var Comment = require("./models/comment");
var data = [
    {
        artist:"Young Dolph",
        image:"https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        review:"its lit"
    },
    {
        artist:"Nipsey Hussle",
        image:"https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        review:"Victory Lap"
    },
    {
        artist:"Arcade fire",
        image:"https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
        review:"Bangers"
    }
]


function seedDB(){
    review.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed albums")
        data.forEach(function(seed){
            review.create(seed,function(err,data){
                if(err){
                    console.log(err)
                }else{
                    console.log("added an album");
                    Comment.create({text:"super fire",
                                    author:"kurt"    
                },function(err,comment){
                    if(err){
                        console.log(err)
                    }else{
                        data.comments.push(comment);
                        data.save(); 
                        console.log("created new comment");
                    }
                    
                });
                }
            })
        });
    });
    data.forEach(function(seed){
        review.create(seed,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log("added an album");
            }
        })
    });

    
}

module.exports = seedDB;

// function seedDB(){
//     //Remove all campgrounds
//     review.remove({}, function(err){
//          if(err){
//              console.log(err);
//          }
//          console.log("removed campgrounds!");
        //  Comment.remove({}, function(err) {
        //      if(err){
        //          console.log(err);
        //      }
        //      console.log("removed comments!");
              //add a few campgrounds
        //      data.forEach(function(seed){
        //          Campground.create(seed, function(err, data){
        //              if(err){
        //                  console.log(err)
        //              } else {
        //                  console.log("added a campground");
        //                  //create a comment
        //                  Comment.create(
        //                      {
        //                          text: "This place is great, but I wish there was internet",
        //                          author: "Homer"
        //                      }, function(err, comment){
        //                          if(err){
        //                              console.log(err);
        //                          } else {
        //                              data.comments.push(comment);
        //                              data.save();
        //                              console.log("Created new comment");
        //                          }
        //                      });
        //              }
        //          });
        //      });
        //  });
     
     //add a few comments
 
  
//  module.exports = seedDB;