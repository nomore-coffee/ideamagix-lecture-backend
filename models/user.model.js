const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    password:{type:String , required:true },
    role:{type:String , required:true },
  }),
  "user"
);

module.exports = User;