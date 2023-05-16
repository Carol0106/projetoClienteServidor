import { useState } from 'react';
import { useRouter } from 'next/router';
import Style from './../assets/styles/login.css';
import api from './../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorResponse, setErrorResponse] = useState(null);
    const router = useRouter();

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
              setErrorResponse(response.data.message); // Armazena a resposta de erro completa
            } else if (response.status === 200) {
                setErrorResponse('');
                setErrorMessage('');
                console.log('Login bem-sucedido');
                router.push('/home'); // Navega para a página Home
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
        <div className={`container containerP ${Style}`}>

            {errorMessage && <p className={`mensagemE ${Style}`}>{errorMessage}</p>}
            {errorResponse && <p className={`mensagemE ${Style}`}>{errorResponse.message}</p>}

            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange}  /><br />

                <input type="password" name="password" placeholder="Senha" value={password} onChange={handlePasswordChange} /><br /><br />

                <div className={`row botoes ${Style}`}>
                    <button className={`btn btcancelar ${Style}`}>Cancelar</button>
                    <button type="submit" className={`btn btsalvar ${Style}`}>Acessar</button>
                </div>
                <br/>
                <a href="/homeSemValidacao"><b>Entrar sem cadastro</b></a>
            </form>
        </div>
     
    )
}