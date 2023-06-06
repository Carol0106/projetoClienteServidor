const Occurrences = require('../models/OccurrenceModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


exports.create = async function (req, res, next) {
    console.log("dados", req.body);

    let reg = req.body.registered_at;
    let loc = req.body.local;
    let occ = req.body.occurrence_type;
    let km = req.body.km;
    let user_id = req.body.user_id;

    // Verificar se o usuário solicitante está autenticado
    const token = req.headers['authorization'];
    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
    console.log("token",bearerToken)
    if (!bearerToken) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Verificar se o usuário informado existe
    const user = await User.findOne({ id: user_id });

    if (!user) {
        return res.status(401).json({ error: 'Usuário informado não existe.' });
    }

    // Verificar se o user_id informado corresponde ao ID do usuário solicitante
    if (!decoded || decoded.id !== user.id) {
        return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
    }

    // Validar todos os campos
    if (reg === '' || loc === '' ||  occ === '' || km === '') {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
    }

    const isValidRegisteredAt = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(reg);
    if (!isValidRegisteredAt) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    const isValidLocal = loc && loc.length >= 10 && loc.length <= 125;
    if (!isValidLocal) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }
   
    const isValidOccurrenceType = occ >= 1 && occ <= 10;
    if (!isValidOccurrenceType) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    const isValidKm = km >= 1 && km <= 9999;
    if (!isValidKm) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    const isValidUserId = user_id >= 1;
    if (!isValidUserId) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    let id = await Occurrences.countDocuments();

    let data = {
        id: id === 0? 1: id+1,
        registered_at: reg,
        local: loc,
        occurrence_type: occ,
        km: km,
        user_id: user_id,
        token: bearerToken
    };

    console.log("data:", data);

    try {
        // Criar uma nova occorencia
        const createdOccurrence = await Occurrences.create(data);
        res.status(200).json({ message: 'Cadastro bem-sucedido', id: data.id, registered_at: data.registered_at, local: data.local, occurrence_type: data.occurrence_type, km: data.km, user_id: data.user_id, token: data.token});
    } catch (err) {
        return next(err);
    }
  
};


exports.listAll = async function (req, res, next) {
    try {
        let existOccorrences = await Occurrences.countDocuments();
        // Buscar todas as ocorrências
        //Verifica se existe ocorrencias cadastradas
        if(existOccorrences > 0){
            const occurrences = await Occurrences.find();
            res.status(200).json({ occurrences });
        }
        else{
            res.status(200).json({ occurrences:[] });
        }
    
      } catch (err) {
        return next(err);
      }
};