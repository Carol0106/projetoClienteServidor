import Style from './../assets/styles/home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import api from "./../services/api";

export default function Menu() {
    const router = useRouter();
    const [dataUser, setDataUser] = useState(null);
    const [storedToken, setStoredToken] = useState('');
    const [error, setError] = useState(null); // Estado para armazenar o erro
   
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
            }

            setStoredToken(token);
        }
    }, []);
    
    async function logout() {
        if (!storedToken || !dataUser) {
            router.push('/login');
            return;
        }

          try {
            const response = await api.post('/logout',  { id: dataUser.id }, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              }
            });
      
            if(response.status === 200){
                localStorage.removeItem('token');
                router.push('/login');
            }
          } catch (error) {
            setError(error); // Armazena o erro no estado
            console.error('Ocorreu um erro ao fazer logout:', error);
          }
        }
    return(
        <div>
            <nav className={Style.navbar}>
                <ul className={Style['navbar-nav']}>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="/home"> 
                        home
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="/occurrences/getAll"> 
                        Listagem de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="">
                        Minha lista de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="/occurrences/create">
                        Reportar incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="/users/perfil">
                        Perfil
                        </a>
                    </li>
                    <li className={Style['nav-item']} >
                        <a className={Style.a}  onClick={logout}>
                        Sair
                        </a>
                    </li>
                </ul>
            </nav>  

            {error && <p className={`${Style.mensagemE}`}>{error.message}</p>}
        </div>
     )
}

 