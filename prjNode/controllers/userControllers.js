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

exports.create = async function (req, res, next) {
    console.log(req.body);

    let nm = req.body.name;
    let em = req.body.email;
    let sn = req.body.password;

    if (nm === '' || em === '' ||  sn === '') {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
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

    let hash = sn; //senha já veio em hash

    // Verificar se a senha não está em hash 
    if (typeof sn === 'string' && sn.length !== 32) {
        if (sn.length < 2) {
            return res.status(400).json({ message: 'A senha deve conter pelo menos 2 caracteres.' });
        } else if (sn.length > 125) {
            return res.status(400).json({ message: 'A senha deve conter no máximo 125 caracteres.' });
        } else {
            // Transformar a senha em hash
            hash = crypto.createHash('md5').update(sn).digest('hex');
        }
    }

    let id = await Users.countDocuments();

    let data = {
        id: id === 0? 1: id+1,
        name: nm,
        email: em,
        password: hash
    };

    try {
        const existingUser = await Users.findOne({ email: em }).exec();
        if (existingUser) {
            console.log(existingUser)
            // Já existe um usuário com esse email
            return res.status(422).json({ message: 'Já existe um cadastro com esse email.' });
        }
        // Criar um novo usuário
        const createdUser = await Users.create(data);
        res.status(200).json({ message: 'Cadastro bem-sucedido', usuario: createdUser});
        // res.redirect("/listAll");
    } catch (err) {
        return next(err);
    }
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