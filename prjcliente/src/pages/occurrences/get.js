import Style from './../../assets/styles/occurrences.module.css';
import React, { useState, useEffect } from "react";
import Menu from '../../componentes/menu';
import MenuSemValidacao from '../../componentes/menuSemVerificacao';
import api from '../../services/api';
import { useRouter } from "next/router";
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faTimes  } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-modal";

// Configuração do Modal
Modal.setAppElement("#root");

export default function Get() {
    const [occurrences, setOccurrences] = useState([]);
    const [menu, setMenu] = useState(null);
    const [storedToken, setStoredToken] = useState('');
    const [user, setUser] = useState('');
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [tipo_incidente, setTipoIncidente] = useState('');
    const [km, setKm ] = useState('');
    const [local, setLocal] = useState('');
    const [id, setId] = useState('');

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

    // Função para abrir o modal
    function openModal(occurrence) {
      const dataHora = occurrence.registered_at;
      const data = dataHora.substring(0, 10); 
      const hora = dataHora.substring(11, 19);

      setId(occurrence.id);
      setData(data);
      setHora(hora);
      setTipoIncidente(obterNomeIncidente(occurrence.occurrence_type));
      setKm(occurrence.km);
      setLocal(occurrence.local);
      setModalIsOpen(true);
    }
    // Função para fechar o modal
    function closeModal() {
      setModalIsOpen(false);
    }

    // async function fetchOccurrencesUpdate(id){
    //     console.log("oi", id);
    //     router.push(`/occurrences/update?id=${id}`);
    // }
    async function fetchOccurrencesUpdate(id, data, hora, tipoIncidente, km, local) {
      try {
        const obterIdIncidente = (tipo) => {
          switch (tipo) {
            case 'Atropelamento':
              return 1;
            case 'Deslizamento':
              return 2;
            case 'ColisaoFrontal':
              return 3;
            case 'Capotagem':
              return 4;
            case 'SaidaDePista':
              return 5;
            case 'BatidaEmObjetoFixo':
              return 6;
            case 'VeiculoAvariado':
              return 7;
            case 'ColisaoComMotocicletas':
              return 8;
            case 'ColisaoNoMesmoSentidoOuTransversal':
              return 9;
            case 'Construcao':
              return 10;
            default:
              return null; // Valor não encontrado
          }
      }

         const userDataJson = localStorage.getItem('userData');
         // Converter a string JSON de volta para um objeto
         const userData = JSON.parse(userDataJson);
        // Recupera o token armazenado no localStorage
        const token = localStorage.getItem('token');
        if (token) {
          const updatedOccurrence = {
            registered_at: `${data}T${hora}.000Z`,
            occurrence_type: obterIdIncidente(tipoIncidente),
            km: km,
            local: local,
            user_id: userData.id
          };
    
          const response = await api.put(`/occurrences/${id}`, updatedOccurrence, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          // Chama a função fetchOccurrences para atualizar a listagem
          await fetchOccurrences();
        }
      } catch (error) {
        console.error(error);
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault(); 
      
      // Chama a função fetchOccurrencesUpdate passando os campos como parâmetros
      fetchOccurrencesUpdate(id, data, hora, tipo_incidente, km, local);
    
      // Fecha o modal
      closeModal();
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
                <th style={{ width: "8%"}}>Editar</th>
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
                  <td><a className={`${Style.btnAtualizar2}`}  onClick={() => openModal(occurrence)}><FontAwesomeIcon icon={faPen} /></a></td>
                  <td><a className={`${Style.btnDeletar}`}  onClick={() => fetchOccurrencesDelete(occurrence.id)}><FontAwesomeIcon icon={faTrash} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="root"></div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" className={`${Style.modal}`}>
          <div className={`modal-content ${Style.modalContent}`}>
              <button className={`close-button ${Style.closeButton}`} onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* {successMessage && <div className={`${Style.mensagemS}`}>{successMessage}</div>} */}
              {/* {errorMessage && <div className={`${Style.mensagemE}`}>{errorMessage}</div>} */}
              <div className={`container ${Style.containerP}`}>
                <form onSubmit={handleSubmit} >
                  <h2 className={`${Style.titleM}`}>Atualizar incidente {id}</h2>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="data">Data</label>
                    <input className={`${Style.input}`} type="date" id="data" name="data" value={data} onChange={event => setData(event.target.value)} />
        
                    <label className={`${Style.label}`} htmlFor="hora">Hora</label>
                    <input className={`${Style.input}`} type="time" id="hora" name="hora" step="2" value={hora} onChange={event => setHora(event.target.value)}  />
                  </div>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="tipo_incidente">Tipo</label>
                    <select className={`${Style.inputS}`} id="tipo_incidente" name="tipo_incidente"  value={tipo_incidente} onChange={event => setTipoIncidente(event.target.value)}  >
                      <option value="Atropelamento">Atropelamento</option>
                      <option value="Deslizamento">Deslizamento</option>
                      <option value="ColisaoFrontal">Colisão frontal</option>
                      <option value="Capotagem">Capotagem</option>
                      <option value="SaidaDePista">Saída de pista</option>
                      <option value="BatidaEmObjetoFixo">Batida em objeto fixo</option>
                      <option value="VeiculoAvariado">Veículo avariado</option>
                      <option value="ColisaoComMotocicletas">Colisão com motocicletas</option>
                      <option value="ColisaoNoMesmoSentidoOuTransversal">Colisão no mesmo sentido ou transversal</option>
                      <option value="Construcao">Construção</option>
                    </select>
        
                    <label style={{ marginLeft: '25px'}} className={`${Style.label}`} htmlFor="km">KM</label>
                    <input className={`${Style.input}`} type="text" id="km" name="km"  value={km} onChange={event => setKm(event.target.value)} />
                  </div>
                  <div className={`${Style.divRow}`}>
                    <label className={`${Style.label}`} htmlFor="local">Local</label>
                    <input className={`${Style.input}`} type="text" id="local" name="local"  value={local} onChange={event => setLocal(event.target.value)} />
                  </div>
        
                  <div className={`row ${Style.botoes}`}>
                    <button type="submit" className={`${Style.btn} ${Style.btsalvar}`}>Atualizar</button>
                    <a href="/home" className={`${Style.btn} ${Style.btcancelar}`}>Cancelar</a>
                  </div>
                </form>
              </div>

          </div>
        </Modal>

      </div>
    );
  }