import Style from './../assets/styles/home.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import api from "./../services/api";
import jwt from 'jsonwebtoken';

export default function Home() {
    const [token, setToken] = useState('');
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar se há um token no armazenamento local
        const storedToken = localStorage.getItem('token');
        const storedLoggedIn = localStorage.getItem('loggedIn');
       
        if (storedLoggedIn === true) {  
            setLoggedIn(true);
        } else if(storedToken) {
            setToken(storedToken);
        }
        else{
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        console.log("oi", loggedIn)
        if (loggedIn) {
            // Chamar a função fetchData quando os dados de login forem atualizados
            fetchData();
        }
    }, [loggedIn]);

    async function fetchData() {
        console.log("chegou aqui");
        try {
            const response = await api.post('/login', {
                email: email,
                password: password,
            });
            const token = response?.data?.token;
            console.log("TOKENNN", token);
            const decodificarToken = jwt.verify(token, 'chaveToken');
            const userId = decodificarToken?.userId;
            console.log("user id", userId);
            
            const data = response?.data;
            console.log("data", data);

        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    }


    return (
        <div>
            {console.log(token)}
            <div className={Style.banner}>
                <h1 className={Style.txtinicial}>
                    Sistema de aviso de ocorrências de interrupção <br />
                    de tráfego em rodovias (SAOITR)
                </h1>
            </div>  
            <nav className={Style.navbar}>
                <ul className={Style['navbar-nav']}>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href=""> 
                        Listagem de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="">
                        Minha lista de incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="">
                        Reportar incidentes
                        </a>
                    </li>
                    <li className={Style['nav-item']}>
                        <a className={Style.a} href="">
                        Perfil
                        </a>
                    </li>
                    <li className={Style['nav-item']} >
                        <a className={Style.a} href="/welcome">
                        Sair
                        </a>
                    </li>
                </ul>
            </nav>  
          
        </div>
    )
}