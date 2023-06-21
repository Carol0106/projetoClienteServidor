import Style from './../../assets/styles/perfil.module.css';
import Menu from '../../componentes/menu';
import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { useRouter } from "next/router";

export default function Perfil() {
    const router = useRouter();
    const [dataUser, setDataUser] = useState(null);
    const [storedToken, setStoredToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Recuperar a string JSON armazenada no localStorage
            const userDataJson = localStorage.getItem('userData');
            // Recupera token armazenado no localStorage
            const token = localStorage.getItem('token');
        
            // Verificar se há um token no armazenamento local
            if (!token) {
                router.push('/login');
            }

            if (userDataJson) {
                // Converter a string JSON de volta para um objeto
                const userData = JSON.parse(userDataJson);
                setDataUser(userData);
            }

            setStoredToken(token);
        }
    }, [router]);

    useEffect(() => {
        if (dataUser) {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/users/${dataUser.id}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });

                    if(response.status === 200){
                        setUserName(response.data.name);
                        setUserEmail(response.data.email);
                    }
                } catch (error) {
                    // Trate os erros, se necessário
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [dataUser, storedToken]);

    
    async function fetchUserDelete(){
        if (dataUser) {
            try {
                console.log("entrou")
                const response = await api.delete(`/users/${dataUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            } catch (error) {
                // Trate os erros, se necessário
                console.error(error);
            }
        }
    }

    return (
        <div>
          <div className={`${Style.background}`}>
            <div className={`container ${Style.containerP}`}>
                <Menu/>

                <div className={`${Style.imgPerfil}`}></div>
                <div>
                <h2 className={`${Style.title}`}>Perfil</h2>
                <div style={{display:"inline-flex"}}>
                    <a className={`${Style.btnAtualizar}`} href="/users/update"><b>Atualizar</b></a>
                    <a className={`${Style.btnDeletar}`} onClick={() => fetchUserDelete()}><b>Deletar</b></a>
                </div>
                </div>
                <br />
                <div className={`${Style.divRow}`}>
                    <label>Nome:</label>
                    <h5>{userName}</h5>
                </div>
                <div className={`${Style.divRow}`}>
                    <label>E-mail:</label>
                    <h5>{userEmail}</h5>
                </div>
            </div>
          </div>
          <footer className={Style.footer}>
              <div className={Style.wave}></div>
              <div className={Style.content}>
              </div>
          </footer>
        </div>
    )
}