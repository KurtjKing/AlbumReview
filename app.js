var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var review = require("./models/review");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");



var commentRoutes =  require("./routes/comments");
var albumRoutes = require("./routes/albums");
var indexRoutes = require("./routes/index");


var PORT = process.env.PORT || 8000;
var app = express();

// seedDB();
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

app.use("/albums/:id/comments",commentRoutes);
app.use(indexRoutes);
app.use("/albums",albumRoutes);

app.listen(PORT, function() {
    console.log("Listening on port:%s", PORT);
  });

// app.get("/",function(req,res){
//     res.render("albums/index");
// });

// app.get("/albums",function(req,res){
//     review.find({},function(err,allAlbums){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("albums/index",{albums:allAlbums, currentUser:req.user});
//         }
//     })


// });


// app.post("/albums",function(req,res){
//     // res.send("you hit the post route");
//     var artist = req.body.artist;
//     var image = req.body.image;
//     var rev   = req.body.review;
//     var newAlbum = {artist:artist, image:image, review:rev};
    
//     review.create(newAlbum,function(err,newlyCreated){
//         if(err){
//             console.log(err);
//         }else{
//             res.redirect("/albums");
//         }
//     })

   
// });

// app.get("/albums/new",function(req,res){
//     res.render("albums/new.ejs");
// });

// app.get("/albums/:id",function(req,res){
//     review.findById(req.params.id).populate("comments").exec(function(err,foundAlbum){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(foundAlbum);
//             res.render("albums/show", {album:foundAlbum});

//         }
//     });
// });


// app.get("/albums/:id/comments/new",isLoggedIn,function(req,res){
//     review.findById(req.params.id, function(err,review){
//         if(err){
//             console.log(err);
//         } else{
//             res.render("comments/new",{review:review});
//         }   

//     });
// });

// app.post("/albums/:id/comments",isLoggedIn, function(req,res){
//   review.findById(req.params.id, function(err,review){
//     if(err){
//         console.log("made it");
//         console.log(err)
//         res.redirect("/albums");
//     }else{
//         Comment.create(req.body.comment,function(err,comment){
//             if(err){
//                 console.log(err);
//             }else{
//                 review.comments.push(comment);
//                 review.save();
//                 res.redirect("/albums/" + review._id);
//             }
//         });
        
//     }
//   });
// })


// app.get("/register",function(req,res){
//     res.render("register");
// });

// app.post("/register",function(req,res){
//     var newUser = new User({username:req.body.username});
//     User.register(newUser,req.body.password,function(err,user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req,res,function(){
//             res.redirect("/albums");
//         });

        
//     });
// });

// app.get("/login",function(req,res){
//     res.render("login");
// });

// app.post("/login",passport.authenticate("local",{
//     successRedirect:"/albums",
//     failureRedirect:"/login"
// }),function(req,res){

// });

// app.get("/logout",function(req,res){
//     req.logout();
//     res.redirect("/albums");

// });

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }    