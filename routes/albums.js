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


router.post("/",function(req,res){
    // res.send("you hit the post route");
    var artist = req.body.artist;
    var image = req.body.image;
    var rev   = req.body.review;
    var newAlbum = {artist:artist, image:image, review:rev};
    
    review.create(newAlbum,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/albums");
        }
    })

   
});

router.get("/new",function(req,res){
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


module.exports = router;
