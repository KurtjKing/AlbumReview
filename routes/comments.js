var express =  require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comment");
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

router.post("/comments",isLoggedIn, function(req,res){
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
                review.comments.push(comment);
                review.save();
                res.redirect("/albums/" + review._id);
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