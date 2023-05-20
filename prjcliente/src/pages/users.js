import Style from './../assets/styles/register.module.css';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { MD5 } from 'crypto-js';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorResponse, setErrorResponse] = useState(null);

    useEffect(() => {
      document.body.classList.add(Style.bodyClass);
    }, []);

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
      
      const hashedPassword = MD5(password).toString();

      const data = {
        name,
        email,
        password:hashedPassword,
      };
      
      try {
        const response = await api.post('/users', data);
            if(response.status === 200) {
                setErrorMessage('');
                clearFields();
                setSuccessMessage('Usuário criado com sucesso!');
            } else {
                setErrorMessage(response.data.message); 
            }
        } catch (error) {
            if (error.response.status === 422) {
              setErrorMessage("Já existe um cadastro com esse email.");
              console.error('Erro na requisição:', error.response);
            }
            else if (error.response) {
              console.error('Erro na requisição:', error.response);
              setErrorMessage(error.response.data.message);
              setSuccessMessage('');
            } else {
              console.error('Erro inesperado:', error);
              setErrorMessage('Ocorreu um erro ao criar o usuário.');
              setSuccessMessage('');
            }
        }
    };

    const clearFields = () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }

    return (
          <div className={`${Style.background}`}>
            <div className={`container ${Style.containerP}`}>
                {successMessage && <div className={`${Style.mensagemS}`}>{successMessage}</div>}
                {errorMessage && <div className={`${Style.mensagemE}`}>{errorMessage}</div>}
                {errorResponse && <div className={`${Style.mensagemE}`}>{errorResponse}</div>}

                <form onSubmit={handleSubmit}>
                <h2 className={`${Style.title}`}>Cadastro</h2>
                <input className={`${Style.input}`} type="text" name="name" placeholder="Nome" value={name}onChange={(event) => setName(event.target.value)}/><br />

                <input className={`${Style.input}`} type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/><br />

                <input className={`${Style.input}`} type="password" name="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/><br />

                <input className={`${Style.input}`} type="password" name="confirmpassword" placeholder="Confirmação de senha" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/><br />

                <div className={`row ${Style.botoes}`}>
                    <a href="/welcome" type="button" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                    <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Cadastrar</button>
                </div>

                <a className={`${Style.btnEntrar}`} href="/login"><b>Fazer Login</b></a>
                </form>
            </div>
          </div>
    )
}