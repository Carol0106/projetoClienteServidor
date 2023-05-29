const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  console.log(password)
  
  // Verificar a quantidade mínima e máxima de caracteres na senha
  if (!password || password.length < 2 || password.length > 125) {
    return res.status(400).json({ message: 'A senha deve ter entre 2 e 125 caracteres' });
  }
  
  // Verificar a quantidade mínima e máxima de caracteres no email
  if (!email || email.length < 10 || email.length > 125) {
    return res.status(400).json({ message: 'O email deve ter entre 10 e 125 caracteres' });
  }
  
  // Verificar se o email contém o símbolo "@"
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'O email deve conter o símbolo "@"' });
  }
  
  
  try {
    let HashPassword = '';
    // Verifica se a senha já está em formato de hash (32 caracteres hexadecimais)
    if (/^[0-9a-f]{32}$/i.test(password)) {
      // A senha já está em formato de hash, retorna a senha sem alteração
      HashPassword = password;
    }else {
      // A senha não está em formato de hash, calcula o hash MD5
      HashPassword = crypto.createHash('md5').update(password).digest('hex');
    }
   
    const user = await User.findOne({ email });

     // Verificar se o usuário existe e se a senha existe
    if (user && user.password === HashPassword) {
    // O login foi bem-sucedido

    // Calcular o tempo de expiração como 1 hora a partir do momento atual
    const tempoExpiracao = Math.floor(Date.now() / 1000) + 3600; // Adiciona 3600 segundos (1 hora)

    // Gerar um token JWT com o ID do usuário
        const token = jwt.sign({ exp: tempoExpiracao, id: user.id}, process.env.TOKEN_C );

        res.status(200).json({ message: 'Login bem-sucedido', token: token, id: user.id, name: user.name, email: user.email});
    } else {
    // Credenciais inválidas
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    // Tratar erros de conexão ou consulta
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};