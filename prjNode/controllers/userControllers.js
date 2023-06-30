const Users = require('../models/UserModel');
const Occurrences = require('../models/OccurrenceModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.getData = async function (req, res) {
    try {
        const idUrl = parseInt(req.params.id);

        // Verifica se o usuário está autenticado
        const token = req.headers['authorization'];
        console.log(token)
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
        if (!bearerToken) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // Verifica se o usuário informado existe
        const user = await Users.findOne({ id: idUrl });

        if (!user) {
            return res.status(401).json({ error: 'Usuário informado não existe' });
        }

        // Verifica se o ID informado na URL corresponde ao ID do usuário solicitante

        if (!decoded || decoded.id !== idUrl) {
            return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
        }

        // Verifica se o campo ID é válido
        if (!idUrl || typeof idUrl !== 'number') {
            return res.status(400).json({ error: 'Campo inválido' });
        }


        return res.status(200).json({ message: 'Dados enviado com sucesso', name: user.name, email: user.email });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    // Users.find({}).then(function(users){
    //     res.send(users);
    // });
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

    const last = await Users.findOne().sort({_id: -1}).exec()
    const id = last?.id ? last.id + 1 : 1;

    let data = {
        id: id,
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


exports.update = async function (req, res, next) {
    try {
        const idUrl = parseInt(req.params.id);
        const nm = req.body.name;
        const em = req.body.email;
        const sn = req.body.password;

        // Verifica se o usuário está autenticado
        const token = req.headers['authorization'];
        console.log(token)
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
        if (!bearerToken) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // Verifica se o usuário informado existe
        const user = await Users.findOne({ id: idUrl });

        if (!user) {
            return res.status(401).json({ error: 'Usuário informado não existe' });
        }

        // Verifica se o ID informado na URL corresponde ao ID do usuário solicitante

        if (!decoded || decoded.id !== idUrl) {
            return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
        }

        // Verifica se os campos são válidos
        if (!idUrl || typeof idUrl !== 'number') {
            return res.status(400).json({ error: 'Campo inválido' });
        }
        if (idUrl.length < 1 || idUrl.length > 125) {
            return res.status(400).json({ message: 'A senha deve conter entre 1 e 125 caracteres.' });
        }

        if (nm === '' || em === '') {
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
    
        const existingUser = await Users.findOne({ email: em }).exec();
        if (existingUser && (existingUser.email !== em || existingUser.id !== idUrl)) {
        // Já existe um usuário com esse email
            return res.status(422).json({ message: 'Já existe um cadastro com esse email.' });
        }

        let hash = sn; // senha já veio em hash

        if (sn === null) {
          // Não atualizar a senha no banco de dados
        
          // Atualizar os dados do usuário no banco de dados
          const updatedUser = await Users.findOneAndUpdate(
            { id: idUrl },
            { name: nm, email: em },
            { new: true }
          ).exec();
        
          console.log("dados atualizados (sem senha)");
          return res.status(200).json({ message: 'Dados enviados com sucesso',
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
        });
        } else {
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
        
          // Atualizar os dados do usuário no banco de dados, incluindo a senha
          const updatedUser = await Users.findOneAndUpdate(
            { id: idUrl },
            { name: nm, email: em, password: hash },
            { new: true }
          ).exec();
       
          console.log("dados atualizados");
          return res.status(200).json({ message: 'Dados enviados com sucesso',
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
          });

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    // Users.findByIdAndUpdate({_id: req.params.id},
    //     req.body).then(function (){
    //         res.redirect('/listAll');
    //         // Users.findOne({_id: req.params.id}).then(function (users){
    //             //     res.send(users);
    //             // });
    //         }).catch(next);
};
        

//APAGA 
exports.delete = async function (req, res, next) {
    const userId = parseInt(req.params.id);
    console.log("chegouoooooooooos", userId)

     // Verifica se o usuário está autenticado
     const token = req.headers['authorization'];
     console.log(token)
     const bearerToken = token.split(' ')[1];
     const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
     if (!bearerToken) {
         return res.status(401).json({ error: 'Usuário não autenticado' });
     }

     // Verifica se o usuário informado existe
     const user = await Users.findOne({ id: userId });

     if (!user) {
         return res.status(401).json({ error: 'Usuário informado não existe' });
     }

     // Verifica se o ID informado na URL corresponde ao ID do usuário solicitante

     if (!decoded || decoded.id !== userId) {
         return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
     }
    
     try {
        // Remove o usuário do banco e todas sua ocorrencias e coloca o token na blacklist
        await Occurrences.deleteMany({ user_id: userId });
        await Users.findOneAndDelete({ id: userId });
        blacklist.push(token);
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        return next(err);
    }
};

