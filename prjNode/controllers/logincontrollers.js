const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  // Verificar a quantidade mínima e máxima de caracteres na senha
  if (password.length < 2 || password.length > 125) {
    return res.status(400).json({ message: 'A senha deve ter entre 2 e 125 caracteres' });
  }

  // Verificar a quantidade mínima e máxima de caracteres no email
  if (email.length < 10 || email.length > 125) {
    return res.status(400).json({ message: 'O email deve ter entre 10 e 125 caracteres' });
  }

  // Verificar se o email contém o símbolo "@"
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'O email deve conter o símbolo "@"' });
  }

  
  try {
    // Calcular o hash MD5 da senha fornecida pelo usuário
    const HashPassword = crypto.createHash('md5').update(password).digest('hex');
    const user = await User.findOne({ email });

     // Verificar se o usuário existe e se a senha existe
    if (user && user.password === HashPassword) {
    // O login foi bem-sucedido
    // Gerar um token JWT com o ID do usuário
        const token = jwt.sign({ userId: user._id }, 'chaveToken', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido', token: token });
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