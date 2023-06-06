import Style from './../../assets/styles/perfil.module.css';
import Menu from '../../componentes/menu';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import api from "./../../services/api";
import { MD5 } from 'crypto-js';

export default function Update() {
    const router = useRouter();
    const [dataUser, setDataUser] = useState(null);
    const [storedToken, setStoredToken] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(typeof window !== 'undefined') {
            // Recuperar a string JSON armazenada no localStorage
            const userDataJson = localStorage.getItem('userData');
            // Recupera token armazenado no localStorage
            const token = localStorage.getItem('token');
        
            // Verificar se há um token no armazenamento local
            if (!token) {
                router.push('/login');
            }

            if(userDataJson){
                // Converter a string JSON de volta para um objeto
                const userData = JSON.parse(userDataJson);
                setDataUser(userData);
                setName(userData.name);
                setEmail(userData.email);
            }

            setStoredToken(token);
        }
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await api.put(`/users/${dataUser.id}`, {
                name: name,
                email: email,
                password:(password.length < 1 || password == '')? null : MD5(password).toString()

            }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if(response.status === 200){
                console.log("Atualizado");
                setSuccessMessage(response.data.message);
                // Remover o userData existente do armazenamento local
                localStorage.removeItem('userData');
                
                // Criar um novo objeto userData com os dados recebidos
                const newUserData = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                };
                
                // Armazenar o novo userData no armazenamento local
                localStorage.setItem('userData', JSON.stringify(newUserData));
            }
        } catch (error) {
            if (error.response) {
                console.error('Erro na requisição:', error.response);
                setErrorMessage(error.response.data.message);
                setSuccessMessage('');
            } 
            // Trate os erros, se necessário
            console.error(error);
        }
    };

    return (
          <div className={`${Style.background}`}>

            {successMessage && <div className={`${Style.mensagemS}`}>{successMessage}</div>}
            {errorMessage && <div className={`${Style.mensagemE}`}>{errorMessage}</div>}
            
            <div className={`container ${Style.containerA}`}>
                <Menu/>

                <form onSubmit={handleUpdate}>
                    <h2 className={`${Style.title}`}>Atualizar cadastro</h2>
                    <input className={`${Style.input}`} type="text" name="name" placeholder="Nome" value={name} onChange={event => setName(event.target.value)}/><br />

                    <input className={`${Style.input}`} type="email" name="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/><br />

                    <input className={`${Style.input}`} type="password" name="password" placeholder="Nova senha" value={password} onChange={event => setPassword(event.target.value)} /><br />

                    <div className={`row ${Style.botoes}`}>
                        <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Atualizar</button>
                        <a href="/users/perfil" type="button" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                    </div>
                </form>
            </div>
          </div>
    )
}