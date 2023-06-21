import Style from './../../assets/styles/occurrences.module.css';
import React, { useState, useEffect } from "react";
import Menu from '../../componentes/menu';
import MenuSemValidacao from '../../componentes/menuSemVerificacao';
import api from '../../services/api';
import { useRouter } from "next/router";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Get() {
    const [occurrences, setOccurrences] = useState([]);
    const [menu, setMenu] = useState(null);
    const [storedToken, setStoredToken] = useState('');
    const [user, setUser] = useState('');
    const router = useRouter();

    const obterNomeIncidente = (occurrence_type) => {
        switch (occurrence_type) {
          case 1:
            return 'Atropelamento';
          case 2:
            return 'Deslizamento';
          case 3:
            return 'Colisão frontal';
          case 4:
            return 'Capotagem';
          case 5:
            return 'Saída de pista';
          case 6:
            return 'Batida em objeto fixo';
          case 7:
            return 'Veículo avariado';
          case 8:
            return 'Colisão com motocicletas';
          case 9:
            return 'Colisão no mesmo sentido ou transversal';
          case 10:
            return 'Construção';
          default:
            return null; // Valor não encontrado
        }
      };

    useEffect(() => {

      if(typeof window !== 'undefined') {
        // Recupera token armazenado no localStorage
        const token = localStorage.getItem('token');
    
        // Verificar se há um token no armazenamento local
        if (!token) {
            setMenu(<MenuSemValidacao />);
        }
        else{
            setMenu(<Menu />);
        }
        // if (userDataJson) {
        //     // Converter a string JSON de volta para um objeto
        //     const userData = JSON.parse(userDataJson);
        //     setDataUser(userData);
        //     console.log("teste", userData.id);
        // }

        setStoredToken(token);
        fetchOccurrences();
    }
    }, [router]);
    
    // Função para buscar todas as ocorrências
    async function fetchOccurrences() {
        try {
            // Recuperar a string JSON armazenada no localStorage
            const userDataJson = localStorage.getItem('userData');
             // Recupera token armazenado no localStorage
            const token = localStorage.getItem('token');
            if (userDataJson && token) {
                // Converter a string JSON de volta para um objeto
                const userData = JSON.parse(userDataJson);

                console.log("teste", token);

                const response = await api.get(`/occurrences/users/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const occurrences = response.data;
                setUser(userData.name);
                setOccurrences(occurrences);
            }

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchOccurrencesUpdate(id){
        console.log("oi", id);
        router.push(`/occurrences/update?id=${id}`);
    }

    async function fetchOccurrencesDelete(id){
        try {
            // Recuperar a string JSON armazenada no localStorage
            const userDataJson = localStorage.getItem('userData');
             // Recupera token armazenado no localStorage
            const token = localStorage.getItem('token');
            if (userDataJson && token) {
                console.log("teste", token);

                const response = await api.delete(`/occurrences/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                  // Chamada da função fetchOccurrences para atualizar a listagem
                    await fetchOccurrences();
            }

        } catch (error) {
            console.error(error);
        }
    }
  
    return (
      <div className={`${Style.background}`}>
        <div className={`container ${Style.containerG}`}>
           {menu}
          <div>
            <h2 className={`${Style.title}`}>listagem de incidentes {user}</h2>
            {/* <button className={`${Style.btnAtualizar}`} onClick={fetchOccurrences}><b>Atualizar</b></button> */}
          </div>
          <br />
          <table className={`${Style.table}`}>
            <thead className={`${Style.thead}`}>
              <tr>
                <th>ID</th>
                <th>Data / Hora</th>
                <th>Local</th>
                <th>Tipo de Incidente</th>
                <th>KM</th>
                <th>Editar</th>
                <th style={{ width: "8%"}}>Deletar</th>
              </tr>
            </thead>
            <tbody className={`${Style.tbody}`}>
              {occurrences.map((occurrence) => (
                <tr key={occurrence.id}>
                  <td>{occurrence.id}</td>
                  <td>{occurrence.registered_at}</td>
                  {/* <td>{format(new Date(occurrence.registered_at.replace(/-/g, '/')), 'dd/MM/yyyy HH:mm:ss')}</td> */}
                  <td>{occurrence.local}</td>
                  <td>{obterNomeIncidente(occurrence.occurrence_type)}</td>
                  <td>{occurrence.km}</td>
                  <td><a className={`${Style.btnAtualizar2}`}  onClick={() => fetchOccurrencesUpdate(occurrence.id)}><FontAwesomeIcon icon={faPen} /></a></td>
                  <td><a className={`${Style.btnDeletar}`}  onClick={() => fetchOccurrencesDelete(occurrence.id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }