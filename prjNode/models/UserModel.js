const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User =  new Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
        required: [true,'*Campo obrigatório!'],
        maxlength:125,
        minlength:2
    },
    email:{
        type:String,
        required: [true,'*Campo obrigatório!'],
        maxlength:125,
        minlength:10
    },
    password:{ //hash !!!!!!!!!!!!!!!!!
        type:String,
        required: [true,'*Campo obrigatório!'],
        maxlength:125,
        minlength:2
    }
});

const Users = mongoose.model('User', User);
module.exports = Users;