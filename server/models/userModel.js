const mongoose = require('mongoose')

// User Schema

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },

    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
} , {timestamps:true})

module.exports = mongoose.model('users' , userSchema )
