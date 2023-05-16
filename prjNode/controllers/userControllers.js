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

    if (nm === '' || em === '' || sn === '') {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
    }

    if (sn.length < 2) {
        return res.status(400).json({ message: 'A senha deve conter pelo menos 2 caracteres.' });
    }

    if (nm.length < 2 || nm.length > 125) {
        return res.status(400).json({ message: 'O nome deve conter entre 2 e 125 caracteres.' });
    }

    if (em.length < 10 || em.length > 125) {
        return res.status(400).json({ message: 'O email deve conter entre 10 e 125 caracteres.' });
    }

    if (!em.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    let hash = crypto.createHash('md5').update(sn).digest('hex');

    let data = {
        name: nm,
        email: em,
        password: hash
    };
    
    Users.findOne({ email: em }, function (err, user) {
        //se der erro na consulta do banco 
        if (err) {
          return next(err);
        }
        if (user) {
          // Já existe um usuário com esse email
          return res.status(422).json({ message: 'Já existe um cadastro com esse email.' });
        }
        // Criar um novo usuário
        Users.create(data).then(function (users) {
            res.redirect("/listAll");
        }).catch(next);
    });
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