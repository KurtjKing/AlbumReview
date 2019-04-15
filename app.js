var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var review = require("./models/review");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/User");


var PORT = process.env.PORT || 8000;
var app = express();

seedDB();
mongoose.connect("mongodb://localhost:27017/albumReviews", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



//////// passport  config ////////
app.use(require("express-session")({
    secret:"keep it like a ",
    resave:false,
    saveUnitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});



// moved to album.js
// var reviewSchema = mongoose.Schema({
//     artist:String,
//     image:String,
//     review:String
// });

// var review = mongoose.model("review",reviewSchema);


// review.create({
//     artist:"The White Stripes",
//     image:"data:image/jpeg;base64,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",
//     review:"this album is fire"
// }, function(err,review){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("new");
//         console.log(review);
//     }
// });



app.listen(PORT, function() {
    console.log("Listening on port:%s", PORT);
  });

app.get("/",function(req,res){
    res.render("albums/index");
});

app.get("/albums",function(req,res){
    review.find({},function(err,allAlbums){
        if(err){
            console.log(err);
        }else{
            res.render("albums/index",{albums:allAlbums, currentUser:req.user});
        }
    })


});


app.post("/albums",function(req,res){
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

app.get("/albums/new",function(req,res){
    res.render("albums/new.ejs");
});

app.get("/albums/:id",function(req,res){
    review.findById(req.params.id).populate("comments").exec(function(err,foundAlbum){
        if(err){
            console.log(err);
        }else{
            console.log(foundAlbum);
            res.render("albums/show", {album:foundAlbum});

        }
    });
});


app.get("/albums/:id/comments/new",isLoggedIn,function(req,res){
    review.findById(req.params.id, function(err,review){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{review:review});
        }   

    });
});

app.post("/albums/:id/comments",isLoggedIn, function(req,res){
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
})


app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/albums");
        });

        
    });
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/albums",
    failureRedirect:"/login"
}),function(req,res){

});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/albums");

});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}