import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Style from './../assets/styles/login.module.css';
import api from './../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorResponse, setErrorResponse] = useState(null);
    const router = useRouter();
    const [token, setToken] = useState('');

    useEffect(() => {
      document.body.classList.add(Style.bodyClass);
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await api.post('/login', { email, password });
            console.log('Status da resposta:', response.status);
          
            if (response.status === 400 || response.status === 401) {
            //   setErrorMessage('Credenciais inválidas');
              setErrorResponse(response.data.message); 
            } else if (response.status === 200) {
                setErrorResponse('');
                setErrorMessage('');
                console.log('Login bem-sucedido');
                
                const token = response.data.token; // Obtém o token da resposta
                setToken(token); 
                localStorage.setItem('token', token); // Armazene o token no localStorage

                // Converter o objeto em formato JSON
                const userDataJson = JSON.stringify(response.data.dataUser);
                // Salvar a string JSON no localStorage
                localStorage.setItem('userData', userDataJson);
                
                // Navega para a página Home
                router.push('/home');
              // Redirecione o usuário ou realize outras ações
            } else {
            //   setErrorMessage('Erro ao fazer login');
              setErrorResponse(response.data.message); // Armazena a resposta de erro completa
            }
        } catch (error) {
            if (error.response) {
              console.error('Erro na requisição:', error.response);
              setErrorMessage(error.response.data.message);
            } else {
              console.error('Erro inesperado:', error);
              setErrorMessage('Erro inesperado');
            }
        }
      };

    return (
      <div className={`${Style.background}`}>
        <div className={`container ${Style.containerP}`}>

          {errorMessage && <p className={`${Style.mensagemE}`}>{errorMessage}</p>}
          {errorResponse && <p className={`${Style.mensagemE}`}>{errorResponse.message}</p>}

          <form onSubmit={handleLogin}>
              <h2 className={`${Style.title}`}>Login</h2>
              <input className={`${Style.input}`} type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange}  /><br />

              <input className={`${Style.input}`} type="password" name="password" placeholder="Senha" value={password} onChange={handlePasswordChange} /><br /><br />

              <div className={`row ${Style.botoes}`}>
                  <a href="/welcome" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                  <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Acessar</button>
              </div>
              <br/>
              <a className={`${Style.btnEntrar}`} href="/homeSemValidacao"><b>Entrar sem cadastro</b></a>
              <a className={`${Style.btnEntrar}`} href="/users"><b>Fazer cadastro</b></a>
          </form>
        </div>
      </div>    
    )
}