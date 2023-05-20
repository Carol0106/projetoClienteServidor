const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.logout = async function (req, res, next) {
        try {
          const userId = req.body.id;

          // Verifica se o campo ID é válido
          if (!userId || typeof userId !== 'number') {
            return res.status(400).json({ error: 'Campo inválido' });
          }
      
          // Verifica se o usuário está autenticado
          const token = req.headers.authorization;
          if (!token) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
          }
      
          // Verifica se o usuário informado existe
          const user = await User.findOne({ id: userId });
      
          if (!user) {
            return res.status(401).json({ error: 'Usuário informado não existe' });
          }
      
          // Verifica se o ID informado no body corresponde ao ID do usuário solicitante
          const decodedToken = jwt.decode(token);
          console.log("oiii",decodedToken);
          if (!decodedToken || decodedToken.id !== user.id) {
            return res.status(401).json({ error: 'Não é possível realizar a solicitação' });
          }
      
          // Verifica se o token já está na blacklist
          if (blacklist.includes(token)) {
            return res.status(401).json({ error: 'Token inválido' });
          }
      
          // Realiza o logout do usuário e coloca o token na blacklist
          blacklist.push(token);
          return res.status(200).json({ message: 'Logout realizado com sucesso' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
};