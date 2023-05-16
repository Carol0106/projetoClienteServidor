import Style from './../assets/styles/register.css';
import { useState } from 'react';
import api from '../services/api';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (name === '' || email === '' || password === '' || confirmPassword === '') {
        setErrorMessage('Por favor, preencha todos os campos!');
        return;
      }
    
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não correspondem.');
        return;
      }
    
      if (password.length < 2) {
        setErrorMessage('A senha deve conter pelo menos 2 caracteres.');
        return;
      }
    
      if (name.length < 2 || name.length > 125) {
        setErrorMessage('O nome deve conter entre 2 e 125 caracteres.');
        return;
      }
    
      if (email.length < 10 || email.length > 125) {
        setErrorMessage('O email deve conter entre 10 e 125 caracteres.');
        return;
      }

      if (!email.includes('@')) {
        setErrorMessage('Email inválido');
        return;
      }
      
      const data = {
        name,
        email,
        password,
      };
      
      try {
        const response = await api.post('/users', data);
            setSuccessMessage('Usuário criado com sucesso!');
            setErrorMessage('');
            clearFields();
        } catch (error) {
            setErrorMessage('Ocorreu um erro ao criar o usuário.');
            setSuccessMessage('');
            console.error(error);
        }
    };

    const clearFields = () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }

    return (
            <div className={`container containerP ${Style}`}>
                {successMessage && <div className={`mensagemS ${Style}`}>{successMessage}</div>}
                {errorMessage && <div className={`mensagemE ${Style}`}>{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                <input type="text" name="name" placeholder="Nome" value={name}onChange={(event) => setName(event.target.value)}/><br />

                <input type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/><br />

                <input type="password" name="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/><br />

                <input type="password" name="confirmpassword" placeholder="Confirmação de senha" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/><br />

                <div className={`row botoes ${Style}`}>
                    <a href="/welcome" type="button" className={`btn btcancelar ${Style}`}>Cancelar</a>
                    <button type="submit" className={`btn btsalvar ${Style}`}>Cadastrar</button>
                </div>
                </form>
            </div>
    )
}