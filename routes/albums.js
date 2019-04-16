var express = require("express");
var router = express.Router();
var review = require("../models/review");

router.get("/",function(req,res){
    review.find({},function(err,allAlbums){
        if(err){
            console.log(err);
        }else{
            res.render("albums/index",{albums:allAlbums, currentUser:req.user});
        }
    })


});


router.post("/",isLoggedIn,function(req,res){
    // res.send("you hit the post route");
    var artist = req.body.artist;
    var image = req.body.image;
    var rev   = req.body.review;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newAlbum = {artist:artist, image:image, review:rev,author:author};
    
    review.create(newAlbum,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/albums");
        }
    })

   
});

router.get("/new",isLoggedIn,function(req,res){
    res.render("albums/new.ejs");
});

router.get("/:id",function(req,res){
    review.findById(req.params.id).populate("comments").exec(function(err,foundAlbum){
        if(err){
            console.log(err);
        }else{
            console.log(foundAlbum);
            res.render("albums/show", {album:foundAlbum});

        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");}


module.exports = router;
