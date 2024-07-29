const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true,
    },
    id:{
          type:String,
          required:true
    },
    price:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    Quantity:{
          type:Number,
          default:1,
    }
});

module.exports = mongoose.model("cart", cartSchema);