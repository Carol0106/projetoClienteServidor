const Users = require('../models/UserModel');

exports.test = function (req, res) {
    res.render('testte');
};

exports.details = function (req, res) {
    Users.find({}).then(function(users){
        res.send(users);
    });
};

exports.create = function (req, res, next) {
    // console.log("post request: ", req.body);
    Users.create(req.body).then(function (users){
        res.send(users);
    }).catch(next);
};

exports.update = function (req, res, next) {
    Users.findByIdAndUpdate({_id: req.params.id},
        req.body).then(function (){
            Users.findOne({_id: req.params.id}).then(function (users){
                res.send(users);
            });
        }).catch(next);
};

//APAGA E DEVOLVE O USUARIO DELETADO
exports.delete = function (req, res, next) {
    Users.findByIdAndRemove({_id:req.params.id}).then(function(users){
        res.send(users);
    }).catch(next);
};