var mongoose = require("mongoose");



var reviewSchema = new mongoose.Schema({
    artist:String,
    image:String,
    review:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("review",reviewSchema);