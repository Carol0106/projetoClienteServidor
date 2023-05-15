const Users = require('../models/UserModel');
const crypto = require('crypto');

exports.test = function (req, res) {
    res.render('createUsers');
};

exports.details = function (req, res) {
    Users.find({}).then(function(users){
        res.send(users);
    });
};

exports.create = function (req, res, next) {
    console.log(req.body);
    
    let nm = req.body.name;
    let em = req.body.email;
    let sn = req.body.password;

    console.log("name: ", nm);
    console.log("email: ", em);
    console.log("password: ", sn);

    let hash = crypto.createHash('md5').update(sn).digest('hex');

    let data = {
        name: nm,
        email: em,
        password: hash
    };
    // console.log("post request: ", req.body);
    Users.create(data).then(function (users) {
        res.redirect("/listAll");
    }).catch(next);
};

exports.edit = function(req, res, next) {
    Users.findOne({_id: req.params.id}).then(function(users){
        res.render('editUsers', {users:users});
    }).catch(next);
};

exports.update = function (req, res, next) {
    Users.findByIdAndUpdate({_id: req.params.id},
        req.body).then(function (){
            res.redirect('/listAll');
            // Users.findOne({_id: req.params.id}).then(function (users){
            //     res.send(users);
            // });
        }).catch(next);
};;

//APAGA E DEVOLVE O USUARIO DELETADO
exports.delete = function (req, res, next) {
    Users.findByIdAndDelete({_id:req.params.id}).then(function(users){
        console.log("Usuário deletado com sucesso!!");
        res.redirect('/listAll');
    }).catch(next);
};

exports.listAllUsers = function (req, res, next) {
    Users.find({}).then(function(user){
        res.render('listUsers', {users: user});
    }).catch(next);
};