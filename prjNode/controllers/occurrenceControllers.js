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

    // const isValidRegisteredAt = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(reg);
    // if (!isValidRegisteredAt) {
    //     return res.status(400).json({ error: 'Campos inválidos' });
    // }

    const isValidLocal = loc && loc.length >= 1 && loc.length <= 125;
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

    const count = await Occurrences.countDocuments();
    let id;

    if (count > 0) {
    const latestOccurrence = await Occurrences.findOne({}, {}, { sort: { id: -1 } });
    id = latestOccurrence.id + 1;
    } else {
    id = 1;
    }

    let data = {
        id: id,
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
        const occurrences = await Occurrences.find();
        res.status(200).json(occurrences);
    
      } catch (err) {
        return next(err);
      }
};

exports.getOccurrence = async function (req, res, next) {
    const userId = parseInt(req.params.id); 
    console.log("chegou no back", userId)

    // Verificar se o usuário solicitante está autenticado
    const token = req.headers['authorization'];
    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
    console.log("token",bearerToken)
    if (!bearerToken) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Verificar se o usuário informado existe
    const user = await User.findOne({ id: userId });

    if (!user) {
        return res.status(401).json({ error: 'Usuário informado não existe.' });
    }

    // Verificar se o user_id informado corresponde ao ID do usuário solicitante
    if (!decoded || decoded.id !== user.id) {
        return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
    }

    //Verifica se existe ocorrencias cadastradas
    let existOccorrences = await Occurrences.countDocuments();
   
    try {
        // Buscar todas as ocorrências do usuário autenticado
        const occurrences = await Occurrences.find({ user_id : userId });
    
        res.status(200).json(occurrences);
    } catch (err) {
        return next(err);
    }
};

exports.update = async function (req, res, next) {
    const idOccurrence =  req.params.id;
    const registered_at =   req.body.registered_at;
    const occurrence_type =   req.body.occurrence_type;
    const km =   req.body.km;
    const local =   req.body.local;
    const idUser =   req.body.user_id;

    console.log("chegou", req.body)

     // Verificar se o usuário solicitante está autenticado
     const token = req.headers['authorization'];
     const bearerToken = token.split(' ')[1];
     const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);

     if (!bearerToken) {
         return res.status(401).json({ error: 'Usuário não autenticado.' });
     }
 
     // Verificar se o usuário informado existe
     const user = await User.findOne({ id: decoded.id });
     if (!user) {
         return res.status(401).json({ error: 'Usuário informado não existe.' });
     }

      // Verificar se o user_id informado corresponde ao ID do usuário solicitante
    if (!decoded || decoded.id !== user.id) {
        return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
    }

     // Verificar se a ocorrencia informada existe
    const occurrence = await Occurrences.findOne({ id: idOccurrence });
    if (!occurrence) {
         return res.status(401).json({ error: 'Ocorrencia não existe.' });
    }

    // Validar todos os campos
    if (registered_at === '' || occurrence_type === '' ||  local === '' || km === '') {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
    }

    // const isValidRegisteredAt = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(reg);
    // if (!isValidRegisteredAt) {
    //     return res.status(400).json({ error: 'Campos inválidos' });
    // }

    const isValidLocal = local && local.length >= 1 && local.length <= 125;
    if (!isValidLocal) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }
   
    const isValidOccurrenceType = occurrence_type >= 1 && occurrence_type <= 10;
    if (!isValidOccurrenceType) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    const isValidKm = km >= 1 && km <= 9999;
    if (!isValidKm) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

    const isValidUserId = idUser >= 1;
    if (!isValidUserId) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }

     // Atualize os campos da ocorrência com os novos valores
    occurrence.registered_at = registered_at;
    occurrence.occurrence_type = occurrence_type;
    occurrence.km = km;
    occurrence.local = local;
    occurrence.user_id = idUser;

    try {
        // Salve a ocorrência atualizada no banco de dados
        await occurrence.save();
        console.log("ocorrencia atualizada!")
        return res.status(200).json(occurrence);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar a ocorrência.' });
    }


}


exports.delete = async function (req, res, next) {
    const occurrenceId = parseInt(req.params.id);
    
    // Verificar se o usuário solicitante está autenticado
    const token = req.headers['authorization'];
    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_C);
    console.log("token",bearerToken)
    if (!bearerToken) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }
    console.log("chegou para deletar", token)

    // Verificar se o usuário informado existe
    const user = await User.findOne({ id: decoded.id });
    if (!user) {
        return res.status(401).json({ error: 'Usuário informado não existe.' });
    }
    
    // Verificar se a ocorrencia informada existe
    const occurrence = await Occurrences.findOne({ id: occurrenceId });
    if (!occurrence) {
        return res.status(401).json({ error: 'Ocorrencia não existe.' });
    }

    // Verificar se o user_id informado corresponde ao ID do usuário solicitante
    if (!decoded || decoded.id !== user.id) {
        return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
    }

    // Verificar se o user_id informado corresponde ao ID do usuário solicitante
    if (occurrence.user_id !== decoded.id) {
        return res.status(401).json({ error: 'Não é possível realizar a solicitação.' });
    }

     try {
        // Remover a ocorrência do banco de dados
        await Occurrences.findOneAndDelete({ id: occurrenceId });

        return res.status(200).json({ message: 'Ocorrência removida com sucesso.' });
    } catch (err) {
        return next(err);
    }
}