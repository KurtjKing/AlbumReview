var express =  require("express");
var router = express.Router({mergeParams:true});
var Comment = require("../models/comment");
var review = require("../models/review");

router.get("/new",isLoggedIn,function(req,res){
    review.findById(req.params.id, function(err,review){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{review:review});
        }   

    });
});

router.post("/",isLoggedIn, function(req,res){
  review.findById(req.params.id, function(err,review){
    if(err){
        console.log("made it");
        console.log(err)
        res.redirect("/albums");
    }else{
        Comment.create(req.body.comment,function(err,comment){
            if(err){
                console.log(err);
            }else{
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                console.log(req.user.username);
                comment.save();
                review.comments.push(comment);
                review.save();
                console.log(comment);
                res.redirect("/albums");//'+ review._id); COME BACK TO THIS  
            }
        });
        
    }
  });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");}



module.exports = router;